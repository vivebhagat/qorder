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
    public interface IResourceCapacityRepository : IGenericTransformRepository<ResourceCapacity, ResourceCapacity>
    {
        IEnumerable<ResourceCapacity> GetResourceCapacitiesForAllocationResourceMap(int id);
    }

    public class ResourceCapacityRepository : GenericTransformRepository<ResourceCapacity, ResourceCapacity>, IResourceCapacityRepository
    {
        ILocalModelContext db;

        public ResourceCapacityRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(ResourceCapacity @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
           // Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            //CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public override IQueryable<ResourceCapacity> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

        public IEnumerable<ResourceCapacity> GetResourceCapacitiesForAllocationResourceMap(int Id)
        {
            return db.ResourceCapacities.Where(m => m.AllocationResourceMapId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }

    }
}
