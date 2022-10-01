using Common.DAO.Access;
using Common.Exceptions;
using Common.Helper;
using Common.Standard;
using Qorder.Core;
using Qorder.Models.Core.Inventory;
using SpeedFramework.DAO.Model.Access;
using SpeedFramework.DAO.Repository.Implementation;
using SpeedFramework.DAO.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qorder.Dao.Implementation.Core.Inventory
{
    public interface IPurchaseOrdersInventoryItemRepository : IGenericTransformRepository<PurchaseOrdersInventoryItem, PurchaseOrdersInventoryItem>
    {
        IEnumerable<PurchaseOrdersInventoryItem> GetPurchaseOrdersInventoryItemForPurchaseOrder(int id);
    }

    public class PurchaseOrdersInventoryItemRepository : GenericTransformRepository<PurchaseOrdersInventoryItem, PurchaseOrdersInventoryItem>, IPurchaseOrdersInventoryItemRepository
    {
        ILocalModelContext db;

        public PurchaseOrdersInventoryItemRepository(ILocalModelContext db, IUserContext userContext, IAccountContext accountContext, IResultContext resultContext) : base(db, userContext, accountContext, resultContext)
        {
            this.db = db;
            this.userContext = userContext;
        }


        public override void Validate(PurchaseOrdersInventoryItem @Object)
        {
            Dignos.CheckException(@Object == null, StandardMessage.ERR_NO_DETAILS);
            // Dignos.CheckException(String.IsNullOrEmpty(@Object.Name), StandardMessage.ERR_REQUIRED_FIELD.FormatError("Name"));
            //CheckDuplicate(@Object, m => m.Name == @Object.Name);
        }

        public IEnumerable<PurchaseOrdersInventoryItem> GetPurchaseOrdersInventoryItemForPurchaseOrder(int Id)
        {
            return db.PurchaseOrdersInventoryItems.Where(m => m.PurchaseOrderId == Id && !m.Inactive && (m.ArchieveDate == null)).OrderByDescending(m => m.Id).ToList();
        }

        public override IQueryable<PurchaseOrdersInventoryItem> GetAccessFilterdSet()
        {
            return _set.Where(m => m.ArchieveDate == null);
        }


        private void ProcessPurchaseOrderItmes(PurchaseOrdersInventoryItem @Object)
        {
            PurchaseOrdersInventoryItem purchaseOrdersInventoryItem = db.PurchaseOrdersInventoryItems.Where(m => m.PurchaseOrderId == Object.PurchaseOrderId && m.InventoryItemId == Object.InventoryItemId).FirstOrDefault();
            if (purchaseOrdersInventoryItem != null)
            {
                throw new DataProcessingException("Product already exists.");
            }

            TaxCode _tax = db.InventoryItems.Where(m => m.Id == @Object.InventoryItemId).Select(m => m.TaxCode).FirstOrDefault();
            if (_tax == null) { throw new DataProcessingException("Tax Code is not configured."); }
            @Object.TaxCode = _tax;
            double _price = db.InventoryItems.Where(m => m.Id == @Object.InventoryItemId).Select(m => m.BasePrice).FirstOrDefault();

            VendorToInventoryItemMap vendor = db.VendorToInventoryItemMaps.Where(m => m.VendorId == @Object.PurchaseOrder.VendorId && m.InventoryItemId == @Object.InventoryItemId).FirstOrDefault();
            if (vendor != null)
            {
                double PurchaseOrdersInventoryItemTotal = vendor.Price * @Object.Quantity;
                @Object.Price = Math.Round(vendor.Price * @Object.Quantity, 2);
                @Object.Total = Math.Round(PurchaseOrdersInventoryItemTotal * (1 + _tax.Value / 100), 2);
            }
            else
            {
                double PurchaseOrdersInventoryItemTotal = _price * @Object.Quantity;
                @Object.Price = Math.Round(_price * @Object.Quantity, 2);
                @Object.Total = Math.Round(PurchaseOrdersInventoryItemTotal * (1 + _tax.Value / 100), 2);
            }

        }

        private void ProcessPurchaseOrder(int Id)
        {

            double total = 0.0;
            double totalwithtax = 0.0;
            List<PurchaseOrdersInventoryItem> purchaseordersInventoryItems = db.PurchaseOrdersInventoryItems.AsNoTracking().Where(m => m.PurchaseOrderId == Id).ToList();
            foreach (PurchaseOrdersInventoryItem p in purchaseordersInventoryItems)
            {


                double _price = db.InventoryItems.Where(m => m.Id == p.InventoryItemId).Select(m => m.BasePrice).FirstOrDefault();
                TaxCode _tax = db.InventoryItems.Where(m => m.Id == p.InventoryItemId).Select(m => m.TaxCode).FirstOrDefault();
                if (_tax == null) { throw new DataProcessingException("Tax Code is not configured."); }
                double PurchaseOrdersInventoryItemTotal = _price * p.Quantity;


                p.Price = Math.Round(_price * p.Quantity, 2);
                p.Total = Math.Round(PurchaseOrdersInventoryItemTotal * (1 + _tax.Value / 100), 2);
                p.TaxCodeId = _tax.Id;
                total += PurchaseOrdersInventoryItemTotal;
                totalwithtax += PurchaseOrdersInventoryItemTotal * (1 + _tax.Value / 100);

            }

            PurchaseOrder purchaseorder = db.PurchaseOrders.Where(m => m.Id == Id).FirstOrDefault();
            purchaseorder.TotalWithoutTax = total;
            purchaseorder.TotalWithTax = totalwithtax;
            db.GetDbContext().Entry(purchaseorder).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

        }

        public override void BeforeAdd(PurchaseOrdersInventoryItem @Object)
        {

            ProcessPurchaseOrderItmes(@Object);

        }

        public override void AfterAdd(PurchaseOrdersInventoryItem @Object)
        {
            ProcessPurchaseOrder(@Object.PurchaseOrderId);

        }

        public override void BeforeEdit(PurchaseOrdersInventoryItem @Object)
        {
            ProcessPurchaseOrderItmes(@Object);
        }

        public override void AfterEdit(PurchaseOrdersInventoryItem @Object)
        {

            ProcessPurchaseOrder(@Object.PurchaseOrderId);

        }

    }
}
