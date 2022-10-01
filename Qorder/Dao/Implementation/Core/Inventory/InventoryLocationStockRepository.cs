using Common.DAO.Access;
using Common.Helper;
using Common.Standard;
using Qorder.Models.Core.Inventory;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core.Inventory
{
    public interface IInventoryLocationStockRepository : IGenericTransformRepository<InventoryLocationStock, InventoryLocationStock>
    {
        IEnumerable<InventoryLocationStock> GetInventoryLocationStockForInventoryLocation(int Id);
        IEnumerable<InventoryLocationStock> GetInventoryLocationStockForInventoryItem(int Id);

    }

    public class InventoryLocationStockRepository : GenericTransformRepository<InventoryLocationStock, InventoryLocationStock>, IInventoryLocationStockRepository
    {
        ILocalModelContext db;

        public InventoryLocationStockRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(InventoryLocationStock @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
           // Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
           // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }

        public IEnumerable<InventoryLocationStock> GetInventoryLocationStockForInventoryLocation(int Id)
        {
            return db.InventoryLocationStocks.Where(m => m.InventoryLocationId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }

        public IEnumerable<InventoryLocationStock> GetInventoryLocationStockForInventoryItem(int Id)
        {
            return db.InventoryLocationStocks.Where(m => m.InventoryItemId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }

        public override IQueryable<InventoryLocationStock> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

    }
}
