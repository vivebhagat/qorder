using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(Qorder.Startup))]
namespace Qorder
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            SpeedFramework.APILib.Models.APILIbStartup startup = new SpeedFramework.APILib.Models.APILIbStartup();
            startup.Configuration(app);
        }
    }
}