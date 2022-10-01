
using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;

namespace Qorder.Core
{
    public class Booking : IActivableEntity,UIEntity<Booking>
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public virtual ServiceLocation ServiceLocation { get; set; }
        public int ServiceLocationId { get; set; }

        public virtual BusinessUser Customer { get; set; }
        public int CustomerId { get; set; }

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

        public object absorb(Booking @object)
        {
            return @object;
        }

        public Booking emit()
        {
            return this;
        }
    }
}