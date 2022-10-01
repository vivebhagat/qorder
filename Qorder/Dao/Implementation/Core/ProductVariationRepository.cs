using Common.DAO.Access;
using Common.Helper;
using Common.Standard;
using Qorder.Models.Core;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core
{
    public interface IProductVariationRepository : IGenericTransformRepository<ProductVariation, ProductVariation>
    {
        IEnumerable<ProductVariation> GetProductVariationForProducts(int id);
    }


    public class ProductVariationRepository : GenericTransformRepository<ProductVariation, ProductVariation>, IProductVariationRepository
    {
        ILocalModelContext db;

        public ProductVariationRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultcontext) : base(db, userContext, accountContext, resultcontext)
        {
            this.db = db;
            this.userContext = userContext;
            this.accountContext = accountContext;
        }


        public override void Validate(ProductVariation @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public IEnumerable<ProductVariation> GetProductVariationForProducts(int Id)
        {
            return db.ProductVariations.Where(m => m.ProductId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override IQueryable<ProductVariation> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }
    }
}