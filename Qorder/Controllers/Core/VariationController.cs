using Common.DAO.Access;
using Qorder.Dao.Implementation.Core;
using Qorder.Models.Core;
using SpeedFramework.APILib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Qorder.Controllers.Core
{
    public class VariationController : GenericAuthCompleteBaseController<Variation, Variation>
    {
        public IVariationRepository _service;

        public VariationController(IVariationRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }
    }
}
