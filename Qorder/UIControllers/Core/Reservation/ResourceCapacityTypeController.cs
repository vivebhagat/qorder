using Common.WebUI;
using SpeedFramework.WebLib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Qorder.UIControllers.Core.Reservation
{
    public class ResourceCapacityTypeController : BaseController
    {
        public ResourceCapacityTypeController(IScreenLinkRepository _screenLinkRepository) : base(_screenLinkRepository)
        {
        }

        // GET: ResourceCapacityType
        public ActionResult Index()
        {
            return View();
        }
    }
}