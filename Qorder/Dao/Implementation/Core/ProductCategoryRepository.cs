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
    public interface IProductCategoryRepository : IGenericTransformRepository<ProductCategory, ProductCategory>
    {
        IEnumerable<ProductCategory> GetProductCategoryForProducts(int Id);
    }


    public class ProductCategoryRepository : GenericTransformRepository<ProductCategory, ProductCategory>, IProductCategoryRepository
    {
        ILocalModelContext db;

        public ProductCategoryRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {     
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(ProductCategory @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            //CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public IEnumerable<ProductCategory> GetProductCategoryForProducts(int Id)
        {
            return db.ProductCategories.Where(m => m.ProductId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override IQueryable<ProductCategory> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

      

    }
}