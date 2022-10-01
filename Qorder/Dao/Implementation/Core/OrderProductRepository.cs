using Common.DAO.Access;
using Common.Exceptions;
using Common.Helper;
using Common.Standard;
using Qorder.Core;
using SpeedFramework.DAO.Model.Access;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core
{
    public interface IOrderProductRepository : IGenericTransformRepository<OrderProduct, OrderProduct>
    {
        IEnumerable<OrderProduct> GetOrderProductForOrder(int Id);
    }


    public class OrderProductRepository : GenericTransformRepository<OrderProduct, OrderProduct>, IOrderProductRepository
    {
        ILocalModelContext db;

        public OrderProductRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(OrderProduct @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //Dignos.CheckException(String.IsNullOrEmpty(obj.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public IEnumerable<OrderProduct> GetOrderProductForOrder(int Id)
        {
            return db.OrderProducts.Where(m => m.OrderId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override IQueryable<OrderProduct> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);

        }

        private void ProcessOrderProduct(OrderProduct @Object)
        {
            OrderProduct orderproducts = db.OrderProducts.Where(m => m.OrderId == Object.OrderId && m.ProductId == Object.ProductId).FirstOrDefault();
            if (orderproducts != null)
            {
                throw new DataProcessingException("Product already exists.");
            }

            dynamic values = db.Products.Where(m => m.Id == @Object.ProductId).Select(m => new { m.Amount, m.Discount, m.TaxCode,m.Id }).FirstOrDefault();
            double _price = values.Amount;
            double _discount = values.Discount;
            TaxCode _tax = values.TaxCode;
            if (_tax == null) { throw new DataProcessingException("Tax Code is not configured."); }
            double OrderProductTotal = (_price - _discount) * @Object.Quantity;

            @Object.Discount = _discount * @Object.Quantity;
            @Object.CurrentAmount = Math.Round(_price * @Object.Quantity, 2);
            @Object.Total = Math.Round(OrderProductTotal * (1 + _tax.Value / 100), 2);
            @Object.TaxCode = _tax;
            @Object.IsMapped = true;
        }


        private void ProcessOrder(int Id)
        {

            double total = 0.0;
            double totalwithtax = 0.0;
            double total_discount = 0.0;
            List<OrderProduct> orderProducts = db.OrderProducts.AsNoTracking().Where(m => m.OrderId == Id).ToList();
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

            Order order = db.Orders.Where(m => m.Id == Id).FirstOrDefault();
            order.TotalWithoutTax = Math.Round(total, 2);
            order.TotalWithTax = Math.Round(totalwithtax, 2);
            order.Discount = Math.Round(total_discount, 2);
            db.GetDbContext().Entry(order).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public override void BeforeAdd(OrderProduct @Object)
        {
            ProcessOrderProduct(@Object);

        }

        public override void AfterAdd(OrderProduct @Object)
        {
            ProcessOrder(@Object.OrderId);

        }

        public override void BeforeEdit(OrderProduct @Object)
        {
            ProcessOrderProduct(@Object);


        }

        public override void AfterEdit(OrderProduct @Object)
        {
            ProcessOrder(@Object.OrderId);
        }
    }
}