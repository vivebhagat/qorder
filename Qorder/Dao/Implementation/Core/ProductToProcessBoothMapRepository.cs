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
    public interface IProductToProcessBoothMapRepository : IGenericTransformRepository<ProductToProcessBoothMap, ProductToProcessBoothMap>
    {
        IEnumerable<ProductToProcessBoothMap> GetProductToProcessBoothtMapForProducts(int Id);
    }


    public class ProductToProcessBoothMapRepository : GenericTransformRepository<ProductToProcessBoothMap, ProductToProcessBoothMap>, IProductToProcessBoothMapRepository
    {
        ILocalModelContext db;

        public ProductToProcessBoothMapRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public IEnumerable<ProductToProcessBoothMap> GetProductToProcessBoothtMapForProducts(int Id)    
        {
            return db.ProductToProcessBoothMaps.Where(m => m.ProductId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override void Validate(ProductToProcessBoothMap @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            // Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public override IQueryable<ProductToProcessBoothMap> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

      
    }
}
