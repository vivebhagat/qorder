using Common.DAO.Access;
using DAO.Standard;
using Qorder.Dao.Implementation.Core;
using Qorder.Core;
using SpeedFramework.APILib.Controllers;
using System.Collections.Generic;
using System.Web.Http;
using System.Collections;

namespace Qorder.Controllers.Core
{
    public class ProductController : GenericAuthCompleteBaseController<Product, Product>
    {
        public IProductRepository _service;

        public ProductController(IProductRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }
        [HttpGet]
        public ServiceResult<IEnumerable<ProductCategory>> GetProductForCategory(int Id)
        {
            return ResultProcessor.Process(() => _service.GetProductForCategory(Id), _service);
        }




    }

}