using Common.DAO.Access;
using Common.Filter;
using Common.Helper;
using Common.Standard;
using Qorder.Core;
using SpeedFramework.DAO.Commmon;
using SpeedFramework.DAO.Core.Model.UiSetup;
using SpeedFramework.DAO.Model.Custom.Communication;
using SpeedFramework.DAO.Model.Custom.Entity;
using SpeedFramework.DAO.Model.Custom.Filter;
using SpeedFramework.DAO.Model.Custom.StateMachine;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;

namespace Qorder.Dao.Implementation.Core
{
    public interface IPaymentRepository : IGenericTransformRepository<Payment, Payment>
    {
        IEnumerable<Payment> GetPaymentForOrder(int Id);
    }

    public class PaymentRepository : GenericTransformRepository<Payment, Payment>, IPaymentRepository
    {
        ILocalModelContext db;

        public PaymentRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultcontext) : base(db, userContext, accountContext, resultcontext)
        {
            this.db = db;
            this.userContext = userContext;
            this.accountContext = accountContext;
        }

        public override void Validate(Payment @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            //  Dignos.CheckException(String.IsNullOrEmpty(@Object.Id), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Id"));
            //CheckDuplicate(@Object, m => m.Id == @Object.Id);
        }

        public IEnumerable<Payment> GetPaymentForOrder(int Id)
        {
            return db.Payments.Where(m => m.OrderId == Id  && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override IQueryable<Payment> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }

        
    }
}