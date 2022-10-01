using Common.DAO.Access;
using Qorder.Core;
using Qorder.Dao.Implementation.Core;
using SpeedFramework.APILib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Qorder.Controllers.Core
{
    public class VendorController : GenericUserAuthCompleteBaseController<Vendor, BusinessUser>
    {
        public IVendorRepository _service;

        public VendorController(IVendorRepository service, IUserContext userContext, IAccountContext accountContext) : base(service, accountContext)
        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }




    }
}