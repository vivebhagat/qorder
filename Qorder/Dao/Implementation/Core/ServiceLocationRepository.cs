using Common.DAO.Access;
using Common.Exceptions;
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
    public interface IServiceLocationRepository : IGenericTransformRepository<ServiceLocation, ServiceLocation>
    {

    }


    public class ServiceLocationRepository : GenericTransformRepository<ServiceLocation, ServiceLocation>, IServiceLocationRepository
    {
        ILocalModelContext db;

        public ServiceLocationRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        { 
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(ServiceLocation @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }



        public override IQueryable<ServiceLocation> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }


        private void InsertUrl(ServiceLocation @Object)
        {
            string url = db.SysParameters.Where(m => m.Name == "QR_CODE_URL").Select(m => m.Value).FirstOrDefault();
            if (String.IsNullOrEmpty(url)) throw new DataProcessingException("INVALID CONFIGURATION.");
            @Object.Url = url + @Object.Id;
            db.SaveChanges();


        }

        public override void BeforeAdd(ServiceLocation @Object)
        {
            

        }

        public override void AfterAdd(ServiceLocation @Object)
        {

            InsertUrl(@Object);
        }

        public override void BeforeEdit(ServiceLocation @Object)
        {
           


        }

        public override void AfterEdit(ServiceLocation @Object)
        {
            InsertUrl(@Object);
        }


    }
}