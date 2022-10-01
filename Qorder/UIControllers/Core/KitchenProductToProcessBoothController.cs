using Common.WebUI;
using SpeedFramework.WebLib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Qorder.UIControllers.Core
{
    public class KitchenProductToProcessBoothController : BaseController
    {
        public KitchenProductToProcessBoothController(IScreenLinkRepository _screenLinkRepository) : base(_screenLinkRepository)
        {
        }

        // GET: KitchenProductToProcessBooth
        public ActionResult Index()
        {
            return View();
        }
    }
}