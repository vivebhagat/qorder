using Qorder.Core;
using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Models.Core.Inventory
{
    public class PurchaseOrder : IActivableEntity, UIEntity<PurchaseOrder>
    {
        public int Id { get; set; }
        public double TotalWithoutTax { get; set; }
        public double TotalWithTax { get; set; }
        public DateTime Date {get; set;}
        public virtual BusinessUser Vendor { get; set; }
        public int VendorId { get; set; }

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
        public object absorb(PurchaseOrder @object)
        {
            return @object;
        }

        public PurchaseOrder emit()
        {
            return this;
        }
    }
}