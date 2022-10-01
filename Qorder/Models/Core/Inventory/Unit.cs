using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Qorder.Models.Core.Inventory
{
    public class Unit : TEntity, UIEntity<Unit>
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
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

        public object absorb(Unit @object)
        {
            return @object;
        }

        public Unit emit()
        {
            return this;
        }
    }
}