using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Qorder.Core
{
    [UIEntity]
//    [NotMapped]
    public class Customer : IBaseIntUser, TEntity, UIEntity<BusinessUser>
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
        public bool IsStaff { get; set; }
        public bool IsVendor { get; set; }
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
            return new Customer { Id = @object.Id,
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
            this.IsCustomer = true;
            BusinessUser businessUser = new BusinessUser { 
                Id = this.Id,
                Name = this.Name,
                FirstName = this.FirstName,
                LastName = this.LastName,
                Email = this.Email,
                IsCustomer = true,
                OrgId = this.OrgId,
                DOB = this.DOB,

            };
            return businessUser;
        }
    }
}