using Common.DAO.Access;
using Qorder.Core;
using Qorder.Models.Core;
using Qorder.Models.Core.Inventory;
using Qorder.Models.Core.Reservation;
using SpeedFramework.Common.CoreModels;
using SpeedFramework.DAO.Commmon;
using SpeedFramework.DAO.Core.Model.UiSetup;
using SpeedFramework.DAO.Model.Access;
using SpeedFramework.DAO.Model.Custom.Communication;
using SpeedFramework.DAO.Model.Custom.Entity;
using SpeedFramework.DAO.Model.Custom.FileSystem;
using SpeedFramework.DAO.Model.Custom.Filter;
using SpeedFramework.DAO.Model.Custom.Scripting;
using SpeedFramework.DAO.Model.Custom.StateMachine;
using SpeedFramework.DAO.Model.Custom.UiSetup.Widget;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;

namespace Qorder
{
    internal class LocalDbContext : AbstractModelContext, ILocalModelContext
    {
        public LocalDbContext(IAccountContext accountContext) : base(accountContext)
        {
        }

        public DbSet<ApplicationEntity> ApplicationEntities { get; set; }
        public DbSet<ApplicationEntityAccessExpression> ApplicationEntityAccessExpressions { get; set; }
        public DbSet<ApplicationEntityProperty> ApplicationEntityProperties { get; set; }
        public DbSet<Communication> Communications { get; set; }
        public DbSet<CommunicationTemplateRoleRecieverMap> CommunicationTemplateRoleRecieverMaps { get; set; }
        public DbSet<CommunicationTemplate> CommunicationTemplates { get; set; }
        public DbSet<CommunicationTemplateUserRecieverMap> CommunicationTemplateUserRecieverMaps { get; set; }
        public DbSet<CommunicationType> CommunicationTypes { get; set; }
        public DbSet<CustomPageLink> CustomPageLinks { get; set; }
        public DbSet<CustomPage> CustomPages { get; set; }
        public DbSet<Dashboard> Dashboards { get; set; }
        public DbSet<EntityScript> EntityScripts { get; set; }
        public DbSet<FieldEvent> FieldEvents { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<FieldType> FieldTypes { get; set; }
        public DbSet<Filter> Filters { get; set; }
        public DbSet<FilterField> FilterFields { get; set; }
        public DbSet<FilterList> FilterLists { get; set; }
        public DbSet<FilterResultField> FilterResultFields { get; set; }
        public DbSet<FormEvent> FormEvents { get; set; }
        public DbSet<FormFieldMap> FormFieldMaps { get; set; }
        public DbSet<Form> Forms { get; set; }
        public DbSet<IntUser> IntUsers { get; set; }
        public DbSet<Label> Labels { get; set; }
        public string NoSqlConnectionString { get; set; }
        public string NoSqlDatabase { get; set; }
        public DbSet<OptionList> OptionLists { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<OwnershipEntityAccess> OwnershipEntityAccesses { get; set; }
        public DbSet<PageAccess> PageAccesses { get; set; }
        public DbSet<PageLink> PageLinks { get; set; }
        public DbSet<Script> Scripts { get; set; }
        public DbSet<StateActionAccess> StateActionAccesses { get; set; }
        public DbSet<StateAction> StateActions { get; set; }
        public DbSet<StateActionStatement> StateActionStatements { get; set; }
        public DbSet<UserDefinedRoleMap> UserDefinedRoleMaps { get; set; }
        public DbSet<UserDefinedRole> UserDefinedRoles { get; set; }
        public DbSet<UserDefinedRoleToUserMap> UserDefinedRoleToUserMaps { get; set; }
        public DbSet<WidgetData> WidgetDatas { get; set; }
        public DbSet<WidgetParameter> WidgetParameters { get; set; }
        public DbSet<WidgetParameterType> WidgetParameterTypes { get; set; }
        public DbSet<Widget> Widgets { get; set; }
        public DbSet<WidgetTemplate> WidgetTemplates { get; set; }
        public DbSet<WidgetType> WidgetTypes { get; set; }
        public DbSet<ApplicationFile> ApplicationFiles { get; set; }
        public DbSet<ApplicationFileGroup> ApplicationFileGroups { get; set; }
        public DbSet<ServerDirectory> ServerDirectories { get; set; }
        public DbSet<ApplicationFileType> ApplicationFileTypes { get; set; }
        public DbSet<GroupToApplicationFileMapping> GroupToApplicationFileMappings { get; set; }
        public DbSet<Category> Categories { get ; set ; }
        public DbSet<Counter> Counters { get ; set ; }
        public DbSet<CounterProduct> CounterProducts { get ; set ; }
        public DbSet<Order> Orders { get ; set ; }
        public DbSet<Product> Products { get ; set ; }
        public DbSet<ProductCategory> ProductCategories { get ; set ; }
        public DbSet<ServiceLocation> ServiceLocations { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

        public DbSet<Menu> Menus { get; set; }
        public DbSet<EntityNote> EntityNotes { get; set; }
        public DbSet<NoteType> NoteTypes { get; set; }
        public DbSet<ChildEntityRelation> ChildEntityRelations { get; set; }
        public DbSet<UserTask> UserTasks { get; set; }
        public DbSet<UserTaskType> UserTaskTypes { get; set; }

        public DbSet<SysParameter> SysParameters { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<TaxCode> TaxCodes { get; set; }
        public DbSet<Currency> Currencies { get; set; }

        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BusinessUser> BusinessUsers { get; set; }
        public DbSet<KitchenProduct> KitchenProducts { get; set; }
        public DbSet<KitchenProductToProcessBooth> KitchenProductToProcessBooths { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<ProcessBooth> ProcessBooths { get; set; }
        public DbSet<ProcessQueueItem> ProcessQueueItems { get; set; }
        public DbSet<ProcessQueueStatus> ProcessQueueStatuses { get; set; }
        public DbSet<ProductToKitchenProductMap> ProductToKitchenProductMaps { get; set; }
        public DbSet<ProductToProcessBoothMap> ProductToProcessBoothMaps { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventToBusinessUserMap> EventToBusinessUserMaps { get; set; }
        public DbSet<Variation> Variations { get; set; }
        public DbSet<ProductVariation> ProductVariations { get; set; }
        public DbSet<Alert> Alerts { get; set; }

        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<InventoryLocation> InventoryLocations { get; set; }
        public DbSet<InventoryLocationStock> InventoryLocationStocks { get; set; }
        public DbSet<ProductToInventoryItemMap> ProductToInventoryItemMaps { get; set; }
        public DbSet<VendorToInventoryItemMap> VendorToInventoryItemMaps { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<PurchaseOrdersInventoryItem> PurchaseOrdersInventoryItems { get; set; }
        public DbSet<Unit> Units { get; set; }

        public DbSet<AllocationGroup> AllocationGroups { get; set; }
        public DbSet<AllocationResourceMap> AllocationResourceMaps { get; set; }
        public DbSet<ResourceCapacity> ResourceCapacities { get; set; }
        public DbSet<ResourceCapacityType> ResourceCapacityTypes { get; set; }





        public IList<T> GetClassByType<T>()
        {
            return Assembly.GetExecutingAssembly().GetTypes()
                              .Where(p => typeof(T)
                              .IsAssignableFrom(p) && !p.IsAbstract && !p.IsInterface)
                              .Select(c => (T)Activator.CreateInstance(c)).ToList();
        }
        public LocalDbContext() : base()
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelbuilder)
        {
            modelbuilder.HasDefaultSchema("data");
        }
    }
}