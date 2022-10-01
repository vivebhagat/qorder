using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.ComponentModel.DataAnnotations;

namespace Qorder.Core
{
    public class KitchenProductToProcessBooth : IActivableEntity, UIEntity<KitchenProductToProcessBooth>
    {
        [Key]
        public int Id { get; set; }
        public virtual KitchenProduct KitchenProduct { get; set; }
        public int KitchenProductId { get; set; }
        public virtual ProcessBooth ProcessBooth { get; set; }
        public int ProcessBoothId { get; set; }
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

        public object absorb(KitchenProductToProcessBooth @object)
        {
            return @object;
        }

        public KitchenProductToProcessBooth emit()
        {
            return this;
        }
    }
}