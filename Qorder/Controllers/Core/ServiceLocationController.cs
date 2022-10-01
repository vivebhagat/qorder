using Common.DAO.Access;
using Common.Standard;
using DAO.Standard;
using Qorder.Dao.Implementation.Core;
using Qorder.Core;
using SpeedFramework.APILib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Qorder.Controllers.Core
{
    public class ServiceLocationController : GenericAuthCompleteBaseController<ServiceLocation, ServiceLocation>
    {
        public IServiceLocationRepository _service;

        public ServiceLocationController(IServiceLocationRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }
  
    }
}
