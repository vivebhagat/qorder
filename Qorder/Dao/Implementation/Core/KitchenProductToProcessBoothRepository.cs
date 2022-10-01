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
    public interface IKitchenProductToProcessBoothRepository : IGenericTransformRepository<KitchenProductToProcessBooth, KitchenProductToProcessBooth>
    {
        IEnumerable<KitchenProductToProcessBooth> GetKitchenProductToProcessBoothForProcessBooth(int Id);
    }


    public class KitchenProductToProcessBoothRepository : GenericTransformRepository<KitchenProductToProcessBooth, KitchenProductToProcessBooth>, IKitchenProductToProcessBoothRepository
    {
        ILocalModelContext db;

        public KitchenProductToProcessBoothRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public IEnumerable<KitchenProductToProcessBooth> GetKitchenProductToProcessBoothForProcessBooth(int Id)
        {
            return db.KitchenProductToProcessBooths.Where(m => m.ProcessBoothId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }


        public override void Validate(KitchenProductToProcessBooth @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            // Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            //  CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }


        public override IQueryable<KitchenProductToProcessBooth> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }
    }
}
