using Common.DAO.Access;
using Common.Helper;
using Common.Standard;
using Qorder.Core;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core
{
    public interface IProductToKitchenProductMapRepository : IGenericTransformRepository<ProductToKitchenProductMap, ProductToKitchenProductMap>
    {
        IEnumerable<ProductToKitchenProductMap> GetProductToKitchenProductMapForProducts(int Id);
    }


    public class ProductToKitchenProductMapRepository : GenericTransformRepository<ProductToKitchenProductMap, ProductToKitchenProductMap>, IProductToKitchenProductMapRepository
    {
        ILocalModelContext db;

        public ProductToKitchenProductMapRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public IEnumerable<ProductToKitchenProductMap> GetProductToKitchenProductMapForProducts(int Id)
        {
            return db.ProductToKitchenProductMaps.Where(m => m.ProductId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override void Validate(ProductToKitchenProductMap @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            // Dignos.CheckException(String.IsNullOrEmpty(obj.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public override IQueryable<ProductToKitchenProductMap> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

     
    }
}
