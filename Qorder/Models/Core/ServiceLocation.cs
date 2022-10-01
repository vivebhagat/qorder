using Qorder.Models.Core.Reservation;
using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;

namespace Qorder.Core
{
    public class ServiceLocation : IActivableEntity, UIEntity<ServiceLocation>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Counter Counter { get; set; }
        public int CounterId { get; set; }
        public virtual AllocationGroup AllocationGroup { get; set;}
        public int? AllocationGroupId { get; set; }
        public string Url { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int MaxNoOfOrders { get; set; }
        public bool Inactive { get; set; }
        public string ApplicationNumber { get; set; }
        public string LegacyNumber { get; set; }
        public string ExtraDataHolder { get; set; }
        public IntUser CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public DateTime CreatedDate { get; set; }
        public IntUser ModifiedBy { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public IntUser ArchieveBy { get; set; }
        public int? ArchieveById { get; set; }
        public DateTime? ArchieveDate { get; set; }

        public object absorb(ServiceLocation @object)
        {
            return @object; 
        }

        public ServiceLocation emit()
        {
            return this;
        }
    }
}