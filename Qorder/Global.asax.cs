using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Common.WebUI;
using Qorder.Dao.Implementation.Core;
using Qorder.Dao.Implementation.Core.Reservation;
using Qorder.Dao.Implementation.Core.Inventory;
using SpeedFramework.APILib.Controllers;
using SpeedFramework.APILib.Models;
using SpeedFramework.APILib.Models.Misc;
using SpeedFramework.DAO.Commmon;
using System;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web;
using System.Text.RegularExpressions;

namespace Qorder
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            LocalAutofacWebApiConfig.Initialize(GlobalConfiguration.Configuration);
            var builder = new ContainerBuilder();
            builder.RegisterControllers(AppDomain.CurrentDomain.GetAssemblies());
            builder.RegisterType<ScreenLinkRepository>().As<IScreenLinkRepository>().InstancePerRequest();

            var Container = builder.Build();
            var mvcResolver = new AutofacDependencyResolver(Container);
            DependencyResolver.SetResolver(mvcResolver);
        }
        public override void Init()
        {
            BeginRequest += OnBeginRequest;
        }


        protected void OnBeginRequest(object sender, EventArgs e)
        {

            SpeedFramework.APILib.Models.WebApiApplication._OnBeginRequest(Context, sender, e);
        }

        
    }

    public class LocalAutofacWebApiConfig
    {
        public static IContainer Container;

        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }

        public static void Initialize(HttpConfiguration config, IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            AutofacWebApiConfig.BuildContatainer(builder);
            builder.RegisterType<PageAccessController>().As<PageAccessController>().InstancePerRequest();
            builder.RegisterType<LocalDbContext>().As<IModelContext>().InstancePerRequest();
            builder.RegisterType<LocalDbContext>().As<ILocalModelContext>().InstancePerRequest();

            builder.RegisterType<CategoryRepository>().As<ICategoryRepository>().InstancePerRequest();
            builder.RegisterType<CounterRepository>().As<ICounterRepository>().InstancePerRequest();
            builder.RegisterType<CounterProductRepository>().As<ICounterProductRepository>().InstancePerRequest();
            builder.RegisterType<OrderRepository>().As<IOrderRepository>().InstancePerRequest();
            builder.RegisterType<ProductRepository>().As<IProductRepository>().InstancePerRequest();
            builder.RegisterType<ProductCategoryRepository>().As<IProductCategoryRepository>().InstancePerRequest();
            builder.RegisterType<ServiceLocationRepository>().As<IServiceLocationRepository>().InstancePerRequest();
            builder.RegisterType<OrderProductRepository>().As<IOrderProductRepository>().InstancePerRequest();

            builder.RegisterType<BookingRepository>().As<IBookingRepository>().InstancePerRequest();
            builder.RegisterType<BusinessUserRepository>().As<IBusinessUserRepository>().InstancePerRequest();
            builder.RegisterType<KitchenProductRepository>().As<IKitchenProductRepository>().InstancePerRequest();
            builder.RegisterType<KitchenProductToProcessBoothRepository>().As<IKitchenProductToProcessBoothRepository>().InstancePerRequest();
            builder.RegisterType<OrderStatusRepository>().As<IOrderStatusRepository>().InstancePerRequest();
            builder.RegisterType<PaymentRepository>().As<IPaymentRepository>().InstancePerRequest();
            builder.RegisterType<PaymentMethodRepository>().As<IPaymentMethodRepository>().InstancePerRequest();
            builder.RegisterType<ProcessBoothRepository>().As<IProcessBoothRepository>().InstancePerRequest();
            builder.RegisterType<ProcessQueueItemRepository>().As<IProcessQueueItemRepository>().InstancePerRequest();
            builder.RegisterType<ProcessQueueStatusRepository>().As<IProcessQueueStatusRepository>().InstancePerRequest();
            builder.RegisterType<ProductToKitchenProductMapRepository>().As<IProductToKitchenProductMapRepository>().InstancePerRequest();
            builder.RegisterType<ProductToProcessBoothMapRepository>().As<IProductToProcessBoothMapRepository>().InstancePerRequest();

            builder.RegisterType<CouponRepository>().As<ICouponRepository>().InstancePerRequest();
            builder.RegisterType<EventRepository>().As<IEventRepository>().InstancePerRequest();
            builder.RegisterType<EventToBusinessUserMapRepository>().As<IEventToBusinessUserMapRepository>().InstancePerRequest();
            builder.RegisterType<VariationRepository>().As<IVariationRepository>().InstancePerRequest();
            builder.RegisterType<ProductVariationRepository>().As<IProductVariationRepository>().InstancePerRequest();


            builder.RegisterType<InventoryItemRepository>().As<IInventoryItemRepository>().InstancePerRequest();
            builder.RegisterType<InventoryLocationRepository>().As<IInventoryLocationRepository>().InstancePerRequest();
            builder.RegisterType<InventoryLocationStockRepository>().As<IInventoryLocationStockRepository>().InstancePerRequest();
            builder.RegisterType<PurchaseOrderRepository>().As<IPurchaseOrderRepository>().InstancePerRequest();
            builder.RegisterType<PurchaseOrdersInventoryItemRepository>().As<IPurchaseOrdersInventoryItemRepository>().InstancePerRequest();
            builder.RegisterType<ProductToInventoryItemMapRepository>().As<IProductToInventoryItemMapRepository>().InstancePerRequest();
            builder.RegisterType<VendorToInventoryItemMapRepository>().As<IVendorToInventoryItemMapRepository>().InstancePerRequest();
            builder.RegisterType<UnitRepository>().As<IUnitRepository>().InstancePerRequest();
            builder.RegisterType<StaffRepository>().As<IStaffRepository>().InstancePerRequest();
            builder.RegisterType<CustomerRepository>().As<ICustomerRepository>().InstancePerRequest();
            builder.RegisterType<VendorRepository>().As<IVendorRepository>().InstancePerRequest();
            builder.RegisterType<ManagerRepository>().As<IManagerRepository>().InstancePerRequest();

            builder.RegisterType<AllocationGroupRepository>().As<IAllocationGroupRepository>().InstancePerRequest();
            builder.RegisterType<AllocationResourceMapRepository>().As<IAllocationResourceMapRepository>().InstancePerRequest();
            builder.RegisterType<ResourceCapacityRepository>().As<IResourceCapacityRepository>().InstancePerRequest();
            builder.RegisterType<ResourceCapacityTypeRepository>().As<IResourceCapacityTypeRepository>().InstancePerRequest();


            Container = builder.Build();

            return Container;
        }
    }
}
