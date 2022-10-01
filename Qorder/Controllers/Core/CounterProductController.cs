using Common.DAO.Access;
using Qorder.Core;
using SpeedFramework.APILib.Controllers;
using System.Web.Http;
using System.Collections.Generic;
using DAO.Standard;
using Qorder.Dao.Implementation.Core;

namespace Qorder.Controllers.Core
{
    public class CounterProductController : GenericAuthCompleteBaseController<CounterProduct,CounterProduct>
    {
        public ICounterProductRepository _service;

        public CounterProductController(ICounterProductRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }
         [HttpGet]
           public ServiceResult<IEnumerable<CounterProduct>> GetCounterProductForCounter(int Id)
           {
               return ResultProcessor.Process(() => _service.GetCounterProductForCounter(Id), _service);
           }
    }
}
