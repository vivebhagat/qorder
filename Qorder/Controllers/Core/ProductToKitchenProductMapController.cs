﻿using Common.DAO.Access;
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
    public class ProductToKitchenProductMapController : GenericAuthCompleteBaseController<ProductToKitchenProductMap, ProductToKitchenProductMap>
    {
        public IProductToKitchenProductMapRepository _service;

        public ProductToKitchenProductMapController(IProductToKitchenProductMapRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
            this._accountContext = accountContext;
        }
        [HttpGet]
        public ServiceResult<IEnumerable<ProductToKitchenProductMap>> GetProductToKitchenProductMapForProducts(int Id)
        {
            return ResultProcessor.Process(() => _service.GetProductToKitchenProductMapForProducts(Id), _service);
        }
    }
}
