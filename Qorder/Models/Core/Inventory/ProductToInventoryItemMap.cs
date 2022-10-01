using Qorder.Core;
using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Models.Core.Inventory
{
    public class ProductToInventoryItemMap : IActivableEntity, UIEntity<ProductToInventoryItemMap>
    {
        public int Id { get; set; }

        public virtual InventoryItem InventoryItem { get; set; }
        public int InventoryItemId { get; set; }

        public double Quantity { get; set; }

        public virtual Product Product { get; set; }
        public int ProductId { get; set; }

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

        public object absorb(ProductToInventoryItemMap @object)
        {
            return @object;
        }

        public ProductToInventoryItemMap emit()
        {
            return this;
        }
    }
}