using Qorder.Core;
using SpeedFramework.DAO.Repository.Interfaces;
using System.Collections.Generic;

namespace Qorder.Dao.Interface.Core
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
         IEnumerable<Order> GetActiveOrder(int Id);


    }

}
