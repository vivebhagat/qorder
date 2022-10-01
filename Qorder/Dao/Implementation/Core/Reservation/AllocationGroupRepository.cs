using Common.DAO.Access;
using Common.Helper;
using Common.Standard;
using Qorder.Models.Core.Reservation;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core.Reservation
{
    public interface IAllocationGroupRepository : IGenericTransformRepository<AllocationGroup, AllocationGroup>
    {

    }

    public class AllocationGroupRepository : GenericTransformRepository<AllocationGroup, AllocationGroup>, IAllocationGroupRepository
    {
        ILocalModelContext db;

        public AllocationGroupRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(AllocationGroup @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public override IQueryable<AllocationGroup> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

    }
}
