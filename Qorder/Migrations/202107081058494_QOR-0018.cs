namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0018 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "data.InventoryItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        UnitId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Units", t => t.UnitId, cascadeDelete: true)
                .Index(t => t.UnitId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Units",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.InventoryLocations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.InventoryLocationStocks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Quantity = c.Double(nullable: false),
                        InventoryLocationId = c.Int(nullable: false),
                        InventoryItemId = c.Int(nullable: false),
                        MinimumStockLevel = c.Double(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.InventoryItems", t => t.InventoryItemId, cascadeDelete: true)
                .ForeignKey("data.InventoryLocations", t => t.InventoryLocationId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.InventoryLocationId)
                .Index(t => t.InventoryItemId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ProductToInventoryItemMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        InventoryItemId = c.Int(nullable: false),
                        Quantity = c.Double(nullable: false),
                        ProductId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.InventoryItems", t => t.InventoryItemId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.InventoryItemId)
                .Index(t => t.ProductId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.PurchaseOrders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TotalWithoutTax = c.Double(nullable: false),
                        TotalWithTax = c.Double(nullable: false),
                        Date = c.DateTime(nullable: false),
                        VendorId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.BusinessUsers", t => t.VendorId)
                .Index(t => t.VendorId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.PurchaseOrdersInventoryItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        InventoryItemId = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                        VendorId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.InventoryItems", t => t.InventoryItemId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.BusinessUsers", t => t.VendorId)
                .Index(t => t.InventoryItemId)
                .Index(t => t.VendorId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.VendorToInventoryItemMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        InventoryItemId = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                        VendorId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.InventoryItems", t => t.InventoryItemId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.BusinessUsers", t => t.VendorId)
                .Index(t => t.InventoryItemId)
                .Index(t => t.VendorId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            AddColumn("data.BusinessUsers", "IsStaff", c => c.Boolean(nullable: false));
            AddColumn("data.BusinessUsers", "IsVendor", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("data.VendorToInventoryItemMaps", "VendorId", "data.BusinessUsers");
            DropForeignKey("data.VendorToInventoryItemMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.VendorToInventoryItemMaps", "InventoryItemId", "data.InventoryItems");
            DropForeignKey("data.VendorToInventoryItemMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.VendorToInventoryItemMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.PurchaseOrdersInventoryItems", "VendorId", "data.BusinessUsers");
            DropForeignKey("data.PurchaseOrdersInventoryItems", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.PurchaseOrdersInventoryItems", "InventoryItemId", "data.InventoryItems");
            DropForeignKey("data.PurchaseOrdersInventoryItems", "CreatedById", "data.IntUsers");
            DropForeignKey("data.PurchaseOrdersInventoryItems", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.PurchaseOrders", "VendorId", "data.BusinessUsers");
            DropForeignKey("data.PurchaseOrders", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.PurchaseOrders", "CreatedById", "data.IntUsers");
            DropForeignKey("data.PurchaseOrders", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ProductToInventoryItemMaps", "ProductId", "data.Products");
            DropForeignKey("data.ProductToInventoryItemMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ProductToInventoryItemMaps", "InventoryItemId", "data.InventoryItems");
            DropForeignKey("data.ProductToInventoryItemMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ProductToInventoryItemMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.InventoryLocationStocks", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.InventoryLocationStocks", "InventoryLocationId", "data.InventoryLocations");
            DropForeignKey("data.InventoryLocationStocks", "InventoryItemId", "data.InventoryItems");
            DropForeignKey("data.InventoryLocationStocks", "CreatedById", "data.IntUsers");
            DropForeignKey("data.InventoryLocationStocks", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.InventoryLocations", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.InventoryLocations", "CreatedById", "data.IntUsers");
            DropForeignKey("data.InventoryLocations", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.InventoryItems", "UnitId", "data.Units");
            DropForeignKey("data.Units", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Units", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Units", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.InventoryItems", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.InventoryItems", "CreatedById", "data.IntUsers");
            DropForeignKey("data.InventoryItems", "ArchieveById", "data.IntUsers");
            DropIndex("data.VendorToInventoryItemMaps", new[] { "ArchieveById" });
            DropIndex("data.VendorToInventoryItemMaps", new[] { "ModifiedById" });
            DropIndex("data.VendorToInventoryItemMaps", new[] { "CreatedById" });
            DropIndex("data.VendorToInventoryItemMaps", new[] { "VendorId" });
            DropIndex("data.VendorToInventoryItemMaps", new[] { "InventoryItemId" });
            DropIndex("data.PurchaseOrdersInventoryItems", new[] { "ArchieveById" });
            DropIndex("data.PurchaseOrdersInventoryItems", new[] { "ModifiedById" });
            DropIndex("data.PurchaseOrdersInventoryItems", new[] { "CreatedById" });
            DropIndex("data.PurchaseOrdersInventoryItems", new[] { "VendorId" });
            DropIndex("data.PurchaseOrdersInventoryItems", new[] { "InventoryItemId" });
            DropIndex("data.PurchaseOrders", new[] { "ArchieveById" });
            DropIndex("data.PurchaseOrders", new[] { "ModifiedById" });
            DropIndex("data.PurchaseOrders", new[] { "CreatedById" });
            DropIndex("data.PurchaseOrders", new[] { "VendorId" });
            DropIndex("data.ProductToInventoryItemMaps", new[] { "ArchieveById" });
            DropIndex("data.ProductToInventoryItemMaps", new[] { "ModifiedById" });
            DropIndex("data.ProductToInventoryItemMaps", new[] { "CreatedById" });
            DropIndex("data.ProductToInventoryItemMaps", new[] { "ProductId" });
            DropIndex("data.ProductToInventoryItemMaps", new[] { "InventoryItemId" });
            DropIndex("data.InventoryLocationStocks", new[] { "ArchieveById" });
            DropIndex("data.InventoryLocationStocks", new[] { "ModifiedById" });
            DropIndex("data.InventoryLocationStocks", new[] { "CreatedById" });
            DropIndex("data.InventoryLocationStocks", new[] { "InventoryItemId" });
            DropIndex("data.InventoryLocationStocks", new[] { "InventoryLocationId" });
            DropIndex("data.InventoryLocations", new[] { "ArchieveById" });
            DropIndex("data.InventoryLocations", new[] { "ModifiedById" });
            DropIndex("data.InventoryLocations", new[] { "CreatedById" });
            DropIndex("data.Units", new[] { "ArchieveById" });
            DropIndex("data.Units", new[] { "ModifiedById" });
            DropIndex("data.Units", new[] { "CreatedById" });
            DropIndex("data.InventoryItems", new[] { "ArchieveById" });
            DropIndex("data.InventoryItems", new[] { "ModifiedById" });
            DropIndex("data.InventoryItems", new[] { "CreatedById" });
            DropIndex("data.InventoryItems", new[] { "UnitId" });
            DropColumn("data.BusinessUsers", "IsVendor");
            DropColumn("data.BusinessUsers", "IsStaff");
            DropTable("data.VendorToInventoryItemMaps");
            DropTable("data.PurchaseOrdersInventoryItems");
            DropTable("data.PurchaseOrders");
            DropTable("data.ProductToInventoryItemMaps");
            DropTable("data.InventoryLocationStocks");
            DropTable("data.InventoryLocations");
            DropTable("data.Units");
            DropTable("data.InventoryItems");
        }
    }
}
