using Common.DAO.Access;
using Qorder.Dao.Implementation.Core;
using Qorder.Core;
using SpeedFramework.APILib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DAO.Standard;

namespace Qorder.Controllers.Core
{
    public class OrderProductController : GenericAuthCompleteBaseController<OrderProduct, OrderProduct>
    {
        public IOrderProductRepository _service;

        public OrderProductController(IOrderProductRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }
        [HttpGet]
        public ServiceResult<IEnumerable<OrderProduct>> GetOrderProductForOrder(int Id)
        {
            return ResultProcessor.Process(() => _service.GetOrderProductForOrder(Id), _service);
        }
    }
}
