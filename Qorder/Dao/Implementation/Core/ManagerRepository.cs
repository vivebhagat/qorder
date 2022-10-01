using Common.DAO.Access;
using Common.Helper;
using Common.Standard;
using Qorder.Core;
using Qorder.Models.Core;
using SpeedFramework.DAO.Model.Access;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core
{
    public interface IManagerRepository : IBaseIntUserRepository<Manager, BusinessUser>
    {

    }


    public class ManagerRepository : BaseUserRepository<Manager, BusinessUser>, IManagerRepository
    {
        ILocalModelContext db;

        public ManagerRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultcontext) : base(db, userContext, accountContext, resultcontext)
        {
            this.db = db;
            this.userContext = userContext;
            this.accountContext = accountContext;

        }


        public override void Validate(Manager @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            // CheckDuplicate(obj, m => m.DOB == obj.DOB);
        }


        public override IQueryable<BusinessUser> GetAccessFilterdSet()
        {
            return this._accessQualifiedQueryable.Where(m => m.IsManager && m.ArchieveDate == null);
        }


        public override void BeforeAdd(BusinessUser @Object)
        {
            string value = db.SysParameters.Where(m => m.Name == "Standard_Manager").Select(m => m.Value).FirstOrDefault();
            string Manager_role_name = db.UserDefinedRoles.Where(m => m.Name == value).Select(m => m.Name).FirstOrDefault();
            Dignos.CheckException(string.IsNullOrEmpty(Manager_role_name), "Manager role is not configured.");
        }


        public override void AfterAdd(BusinessUser @object)
        {
            string value = db.SysParameters.Where(m => m.Name == "Standard_Manager").Select(m => m.Value).FirstOrDefault();
            UserDefinedRole Manager_role = db.UserDefinedRoles.Where(m => m.Name == value).FirstOrDefault();
            Dignos.CheckException(Manager_role == null, "Manager role is not configured.");

            UserDefinedRoleToUserMap _roleMap = new UserDefinedRoleToUserMap
            {
                IntUserId = @object.Id,
                IntUser = @object,
                Role = Manager_role,
                RoleId = Manager_role.Id,
                CreatedDate = DateTime.Now
            };
            db.UserDefinedRoleToUserMaps.Add(_roleMap);
            db.SaveChanges();
        }

    }



}