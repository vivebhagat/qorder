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
    public interface IVariationRepository : IGenericTransformRepository<Variation, Variation>
    {

    }


    public class VariationRepository : GenericTransformRepository<Variation, Variation>, IVariationRepository
    {
        ILocalModelContext db;

        public VariationRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultcontext) : base(db, userContext, accountContext, resultcontext)
        {
            this.db = db;
            this.userContext = userContext;
            this.accountContext = accountContext;
        }


        public override void Validate(Variation @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public override IQueryable<Variation> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

    }
}