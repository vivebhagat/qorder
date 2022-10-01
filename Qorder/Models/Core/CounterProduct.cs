using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.ComponentModel.DataAnnotations;

namespace Qorder.Core
{
    public class CounterProduct : IActivableEntity, UIEntity<CounterProduct>
    {
        [Key]
        public int Id { get; set; }
        public virtual Counter Counter { get; set; }
        public int CounterId { get; set; }
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

        public object absorb(CounterProduct @object)
        {
            return @object;
        }

        public CounterProduct emit()
        {
            return this;
        }
    }
}