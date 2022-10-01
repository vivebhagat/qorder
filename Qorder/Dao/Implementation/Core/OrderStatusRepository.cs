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
    public interface IOrderStatusRepository : IGenericTransformRepository<OrderStatus, OrderStatus>
    {

    }


    public class OrderStatusRepository : GenericTransformRepository<OrderStatus, OrderStatus>, IOrderStatusRepository
    {
        ILocalModelContext db;

        public OrderStatusRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(OrderStatus @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //Dignos.CheckException(String.IsNullOrEmpty(obj.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(@Object, m => m.DOB == @Object.DOB);
        }


        public override IQueryable<OrderStatus> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

    }
}
