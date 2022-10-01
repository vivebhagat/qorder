using Common.DAO.Access;
using Common.Helper;
using Common.Standard;
using Qorder.Core;
using SpeedFramework.DAO.Model.Access;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core
{
    public interface IVendorRepository : IBaseIntUserRepository<Vendor, BusinessUser>
    {

    }


    public class VendorRepository : BaseUserRepository<Vendor, BusinessUser>, IVendorRepository
    {
        ILocalModelContext db;

        public VendorRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultcontext) : base(db, userContext, accountContext, resultcontext)
        {
            this.db = db;
            this.userContext = userContext;
            this.accountContext = accountContext;

        }


        public override void Validate(Vendor @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
           // CheckDuplicate(obj, m => m.DOB == obj.DOB);
        }


        public override IQueryable<BusinessUser> GetAccessFilterdSet()
        {
            return this._accessQualifiedQueryable.Where(m => m.IsVendor && m.ArchieveDate == null);
        }


        public override void BeforeAdd(BusinessUser @Object)
        {
            string value = db.SysParameters.Where(m => m.Name == "Standard_Vendor").Select(m => m.Value).FirstOrDefault();
            string Vendor_role_name = db.UserDefinedRoles.Where(m => m.Name == value).Select(m => m.Name).FirstOrDefault();
            Dignos.CheckException(string.IsNullOrEmpty(Vendor_role_name), "Vendor role is not configured.");
        }


        public override void AfterAdd(BusinessUser @object)
        {
            string value = db.SysParameters.Where(m => m.Name == "Standard_Vendor").Select(m => m.Value).FirstOrDefault();
            UserDefinedRole Vendor_role = db.UserDefinedRoles.Where(m => m.Name == value).FirstOrDefault();
            Dignos.CheckException(Vendor_role == null, "Vendor role is not configured.");

            UserDefinedRoleToUserMap _roleMap = new UserDefinedRoleToUserMap
            {
                IntUserId = @object.Id,
                IntUser = @object,
                Role = Vendor_role,
                RoleId = Vendor_role.Id,
                CreatedDate = DateTime.Now
            };
            db.UserDefinedRoleToUserMaps.Add(_roleMap);
            db.SaveChanges();
        }

    }



}