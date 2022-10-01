using Common.WebUI;
using SpeedFramework.WebLib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Qorder.UIControllers.Core
{
    public class PaymentMethodController : BaseController
    {
        public PaymentMethodController(IScreenLinkRepository _screenLinkRepository) : base(_screenLinkRepository)
        {
        }

        // GET: PaymentMethod
        public ActionResult Index()
        {
            return View();
        }
    }
}