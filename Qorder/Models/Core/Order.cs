using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.ComponentModel.DataAnnotations;

namespace Qorder.Core
{
    public class Order : IActivableEntity, UIEntity<Order>
    {
        [Key]
        public int Id { get; set; }
        public string AltName { get; set; }
        public string AltContact { get; set; }
        public string AltEmail { get; set; }

        public virtual Counter Counter { get; set; }
        public int? CounterId { get; set; }

        public virtual BusinessUser OrderedBy { get; set; }
        public int? OrderedById { get; set; }

        public DateTime Date { get; set; }
        public double TotalWithoutTax { get; set; }
        public double TotalWithTax { get; set; }
        public double Discount { get; set; }
        public bool IsComplete { get; set; }
        public bool IsCancelled { get; set; }

        public virtual ServiceLocation ServiceLocation { get; set; }
        public int? ServiceLocationId { get; set; }

        public virtual OrderStatus OrderStatus {get; set;}
        public int OrderStatusId { get; set; }

        public virtual Booking Booking { get; set; }
        public int? BookingId { get; set; }

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

        public object absorb(Order @object)
        {
            return @object;
        }

        public Order emit()
        {
            return this;
        }
    }
}