using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Model.Access;
using System.ComponentModel.DataAnnotations.Schema;

namespace Qorder.Core
{
    [Table("BusinessUsers")]
    public class BusinessUser : IntUser, TEntity, UIEntity<BusinessUser>
    {
        public bool IsCustomer { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsStaff { get; set; }
        public bool IsVendor { get; set; }
        public bool IsManager { get; set; }


        public object absorb(BusinessUser @object)
        {
            return @object;
        }

        BusinessUser UIEntity<BusinessUser>.emit()
        {
            return this;
        }
    }
}