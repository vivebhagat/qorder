using Common.WebUI;
using SpeedFramework.WebLib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Qorder.UIControllers.Core
{
    public class StaffController : BaseController
    {
        public StaffController(IScreenLinkRepository _screenLinkRepository) : base(_screenLinkRepository)
        {
        }

        // GET: Staff
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

        public ActionResult LoginData()
        {
            return View();
        }
        public ActionResult RoleMap()
        {
            return View();
        }

        public ActionResult EntityAccess()
        {
            return View();
        }
    }
}