using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.ComponentModel.DataAnnotations;

namespace Qorder.Core
{
    public class OrderProduct : IActivableEntity, UIEntity<OrderProduct>
    {
        [Key]
        public int Id { get; set; }

        public virtual Order Order { get; set; }
        public int OrderId { get; set; }

        public virtual Product Product { get; set; }
        public int ProductId { get; set; }

        public bool IsMapped { get; set; }
        public double CurrentAmount { get; set; }

        public virtual TaxCode TaxCode { get; set; }
        public int? TaxCodeId { get; set; }
        public double Discount { get; set; }
        public int Quantity { get; set; }
        public double Total { get; set; }


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
      

        public object absorb(OrderProduct @object)
        {
            return @object;
        }

        public OrderProduct emit()
        {
            return this;
        }
    }
}