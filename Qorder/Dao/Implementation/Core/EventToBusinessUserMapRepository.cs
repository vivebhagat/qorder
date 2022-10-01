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
    public interface IEventToBusinessUserMapRepository : IGenericTransformRepository<EventToBusinessUserMap, EventToBusinessUserMap>
    {
        IEnumerable<EventToBusinessUserMap> GetEventToBusinessUserMapForEvent(int id);
    }


    public class EventToBusinessUserMapRepository : GenericTransformRepository<EventToBusinessUserMap, EventToBusinessUserMap>, IEventToBusinessUserMapRepository
    {
        ILocalModelContext db;

        public EventToBusinessUserMapRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultcontext) : base(db, userContext, accountContext, resultcontext)
        {
            this.db = db;
            this.userContext = userContext;
            this.accountContext = accountContext;
        }


        public override void Validate(EventToBusinessUserMap @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public IEnumerable<EventToBusinessUserMap> GetEventToBusinessUserMapForEvent(int Id)
        {
            return db.EventToBusinessUserMaps.Where(m => m.EventId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override IQueryable<EventToBusinessUserMap> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }
    }
}