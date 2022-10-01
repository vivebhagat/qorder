using Qorder.Core;
using SpeedFramework.DAO.Repository.Interfaces;
using System.Collections.Generic;

namespace Qorder.Dao.Interface.Core
{
    public interface ICounterProductRepository : IGenericActivableRepository<CounterProduct>
    {
        IEnumerable<CounterProduct> GetCounterProductForCounter(int Id);
    }
}
