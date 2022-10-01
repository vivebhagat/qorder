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

    public interface IBookingRepository : IGenericTransformRepository<Booking,Booking>
    {

    }

    public class BookingRepository : GenericTransformRepository<Booking, Booking>, IBookingRepository
    {
        ILocalModelContext db;

        public BookingRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(Booking @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            // Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public void ProcessBooking(int TableId)
        {
            int _TableId = db.ServiceLocations.Where(m => m.Id == TableId).Select(m => m.Id).FirstOrDefault();
            if (_TableId == 0)
            {
                throw new DataProcessingException("Invalid Service Configuration.");
            }
            int _count = db.Orders.Where(m => m.ServiceLocationId == TableId && m.ArchieveDate == null).Count();
            if (_count > 0)
            {
                throw new DataProcessingException("Service Location is not available.");
            }
        }
        public override IQueryable<Booking> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

        public override void BeforeAdd(Booking @Object)
        {

            ProcessBooking(@Object.ServiceLocationId);
        }

        public override void AfterAdd(Booking @Object)
        {

        }

        public override void BeforeEdit(Booking @Object)
        {

            ProcessBooking(@Object.ServiceLocationId);

        }

        public override void AfterEdit(Booking @Object)
        { 

        }


    }
}
