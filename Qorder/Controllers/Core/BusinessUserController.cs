using Common.DAO.Access;
using Qorder.Core;
using Qorder.Dao.Implementation.Core;
using SpeedFramework.APILib.Controllers;
using SpeedFramework.APILib.Models.Authentication;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace Qorder.Controllers.Core
{
    public class BusinessUserController : GenericUserAuthCompleteBaseController<BusinessUser,BusinessUser>
    {
        IBusinessUserRepository _service;
        public BusinessUserController(IBusinessUserRepository service, IUserContext userContext, IAccountContext accountContext) : base(service,accountContext)
        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }

        [HttpPost]
        public int AddCustomer(BusinessUser @Object)
        {
            return _service.Add(@Object);
        }


        [HttpPost]
        public bool EditCustomer(BusinessUser @Object)
        {
            return _service.Edit(@Object);
        }


        [HttpPost]
        public int AddVender(BusinessUser @Object)
        {
            return _service.Add(@Object);
        }


        [HttpPost]
        public bool EditVendor(BusinessUser @Object)
        {
            return _service.Edit(@Object);
        }

        [HttpPost]
        public int AddStaff(BusinessUser @Object)
        {
            return _service.Add(@Object);
        }


        [HttpPost]
        public bool EditStaff(BusinessUser @Object)
        {
            return _service.Edit(@Object);
        }

        [HttpPost]
        public int AddManager(BusinessUser @Object)
        {
            return _service.Add(@Object);
        }


        [HttpPost]
        public bool EditManager(BusinessUser @Object)
        {
            return _service.Edit(@Object);
        }
    }
}
