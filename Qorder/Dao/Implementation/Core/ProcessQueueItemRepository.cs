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
    public interface IProcessQueueItemRepository : IGenericTransformRepository<ProcessQueueItem, ProcessQueueItem>
    {
        IEnumerable<ProcessQueueItem> GetProcessQueueItemForProcessBooth(int Id);
    }


    public class ProcessQueueItemRepository : GenericTransformRepository<ProcessQueueItem, ProcessQueueItem>, IProcessQueueItemRepository
    {
        ILocalModelContext db;

        public ProcessQueueItemRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public IEnumerable<ProcessQueueItem> GetProcessQueueItemForProcessBooth(int Id)
        {
            return db.ProcessQueueItems.Where(m => m.ProcessBoothId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override void Validate(ProcessQueueItem @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //  Dignos.CheckException(String.IsNullOrEmpty(@Object.Id), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Id"));
            //CheckDuplicate(@Object, m => m.Id == @Object.Id);
        }


        public override IQueryable<ProcessQueueItem> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }
    }
}
