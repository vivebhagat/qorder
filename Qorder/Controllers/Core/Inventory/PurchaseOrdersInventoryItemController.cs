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
    public class PurchaseOrdersInventoryItemController : GenericAuthCompleteBaseController<PurchaseOrdersInventoryItem, PurchaseOrdersInventoryItem>
    {
        public IPurchaseOrdersInventoryItemRepository _service;

        public PurchaseOrdersInventoryItemController(IPurchaseOrdersInventoryItemRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)

        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }

        [HttpGet]
        public ServiceResult<IEnumerable<PurchaseOrdersInventoryItem>> GetPurchaseOrdersInventoryItemForPurchaseOrder(int Id)
        {
            return ResultProcessor.Process(() => _service.GetPurchaseOrdersInventoryItemForPurchaseOrder(Id), _service);
        }
    }
}
