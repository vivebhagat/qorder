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
    public interface IAllocationResourceMapRepository : IGenericTransformRepository<AllocationResourceMap, AllocationResourceMap>
    {
        IEnumerable<AllocationResourceMap> GetAllocationResourceMapForAllocationGroup(int id);
    }

    public class AllocationResourceMapRepository : GenericTransformRepository<AllocationResourceMap, AllocationResourceMap>, IAllocationResourceMapRepository
    {
        ILocalModelContext db;

        public AllocationResourceMapRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(AllocationResourceMap @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
           // Dignos.CheckException(String.IsNullOrEmpty(@Object.AllocationGroupId), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            CheckDuplicate(@Object, m => m.AllocationGroupId == @Object.AllocationGroupId);
        }


        public override IQueryable<AllocationResourceMap> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

        public IEnumerable<AllocationResourceMap> GetAllocationResourceMapForAllocationGroup(int Id)
        {
            return db.AllocationResourceMaps.Where(m => m.AllocationGroupId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }




    }
}
