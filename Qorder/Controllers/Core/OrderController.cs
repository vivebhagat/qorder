using Common.DAO.Access;
using DAO.Standard;
using Qorder.Dao.Implementation.Core;
using Qorder.Core;
using SpeedFramework.APILib.Controllers;
using System.Collections.Generic;
using System.Web.Http;

namespace Qorder.Controllers.Core
{
    public class OrderController : GenericAuthCompleteBaseController<Order, Order>
    {
        public IOrderRepository _service;

        public OrderController(IOrderRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }

        [HttpGet]
        public ServiceResult<IEnumerable<Order>> GetActiveOrder(int Id)
        {
            return ResultProcessor.Process(() => _service.GetActiveOrder(Id), _service);
        }

        [HttpGet]
        public ServiceResult<IEnumerable<Order>> GetOrderDetails(int Id)
        {
            return ResultProcessor.Process(() => _service.GetOrderDetails(Id), _service);
        }


        [HttpPost]
        public ServiceResult<int> CreateOrder(List<Product> products)
        {
            return ResultProcessor.Process(() => _service.CreateOrder(products), _service);
        }

        [HttpPost]
        public ServiceResult<int> CreateOrderDirect(OrderProductUi OrderProductUI)
        {
            return ResultProcessor.Process(() => _service.CreateOrderDirect(OrderProductUI.OrderProducts,OrderProductUI.ServiceLocationId), _service);
        }

    }
}
