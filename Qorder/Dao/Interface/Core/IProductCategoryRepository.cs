using Qorder.Core;
using SpeedFramework.DAO.Repository.Interfaces;
using System.Collections.Generic;

namespace Qorder.Dao.Interface.Core
{
    public interface IProductCategoryRepository : IGenericActivableRepository<ProductCategory>
    {
        IEnumerable<ProductCategory> GetProductCategoryForProducts(int Id);
    }
}
