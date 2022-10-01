using Common.DAO.Access;
using Qorder.Core;
using Qorder.Dao.Implementation.Core;
using SpeedFramework.APILib.Controllers;

namespace Qorder.Controllers.Core
{
    public class BookingController : GenericAuthCompleteBaseController<Booking,Booking>
    {
        public IBookingRepository _service;

        public BookingController(IBookingRepository service, IUserContext userContext, IAccountContext accountContext) : base(service)
        
        {
            _service = service;
            _userContext = userContext;
            _accountContext = accountContext;
        }
    }
}
