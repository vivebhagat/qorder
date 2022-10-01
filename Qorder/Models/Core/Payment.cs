
using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;

namespace Qorder.Core
{
    public class Payment : TEntity, UIEntity<Payment>
    {
        public int Id { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }
        public int PaymentMethodId { get; set; }
        public virtual Order Order { get; set; }
        public int? OrderId{ get; set; }
        public double Amount { get; set; }
        public DateTime PaymentOn { get; set; }
        public virtual Currency Currency { get; set; }
        public int CurrencyId { get; set; }
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

        public object absorb(Payment @object)
        {
            return @object;
        }

        public Payment emit()
        {
            return this;
        }
    }
}