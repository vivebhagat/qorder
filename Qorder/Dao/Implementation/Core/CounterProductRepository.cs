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

    public interface ICounterProductRepository : IGenericTransformRepository<CounterProduct, CounterProduct>
    {
        IEnumerable<CounterProduct> GetCounterProductForCounter(int Id);
    }


    public class CounterProductRepository : GenericTransformRepository<CounterProduct, CounterProduct>, ICounterProductRepository
    {
        ILocalModelContext db;
  
        public CounterProductRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext) 
        { 
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(CounterProduct @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public override IQueryable<CounterProduct> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }


        public IEnumerable<CounterProduct> GetCounterProductForCounter(int Id)
        {
            return db.CounterProducts.Where(m => m.CounterId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }

    }
}