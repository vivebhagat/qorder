using Qorder.Core;
using SpeedFramework.DAO.Repository.Interfaces;
using System.Collections.Generic;

namespace Qorder.Dao.Interface.Core
{
    public interface IOrderProductRepository : IGenericActivableRepository<OrderProduct>
    {
        IEnumerable<OrderProduct> GetOrderProductForOrder(int Id);
    }
}
