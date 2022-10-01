using Common.DAO.Access;
using DAO.Standard;
using Qorder.Core;
using Qorder.Dao.Implementation.Core;
using SpeedFramework.APILib.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Qorder.Controllers.Core
{
    public class KitchenProductToProcessBoothController : GenericAuthCompleteBaseController<KitchenProductToProcessBooth, KitchenProductToProcessBooth>
    {
        public IKitchenProductToProcessBoothRepository _service;

        public KitchenProductToProcessBoothController(IKitchenProductToProcessBoothRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
            this._accountContext = accountContext;
        }
        [HttpGet]
        public ServiceResult<IEnumerable<KitchenProductToProcessBooth>> GetKitchenProductToProcessBoothForProcessBooth(int Id)
        {
            return ResultProcessor.Process(() => _service.GetKitchenProductToProcessBoothForProcessBooth(Id), _service);
        }
    }
}