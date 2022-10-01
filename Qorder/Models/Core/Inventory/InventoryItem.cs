using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;

namespace Qorder.Models.Core.Inventory
{
    public class InventoryItem : IActivableEntity, UIEntity<InventoryItem>
    {
        public int Id { get; set; }

        public string Name {get; set;}
        public virtual TaxCode TaxCode { get; set; }
        public int? TaxCodeId { get; set; }
        public virtual Unit Unit { get; set; }
        public int UnitId { get; set; }
        public double BasePrice { get; set; }

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

        public object absorb(InventoryItem @object)
        {
            return @object;
        }

        public InventoryItem emit()
        {
            return this;
        }
    }
}