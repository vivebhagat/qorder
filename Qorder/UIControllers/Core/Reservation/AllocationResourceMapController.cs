using Common.WebUI;
using SpeedFramework.WebLib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Qorder.UIControllers.Core.Reservation
{
    public class AllocationResourceMapController : BaseController
    {
        public AllocationResourceMapController(IScreenLinkRepository _screenLinkRepository) : base(_screenLinkRepository)
        {
        }

        // GET: AllocationResourceMap
        public ActionResult Index()
        {
            return View();
        }
    }
}