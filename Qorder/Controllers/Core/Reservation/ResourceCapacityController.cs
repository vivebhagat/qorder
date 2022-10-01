using Common.DAO.Access;
using DAO.Standard;
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
    public class ResourceCapacityController : GenericAuthCompleteBaseController<ResourceCapacity, ResourceCapacity>
    {
        public IResourceCapacityRepository _service;

        public ResourceCapacityController(IResourceCapacityRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)

        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }


        [HttpGet]
        public ServiceResult<IEnumerable<ResourceCapacity>> GetResourceCapacitiesForAllocationResourceMap(int Id)
        {
            return ResultProcessor.Process(() => _service.GetResourceCapacitiesForAllocationResourceMap(Id), _service);
        }
    }
}
