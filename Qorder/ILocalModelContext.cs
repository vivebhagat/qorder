using Qorder.Core;
using Qorder.Models.Core;
using Qorder.Models.Core.Inventory;
using Qorder.Models.Core.Reservation;
using SpeedFramework.DAO.Commmon;
using System.Data.Entity;

namespace Qorder
{
    public  interface ILocalModelContext : IModelContext
    {
        DbSet<Category> Categories { get; set; }
        DbSet<Counter> Counters { get; set; }
        DbSet<CounterProduct> CounterProducts { get; set; }
        DbSet<Order> Orders { get; set; }
        DbSet<Product> Products { get; set; }
        DbSet<ProductCategory> ProductCategories { get; set; }
        DbSet<ServiceLocation> ServiceLocations { get; set; }
        DbSet<OrderProduct> OrderProducts { get; set; }
        DbSet<Booking> Bookings { get; set; }
        DbSet<BusinessUser> BusinessUsers { get; set; }
        DbSet<KitchenProduct> KitchenProducts { get; set; }
        DbSet<KitchenProductToProcessBooth> KitchenProductToProcessBooths { get; set; }
        DbSet<OrderStatus> OrderStatuses { get; set; }
        DbSet<Payment> Payments { get; set; }
        DbSet<PaymentMethod> PaymentMethods { get; set; }
        DbSet<ProcessBooth> ProcessBooths { get; set; }
        DbSet<ProcessQueueItem> ProcessQueueItems { get; set; }
        DbSet<ProcessQueueStatus> ProcessQueueStatuses { get; set; }
        DbSet<ProductToKitchenProductMap> ProductToKitchenProductMaps { get; set; }
        DbSet<ProductToProcessBoothMap> ProductToProcessBoothMaps { get; set; }
        DbSet<Coupon> Coupons { get; set; }
        DbSet<Event> Events { get; set; }
        DbSet<EventToBusinessUserMap> EventToBusinessUserMaps { get; set; }
        DbSet<Variation> Variations { get; set; }
        DbSet<ProductVariation> ProductVariations { get; set; }

        DbSet<InventoryItem> InventoryItems { get; set; }
        DbSet<InventoryLocation> InventoryLocations { get; set; }
        DbSet<InventoryLocationStock> InventoryLocationStocks { get; set; }
        DbSet<ProductToInventoryItemMap> ProductToInventoryItemMaps { get; set; }
        DbSet<VendorToInventoryItemMap> VendorToInventoryItemMaps { get; set; }
        DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        DbSet<PurchaseOrdersInventoryItem> PurchaseOrdersInventoryItems { get; set; }
        DbSet<Unit> Units { get; set; }

        DbSet<AllocationGroup> AllocationGroups { get; set; }
        DbSet<AllocationResourceMap> AllocationResourceMaps { get; set; }
        DbSet<ResourceCapacity> ResourceCapacities { get; set; }
        DbSet<ResourceCapacityType> ResourceCapacityTypes { get; set; }


    }
}