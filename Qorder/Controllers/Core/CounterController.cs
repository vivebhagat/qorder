using Common.DAO.Access;
using Qorder.Core;
using SpeedFramework.APILib.Controllers;
using DAO.Standard;
using System.Web.Http;
using System.Collections.Generic;
using Qorder.Dao.Implementation.Core;

namespace Qorder.Controllers.Core
{
    public class CounterController : GenericAuthCompleteBaseController<Counter,Counter>
    {
        public ICounterRepository _service;

        public CounterController(ICounterRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }

 

    }
}
