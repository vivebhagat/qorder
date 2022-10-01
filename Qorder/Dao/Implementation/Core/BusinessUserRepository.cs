using Common.DAO.Access;
using Common.Helper;
using Common.Standard;
using Qorder.Core;
using Qorder.Dao.Implementation.Core;
using SpeedFramework.DAO.Model.Access;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core
{
    public interface IBusinessUserRepository : IBaseIntUserRepository<BusinessUser,BusinessUser>
    {

    }

    public class BusinessUserRepository : BaseUserRepository<BusinessUser, BusinessUser>, IBusinessUserRepository
    {
        ILocalModelContext db;

        public BusinessUserRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(BusinessUser @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public override IQueryable<BusinessUser> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }
    }
}