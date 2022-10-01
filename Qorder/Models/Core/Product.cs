using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.ComponentModel.DataAnnotations;

namespace Qorder.Core
{


    public class Product : IActivableEntity, UIEntity<Product>
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual Organization Organization { get; set; }
        public int? OrganizationId { get; set; }
        public double Amount { get; set; }
        public double Discount { get; set; }
        public string Sku { get; set; }
        public string Url { get; set; }
        public virtual TaxCode TaxCode { get; set; }
        public int? TaxCodeId { get; set; }
        public bool Inactive { get; set; }
        public string ApplicationNumber { get; set; }
        public string LegacyNumber { get; set; }
        public virtual IntUser CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual IntUser ModifiedBy { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public virtual IntUser ArchieveBy { get; set; }
        public int? ArchieveById { get; set; }
        public DateTime? ArchieveDate { get; set; }
        public string ExtraDataHolder { get; set; }

        public object absorb(Product @object)
        {
            return @object;
        }

        public Product emit()
        {
            return this;
        }
    }
}