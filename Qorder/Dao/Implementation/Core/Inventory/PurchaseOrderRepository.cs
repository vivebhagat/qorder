using Common.DAO.Access;
using Common.Helper;
using Common.Standard;
using Qorder.Models.Core.Inventory;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core.Inventory
{
    public interface IPurchaseOrderRepository : IGenericTransformRepository<PurchaseOrder, PurchaseOrder>
    {
       
    }

    public class PurchaseOrderRepository : GenericTransformRepository<PurchaseOrder, PurchaseOrder>, IPurchaseOrderRepository
    {
        ILocalModelContext db;

        public PurchaseOrderRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(PurchaseOrder @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
           // Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
           // CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public override IQueryable<PurchaseOrder> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }


       

    }
}
