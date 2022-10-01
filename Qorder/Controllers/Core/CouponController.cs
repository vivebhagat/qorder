using Common.DAO.Access;
using Qorder.Dao.Implementation.Core;
using Qorder.Models.Core;
using SpeedFramework.APILib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Qorder.Controllers.Core
{
    public class CouponController : GenericAuthCompleteBaseController<Coupon,Coupon>
    {
        public ICouponRepository _service;

        public CouponController(ICouponRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }
    }
}
