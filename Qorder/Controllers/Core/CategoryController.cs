using Common.DAO.Access;
using Qorder.Core;
using Qorder.Dao.Implementation.Core;
using SpeedFramework.APILib.Controllers;

namespace Qorder.Controllers.Core
{
    public class CategoryController : GenericAuthCompleteBaseController<Category,Category>
    {
        public ICategoryRepository _service;

        public CategoryController(ICategoryRepository service, IUserContext userContext) : base(service)
        {
            _service = service;
            _userContext = userContext;
        }
    }
}
