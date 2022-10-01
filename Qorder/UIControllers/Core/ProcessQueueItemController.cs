using Common.WebUI;
using SpeedFramework.WebLib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Qorder.UIControllers.Core
{
    public class ProcessQueueItemController : BaseController
    {
        public ProcessQueueItemController(IScreenLinkRepository _screenLinkRepository) : base(_screenLinkRepository)
        {
        }

        // GET: ProcessQueueItem
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ProcessQueueItemForProcessBooth()
        {
            return View();
        }
    }
}