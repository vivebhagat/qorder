using Qorder.Core;
using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Models.Core
{
    [UIEntity]
    //    [NotMapped]
    public class Staff : IBaseIntUser, TEntity, UIEntity<BusinessUser>
    {
        public string Address1 { get; set; }
        public string ApplicationNumber { get; set; }
        public int? OrgId { get; set; }
        public virtual Organization Org { get; set; }
        public string PostCode { get; set; }
        public string Country { get; set; }
        public string Address2 { get; set; }
        public string ExtraDataHolder { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public bool IsCustomer { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsManager { get; set; }
        public bool IsVendor { get; set; }
        public bool IsStaff { get; set; }
        public int Id { get; set; }
        public string LegacyNumber { get; set; }
        public IntUser CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public DateTime CreatedDate { get; set; }
        public IntUser ModifiedBy { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public IntUser ArchieveBy { get; set; }
        public int? ArchieveById { get; set; }
        public DateTime? ArchieveDate { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public object absorb(BusinessUser @object)
        {
            return new Staff
            {
                Id = @object.Id,
                Name = @object.Name,
                FirstName = @object.FirstName,
                LastName = @object.LastName,
                Email = @object.Email,
                OrgId = @object.OrgId,
                DOB = @object.DOB,
            };

        }

        public BusinessUser emit()
        {
            this.IsStaff = true;
            BusinessUser businessUser = new BusinessUser
            {
                Id = this.Id,
                Name = this.Name,
                FirstName = this.FirstName,
                LastName = this.LastName,
                Email = this.Email,
                IsStaff = true,
                OrgId = this.OrgId,
                DOB = this.DOB,

            };
            return businessUser;
        }
    }
}