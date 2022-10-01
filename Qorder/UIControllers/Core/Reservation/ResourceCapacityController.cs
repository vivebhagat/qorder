using Common.WebUI;
using SpeedFramework.WebLib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Qorder.UIControllers.Core.Reservation
{
    public class ResourceCapacityController : BaseController
    {
        public ResourceCapacityController(IScreenLinkRepository _screenLinkRepository) : base(_screenLinkRepository)
        {
        }

        // GET: ResourceCapacity
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ResourceCapacitiesForAllocationResourceMap()
        {
            return View();
        }
    }
}