using Qorder.Core;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qorder.Dao.Interface.Core
{
    public interface IKitchenProductToProcessBoothRepository : IGenericActivableRepository<KitchenProductToProcessBooth>
    {
        IEnumerable<KitchenProductToProcessBooth> GetKitchenProductToProcessBoothForProcessBooth(int Id);
    }
}
