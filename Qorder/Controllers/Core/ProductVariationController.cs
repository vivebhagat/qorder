using Common.DAO.Access;
using DAO.Standard;
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
    public class ProductVariationController : GenericAuthCompleteBaseController<ProductVariation, ProductVariation>
    {
        public IProductVariationRepository _service;

        public ProductVariationController(IProductVariationRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }

        [HttpGet]
        public ServiceResult<IEnumerable<ProductVariation>> GetProductVariationForProducts(int Id)
        {
            return ResultProcessor.Process(() => _service.GetProductVariationForProducts(Id), _service);
        }
    }
}
