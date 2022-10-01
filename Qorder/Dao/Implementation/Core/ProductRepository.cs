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
    public interface IProductRepository : IGenericTransformRepository<Product, Product>
    {
        IEnumerable<ProductCategory> GetProductForCategory(int Id);
    }


    public class ProductRepository : GenericTransformRepository<Product, Product>, IProductRepository
    {
        ILocalModelContext db;

        public ProductRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(Product @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public IEnumerable<ProductCategory> GetProductForCategory(int Id)
        {
            return db.ProductCategories.Where(m => m.CategoryId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override IQueryable<Product> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

     
    }
}