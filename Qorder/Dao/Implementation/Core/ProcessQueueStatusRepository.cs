﻿using Common.DAO.Access;
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
    public interface IProcessQueueStatusRepository : IGenericTransformRepository<ProcessQueueStatus, ProcessQueueStatus>
    {

    }
    public class ProcessQueueStatusRepository : GenericTransformRepository<ProcessQueueStatus, ProcessQueueStatus>, IProcessQueueStatusRepository
    {
        ILocalModelContext db;

        public  ProcessQueueStatusRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(ProcessQueueStatus @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //  Dignos.CheckException(String.IsNullOrEmpty(@Object.Id), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Id"));
            //CheckDuplicate(@Object, m => m.Id == @Object.Id);
        }


        public override IQueryable< ProcessQueueStatus> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

      
    }
}
