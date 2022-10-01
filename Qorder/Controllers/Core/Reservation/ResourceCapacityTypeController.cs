using Common.DAO.Access;
using Qorder.Dao.Implementation.Core.Reservation;
using Qorder.Models.Core.Reservation;
using SpeedFramework.APILib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Qorder.Controllers.Core.Reservation
{
    public class ResourceCapacityTypeController : GenericAuthCompleteBaseController<ResourceCapacityType, ResourceCapacityType>
    {
        public IResourceCapacityTypeRepository _service;

        public ResourceCapacityTypeController(IResourceCapacityTypeRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)

        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }
    }
}
