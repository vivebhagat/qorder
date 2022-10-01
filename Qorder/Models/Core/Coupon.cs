using Qorder.Core;
using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Core.Model.UiSetup;
using SpeedFramework.DAO.Model.Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Models.Core
{
    public class Coupon : IActivableUIEntity, UIEntity<Coupon>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Value { get; set; }
        public DateTime? CouponTimeValidity { get; set; }
        public DateTime? DistributerTimeValidity { get; set; }
        public virtual BusinessUser Customer { get; set; }
        public int? CustomerId { get; set; }
        public bool Inactive { get; set; }
        public Form UIForm { get; set; }
        public int? UIFormId { get; set; }
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

        public object absorb(Coupon @object)
        {
            return @object;
        }

        public Coupon emit()
        {
            return this;
        }
    }
}