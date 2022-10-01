using APIlib.Model.SignalR;
using Common.DAO.Access;
using Common.Exceptions;
using Common.Standard;
using Microsoft.AspNet.SignalR;
using Qorder.Core;
using Qorder.Dao.Implementation.Core;
using SpeedFramework.APILib.Models.Authentication;
using SpeedFramework.DAO.Model.Access;
using SpeedFramework.DAO.Model.Custom.Communication;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Qorder.Controllers.Core
{
    public class DefaultController : ApiController
    {

        public HttpContextBase Helper(string domain)
        {
            var httpContextBase = new HttpContextWrapper(HttpContext.Current);
            httpContextBase.Request.Headers.Add(GL_VAR.STRING_DOMAIN, domain);
            httpContextBase.Request.Headers.Remove(GL_VAR.STRING_DOMAINKEY);
            httpContextBase.Request.Headers.Add(GL_VAR.STRING_DOMAINKEY, domain);
            return httpContextBase;
        }
           
        
        [HttpGet]
        public IEnumerable<ProductCategory> GetProductForCategory(int Id, string domain)
        {
            var httpContextBase =  Helper(domain);
            IAccountContext accountContext = new AccountContext(httpContextBase);
            LocalDbContext modelDbContext = new LocalDbContext(accountContext);


            IProductRepository _service = new ProductRepository(
                modelDbContext, new UserContext(httpContextBase), accountContext, new ResultContext());

            return _service.GetProductForCategory(Id);
        }


        [HttpGet]
        public IEnumerable<CounterProduct> GetCounterProductForCounter(int Id, string domain)
        {
            var httpContextBase = Helper(domain);
            IAccountContext accountContext = new AccountContext(httpContextBase);
            LocalDbContext modelDbContext = new LocalDbContext(accountContext);


            ICounterProductRepository _service = new    CounterProductRepository(modelDbContext, new UserContext(httpContextBase), accountContext, new ResultContext());

            return _service.GetCounterProductForCounter(Id);
        }


        [HttpGet]
        public Product GetProduct(int Id, string domain)
        {
            var httpContextBase = Helper(domain);
            IAccountContext accountContext = new AccountContext(httpContextBase);
            LocalDbContext modelDbContext = new LocalDbContext(accountContext);


            IProductRepository _service = new ProductRepository(
                modelDbContext, new UserContext(httpContextBase), accountContext, new ResultContext());

            return _service.Get(Id);
        }


        [HttpPost]
        public int CreateOrderDirect(OrderProductUi o)
        {
            var httpContextBase = Helper(o.Domain);
            IAccountContext accountContext = new AccountContext(httpContextBase);
            LocalDbContext modelDbContext = new LocalDbContext(accountContext);


            IOrderRepository _service = new OrderRepository(
                modelDbContext, new UserContext(httpContextBase), accountContext, new ResultContext());

            IAlertRepository _alertService = new AlertRepository(
                  modelDbContext, new UserContext(httpContextBase), accountContext, new ResultContext());

            int Id = _service.CreateOrderDirect(o.OrderProducts, o.ServiceLocationId);

            string roles = _alertService.db.SysParameters.Where(m => m.Name == "ADMIN_ALERT_RECIEVER_ROLES").Select(m => m.Value).FirstOrDefault();
            if (String.IsNullOrEmpty(roles)) { throw new DataProcessingException("INVALID CONFIGURATION."); };

            List<string> _roles = roles.Split(',').ToList();
            List<UserDefinedRoleToUserMap> userDefinedRoleToUserMaps = _alertService.db.UserDefinedRoleToUserMaps.Where(m => _roles.Contains( m.Role.Name)).ToList();
            foreach (UserDefinedRoleToUserMap _userDefinedRoleToUserMap in userDefinedRoleToUserMaps)
            {
                Alert _alert = new Alert()
                {
                    IntUserId = _userDefinedRoleToUserMap.IntUserId,
                    IntUser = _userDefinedRoleToUserMap.IntUser,
                    Body = "New order placed  #" + Id,
                    Sender = "System",
                    Name = "New Order",
                    ExpiryDate = DateTime.Now.AddMinutes(15),
                    Group = _userDefinedRoleToUserMap.Role.Name,
                    SentDate = DateTime.Now,
                    Type = "NEW_ORDER",
                    IsRead = false,
                };
                _alertService.Generate(_alert);
            }
            IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();

            List<string> strings = new List<string> { "Application Admin" };
            hubContext.Clients.Groups(strings).broadcastMessage("New Order", "Order Placed", DateTime.Now.ToShortDateString(), strings);
            //Return statements are alwasy at the end.
            return Id;
        }


        [HttpPost]
        public int CreateOrder(RequestUi o)
        {
            var httpContextBase = Helper(o.Domain);
            IAccountContext accountContext = new AccountContext(httpContextBase);
            LocalDbContext modelDbContext = new LocalDbContext(accountContext);


            IOrderRepository _service = new OrderRepository(
                modelDbContext, new UserContext(httpContextBase), accountContext, new ResultContext());

            IAlertRepository _alertService = new AlertRepository(
                modelDbContext, new UserContext(httpContextBase), accountContext, new ResultContext());

            int Id = _service.CreateOrder(o.Products);



            List<UserDefinedRoleToUserMap> userDefinedRoleToUserMaps = _alertService.db.UserDefinedRoleToUserMaps.Where(m => m.Role.Name == "Application Admin").ToList();
            foreach (UserDefinedRoleToUserMap _userDefinedRoleToUserMap in userDefinedRoleToUserMaps)
            {
                Alert _alert = new Alert()
                {
                    IntUserId = _userDefinedRoleToUserMap.IntUserId,
                    IntUser = _userDefinedRoleToUserMap.IntUser,
                    Body = "New order placed  #"+Id,
                    Sender = "System",
                    Name = "New Order",
                    ExpiryDate = DateTime.Now.AddMinutes(15),
                    Group = "Application Admin",
                    SentDate = DateTime.Now,
                    Type = "NEW_ORDER",
                    IsRead = false,
                };
                _alertService.Generate(_alert);
            }
            IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();

            List<string> strings = new List<string> { "Application Admin" };
            hubContext.Clients.Groups(strings).broadcastMessage("New Order", "Order Placed", DateTime.Now.ToShortDateString(), strings);


            //REtrn statements are always at the end.
            return Id;

        }
    }

     public class RequestUi
     {
        public int Id { get; set; }
        public string Domain { get; set; }
        public List<Product> Products { get; set; }
     }


    public class OrderProductUi
    {
        public int Id { get; set; }
        public string Domain { get; set; }
        public int ServiceLocationId { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
    }
}
