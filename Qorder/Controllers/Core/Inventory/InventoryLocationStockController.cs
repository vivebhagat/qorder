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
    public class InventoryLocationStockController : GenericAuthCompleteBaseController<InventoryLocationStock, InventoryLocationStock>
    {
        public IInventoryLocationStockRepository _service;

        public InventoryLocationStockController(IInventoryLocationStockRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)

        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }

        [HttpGet]
        public ServiceResult<IEnumerable<InventoryLocationStock>> GetInventoryLocationStockForInventoryLocation(int Id)
        {
            return ResultProcessor.Process(() => _service.GetInventoryLocationStockForInventoryLocation(Id), _service);
        }

        public ServiceResult<IEnumerable<InventoryLocationStock>> GetInventoryLocationStockForInventoryItem(int Id)
        {
            return ResultProcessor.Process(() => _service.GetInventoryLocationStockForInventoryItem(Id), _service);
        }
    }
}
