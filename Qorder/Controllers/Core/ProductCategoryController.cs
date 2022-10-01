using Common.DAO.Access;
using Qorder.Dao.Implementation.Core;
using Qorder.Core;
using SpeedFramework.APILib.Controllers;
using DAO.Standard;
using System.Web.Http;
using System.Collections.Generic;
using System.Web;
using Common.Standard;
using SpeedFramework.APILib.Models.Authentication;
using SpeedFramework.DAO.Repository.Interfaces;

namespace Qorder.Controllers.Core
{
    public class ProductCategoryController : GenericAuthCompleteBaseController<ProductCategory, ProductCategory>
    {
        public IProductCategoryRepository _service;

        public ProductCategoryController(IProductCategoryRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }
        [HttpGet]
        public ServiceResult<IEnumerable<ProductCategory>> GetProductCategoryForProducts(int Id)
        {
            return ResultProcessor.Process(() => _service.GetProductCategoryForProducts(Id), _service);
        }


        

    }
}
