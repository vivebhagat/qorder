using Qorder.Core;
using SpeedFramework.DAO.Repository.Interfaces;
using System.Collections.Generic;

namespace Qorder.Dao.Interface.Core
{
    public interface IProductRepository : IGenericActivableRepository<Product>
    {
        IEnumerable<Product> GetProductForCounter(int Id);
        IEnumerable<Product> GetProductForMe();
        IEnumerable<Product> GetProductForCategory(int Id);
    }
}
