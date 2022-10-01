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
    public interface IProductToInventoryItemMapRepository : IGenericTransformRepository<ProductToInventoryItemMap, ProductToInventoryItemMap>
    {
        IEnumerable<ProductToInventoryItemMap> GetProductForInventoryItem(int id);
        IEnumerable<ProductToInventoryItemMap> GetInventoryItemForProduct(int Id);
    }

    public class ProductToInventoryItemMapRepository : GenericTransformRepository<ProductToInventoryItemMap, ProductToInventoryItemMap>, IProductToInventoryItemMapRepository
    {
        ILocalModelContext db;

        public ProductToInventoryItemMapRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(ProductToInventoryItemMap @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //sDignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            //CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }

        public IEnumerable<ProductToInventoryItemMap> GetProductForInventoryItem(int Id)
        {
            return db.ProductToInventoryItemMaps.Where(m => m.InventoryItemId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }

        public IEnumerable<ProductToInventoryItemMap> GetInventoryItemForProduct(int Id)
        {
            return db.ProductToInventoryItemMaps.Where(m => m.ProductId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }

        public override IQueryable<ProductToInventoryItemMap> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

    }
}
