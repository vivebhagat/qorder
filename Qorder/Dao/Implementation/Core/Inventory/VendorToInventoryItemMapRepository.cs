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
    public interface IVendorToInventoryItemMapRepository : IGenericTransformRepository<VendorToInventoryItemMap, VendorToInventoryItemMap>
    {
        IEnumerable<VendorToInventoryItemMap> GetVendorForInventoryItem(int Id);
        IEnumerable<VendorToInventoryItemMap> GetInventoryItemForVendor(int Id);
    }

    public class VendorToInventoryItemMapRepository : GenericTransformRepository<VendorToInventoryItemMap, VendorToInventoryItemMap>, IVendorToInventoryItemMapRepository
    {
        ILocalModelContext db;

        public VendorToInventoryItemMapRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(VendorToInventoryItemMap @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
           // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public IEnumerable<VendorToInventoryItemMap> GetVendorForInventoryItem(int Id)
        {
            return db.VendorToInventoryItemMaps.Where(m => m.InventoryItemId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }

        public IEnumerable<VendorToInventoryItemMap> GetInventoryItemForVendor(int Id)
        {
            return db.VendorToInventoryItemMaps.Where(m => m.VendorId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override IQueryable<VendorToInventoryItemMap> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

    }
}