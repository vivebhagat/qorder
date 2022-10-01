using Common.DAO.Access;
using DAO.Standard;
using Qorder.Dao.Implementation.Core.Inventory;
using Qorder.Models.Core.Inventory;
using SpeedFramework.APILib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Qorder.Controllers.Core.Inventory
{
    public class VendorToInventoryItemMapController : GenericAuthCompleteBaseController<VendorToInventoryItemMap, VendorToInventoryItemMap>
    {
        public IVendorToInventoryItemMapRepository _service;

        public VendorToInventoryItemMapController(IVendorToInventoryItemMapRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)

        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }

        [HttpGet]
        public ServiceResult<IEnumerable<VendorToInventoryItemMap>> GetVendorForInventoryItem(int Id)
        {
            return ResultProcessor.Process(() => _service.GetVendorForInventoryItem(Id), _service);
        }


        [HttpGet]
        public ServiceResult<IEnumerable<VendorToInventoryItemMap>> GetInventoryItemForVendor(int Id)
        {
            return ResultProcessor.Process(() => _service.GetInventoryItemForVendor(Id), _service);
        }
    }
}