using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;

namespace Qorder.Core
{
    public class ProductToProcessBoothMap : IActivableEntity, UIEntity<ProductToProcessBoothMap>
    {
        public int Id { get; set; }
        public virtual Product Product { get; set; }
        public int ProductId { get; set; }

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

        public object absorb(ProductToProcessBoothMap @object)
        {
            return @object;
        }

        public ProductToProcessBoothMap emit()
        {
            return this;

        }
    }
}