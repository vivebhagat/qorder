using Common.DAO.Access;
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
    public class InventoryItemController : GenericAuthCompleteBaseController<InventoryItem, InventoryItem>
    {
        public IInventoryItemRepository _service;

        public InventoryItemController(IInventoryItemRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)

        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }
    }
}
