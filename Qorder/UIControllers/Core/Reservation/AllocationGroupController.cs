using Common.WebUI;
using SpeedFramework.WebLib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Qorder.UIControllers.Core.Reservation
{
    public class AllocationGroupController : BaseController
    {
        public AllocationGroupController(IScreenLinkRepository _screenLinkRepository) : base(_screenLinkRepository)
        {
        }

        // GET: AllocationGroup
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Add()
        {
            return View();

        }

        public ActionResult Edit()
        {
            return View();
        }
    }
}