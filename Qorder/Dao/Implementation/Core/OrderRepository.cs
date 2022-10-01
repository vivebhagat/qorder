using Common.DAO.Access;
using Common.Helper;
using Common.Standard;
using Qorder.Core;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Migrations;
using SpeedFramework.DAO.Model.Access;
using APIlib.Model.SignalR;
using Microsoft.AspNet.SignalR;
using SpeedFramework.DAO.Model.Custom.Communication;
using Common.Exceptions;

namespace Qorder.Dao.Implementation.Core
{
    public interface IOrderRepository : IGenericTransformRepository<Order, Order>
    {
        IEnumerable<Order> GetActiveOrder(int Id);
        IEnumerable<Order> GetOrderDetails(int Id);
        int CreateOrder(List<Product> products);
        int CreateOrderDirect(List<OrderProduct> orderProducts, int ServiceLocationId);
    }


    public class OrderRepository : GenericTransformRepository<Order, Order>, IOrderRepository
    {
        ILocalModelContext db;

        public OrderRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(Order @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.DOB == @Object.DOB);
        }

        public IEnumerable<Order> GetActiveOrder(int Id)
        {
            string new_status = db.SysParameters.Where(m => m.Name == "STANDARD_NEW_ORDER_STATUS").Select(m => m.Value).FirstOrDefault();
            string confirm_status = db.SysParameters.Where(m => m.Name == "STANDARD_CONFIRM_ORDER_STATUS").Select(m => m.Value).FirstOrDefault();
            int _order_status_id = db.OrderStatuses.Where(m => m.Name == new_status).Select(m => m.Id).FirstOrDefault();
            List<string> statuslist = new List<string> { new_status, confirm_status };
            return db.Orders.Where(m => m.ServiceLocationId == Id && m.ArchieveDate == null && (statuslist.Contains(m.OrderStatus.Name))).OrderByDescending(m => m.Id).ToList();
        }

        public IEnumerable<Order> GetOrderDetails(int Id)
        {
            return db.Orders.Where(m => m.Id == Id && m.ArchieveDate == null).ToList();
        }


        public override IQueryable<Order> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }


        public int CreateOrder(List<Product> products)
        {
            // Add logic here to check if the products are already there in database of not.
            // Product p1 = db.Products.Where(m => m.Id == p.Id).FirstOrDefault();
            // u will need to use for loop and using above statement you will check if return p1 is null or not.
            // if its null then return 0.
            // if all ok then program will continue normally
            /*foreach (Product p in products)
               {
                 Product p1 = db.Products.Where(m => m.Id == p.Id).FirstOrDefault();
                 if (p1 == null)
                 {
                     return 0;
                 }
               }*/

            Order @Object = new Order
            {
                OrderStatusId = 1,
                Date = DateTime.Now,
                CreatedDate = DateTime.Now
            };
            //   OrderStatus os = db.OrderStatuses.Where(m => m.Id == 1).FirstOrDefault();
            int Id = this.Add(@Object);
            foreach (Product p in products)
            {
                db.GetDbContext().Entry(p).State = System.Data.Entity.EntityState.Detached;
                Product p1 = db.Products.Where(m => m.Id == p.Id).FirstOrDefault();
                OrderProduct op = new OrderProduct
                {
                    OrderId = Id,
                    Order = @Object,
                    IsMapped = true,
                    ProductId = p1.Id,
                    Product = p1,
                    CreatedDate = DateTime.Now
                };
                db.OrderProducts.AddOrUpdate(op);
            }
            db.SaveChanges();

            return Id;

        }

        public int CreateOrderDirect(List<OrderProduct> orderProducts, int TableId)
        {
            string new_status = db.SysParameters.Where(m => m.Name == "STANDARD_NEW_ORDER_STATUS").Select(m => m.Value).FirstOrDefault();
            string confirm_status = db.SysParameters.Where(m => m.Name == "STANDARD_CONFIRM_ORDER_STATUS").Select(m => m.Value).FirstOrDefault();
            int _order_status_id = db.OrderStatuses.Where(m => m.Name == new_status).Select(m => m.Id).FirstOrDefault();
            Counter counter = db.CounterProducts.Where(m => m.Id == m.ProductId).Select(m => m.Counter).FirstOrDefault();
            int _TableId = db.ServiceLocations.Where(m => m.Id == TableId).Select(m => m.Id).FirstOrDefault();
            // List<string> statuslist = new List<string> { new_status, confirm_status};
            if (_TableId == 0)
            {
                throw new DataProcessingException("Invalid Service Configuration.");
            }

            int _count = db.Orders.Where(m => m.ServiceLocationId == TableId && m.ArchieveDate == null).Count();
            int _maxordercount = db.ServiceLocations.Where(m => m.Id == TableId).Select(m => m.MaxNoOfOrders).FirstOrDefault();
            if (_count >= _maxordercount)
            {
                throw new DataProcessingException("Max Order Count Reached");
            }

            DateTime starttime = db.ServiceLocations.Where(m => m.Id == TableId).Select(m => m.StartTime).FirstOrDefault();
            DateTime endtime = db.ServiceLocations.Where(m => m.Id == TableId).Select(m => m.EndTime).FirstOrDefault();
            TimeSpan start_time = starttime.TimeOfDay;
            TimeSpan end_time = endtime.TimeOfDay;
            TimeSpan now = DateTime.Now.TimeOfDay;

            if (now < start_time)
            {
                throw new DataProcessingException("Invalid Order Hours Service Not Yet Started");
            }

            if (now > end_time)
            {
                throw new DataProcessingException("Invalid Order Hours Service Ended");
            }

            /* int _count = db.Orders.Where(m => m.ServiceLocationId == TableId && m.ArchieveDate == null && (statuslist.Contains( m.OrderStatus.Name))).Count();
            if (_count > 0)
            {
                throw new DataProcessingException("Service Location is not available.");
            }*/

            double total = 0.0;
            double totalwithtax = 0.0;
            double total_discount = 0.0;

            foreach (OrderProduct p in orderProducts)
            {

                TaxCode _tax = db.Products.Where(m => m.Id == p.ProductId).Select(m => m.TaxCode).FirstOrDefault();
                if (_tax == null) { throw new DataProcessingException("Tax Code is not configured."); }
                dynamic values = db.Products.Where(m => m.Id == p.ProductId).Select(m => new { m.Amount, m.Discount }).FirstOrDefault();
                double _price = values.Amount;
                double _discount = values.Discount;
                double OrderProductTotal = (_price - _discount) * p.Quantity;

                p.Discount = _discount * p.Quantity;
                p.CurrentAmount = Math.Round(_price * p.Quantity, 2);
                p.Total = Math.Round(OrderProductTotal * (1 + _tax.Value / 100), 2);
                p.TaxCodeId = _tax.Id;
                p.IsMapped = true;
                total += OrderProductTotal;
                totalwithtax += OrderProductTotal * (1 + _tax.Value / 100);
                total_discount += _discount * p.Quantity;

            }

            Order @Object = new Order
            {
                OrderStatusId = _order_status_id,
                Date = DateTime.Now,
                CreatedDate = DateTime.Now,
                TotalWithoutTax = Math.Round(total, 2),
                TotalWithTax = Math.Round(totalwithtax, 2),
                Discount = Math.Round(total_discount, 2),
                CounterId = counter.Id,
                ServiceLocationId = _TableId

            };


            int Id = this.Add(@Object);
            OrderProductRepository orderProductRepository = new OrderProductRepository(db, userContext, accountContext, resultContext);

            foreach (OrderProduct p in orderProducts)
            {
                db.GetDbContext().Entry(p).State = System.Data.Entity.EntityState.Detached;
                p.OrderId = Id;
                p.Order = @Object;
                orderProductRepository.Add(p);
            }
            return Id;

        }
    }
}
