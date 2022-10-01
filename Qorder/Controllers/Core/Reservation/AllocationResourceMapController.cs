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
    public class AllocationResourceMapController : GenericAuthCompleteBaseController<AllocationResourceMap, AllocationResourceMap>
    {
        public IAllocationResourceMapRepository _service;

        public AllocationResourceMapController(IAllocationResourceMapRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)

        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }

        [HttpGet]
        public ServiceResult<IEnumerable<AllocationResourceMap>> GetAllocationResourceMapForAllocationGroup(int Id)
        {
            return ResultProcessor.Process(() => _service.GetAllocationResourceMapForAllocationGroup(Id), _service);
        }
    }
}
