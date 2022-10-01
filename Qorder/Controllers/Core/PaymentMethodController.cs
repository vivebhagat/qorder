﻿using Common.DAO.Access;
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
    public class PaymentMethodController : GenericAuthCompleteBaseController<PaymentMethod, PaymentMethod>
    {
        public IPaymentMethodRepository _service;

        public PaymentMethodController(IPaymentMethodRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
            this._accountContext = accountContext;
        }
    }
}
