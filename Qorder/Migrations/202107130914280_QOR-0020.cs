namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0020 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("data.PurchaseOrdersInventoryItems", "VendorId", "data.BusinessUsers");
            DropIndex("data.PurchaseOrdersInventoryItems", new[] { "VendorId" });
            CreateTable(
                "data.AllocationGroups",
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
                "data.AllocationResourceMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartTime = c.DateTime(nullable: false),
                        EndTime = c.DateTime(nullable: false),
                        AllocationGroupId = c.Int(nullable: false),
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
                .ForeignKey("data.AllocationGroups", t => t.AllocationGroupId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.AllocationGroupId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ResourceCapacities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Capaccity = c.Int(nullable: false),
                        AllocationResourceMapId = c.Int(nullable: false),
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
                .ForeignKey("data.AllocationResourceMaps", t => t.AllocationResourceMapId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.AllocationResourceMapId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ResourceCapacityTypes",
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
            
            AddColumn("data.BusinessUsers", "IsManager", c => c.Boolean(nullable: false));
            AddColumn("data.InventoryItems", "TaxCodeId", c => c.Int());
            AddColumn("data.PurchaseOrdersInventoryItems", "PurchaseOrderId", c => c.Int(nullable: false));
            AddColumn("data.PurchaseOrdersInventoryItems", "Quantity", c => c.Double(nullable: false));
            AddColumn("data.PurchaseOrdersInventoryItems", "Total", c => c.Double(nullable: false));
            AddColumn("data.PurchaseOrdersInventoryItems", "TaxCodeId", c => c.Int());
            CreateIndex("data.InventoryItems", "TaxCodeId");
            CreateIndex("data.PurchaseOrdersInventoryItems", "PurchaseOrderId");
            CreateIndex("data.PurchaseOrdersInventoryItems", "TaxCodeId");
            AddForeignKey("data.InventoryItems", "TaxCodeId", "data.TaxCodes", "Id");
            AddForeignKey("data.PurchaseOrdersInventoryItems", "PurchaseOrderId", "data.PurchaseOrders", "Id", cascadeDelete: true);
            AddForeignKey("data.PurchaseOrdersInventoryItems", "TaxCodeId", "data.TaxCodes", "Id");
            DropColumn("data.PurchaseOrdersInventoryItems", "VendorId");
        }
        
        public override void Down()
        {
            AddColumn("data.PurchaseOrdersInventoryItems", "VendorId", c => c.Int(nullable: false));
            DropForeignKey("data.ResourceCapacityTypes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ResourceCapacityTypes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ResourceCapacityTypes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ResourceCapacities", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ResourceCapacities", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ResourceCapacities", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ResourceCapacities", "AllocationResourceMapId", "data.AllocationResourceMaps");
            DropForeignKey("data.PurchaseOrdersInventoryItems", "TaxCodeId", "data.TaxCodes");
            DropForeignKey("data.PurchaseOrdersInventoryItems", "PurchaseOrderId", "data.PurchaseOrders");
            DropForeignKey("data.InventoryItems", "TaxCodeId", "data.TaxCodes");
            DropForeignKey("data.AllocationResourceMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.AllocationResourceMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.AllocationResourceMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.AllocationResourceMaps", "AllocationGroupId", "data.AllocationGroups");
            DropForeignKey("data.AllocationGroups", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.AllocationGroups", "CreatedById", "data.IntUsers");
            DropForeignKey("data.AllocationGroups", "ArchieveById", "data.IntUsers");
            DropIndex("data.ResourceCapacityTypes", new[] { "ArchieveById" });
            DropIndex("data.ResourceCapacityTypes", new[] { "ModifiedById" });
            DropIndex("data.ResourceCapacityTypes", new[] { "CreatedById" });
            DropIndex("data.ResourceCapacities", new[] { "ArchieveById" });
            DropIndex("data.ResourceCapacities", new[] { "ModifiedById" });
            DropIndex("data.ResourceCapacities", new[] { "CreatedById" });
            DropIndex("data.ResourceCapacities", new[] { "AllocationResourceMapId" });
            DropIndex("data.PurchaseOrdersInventoryItems", new[] { "TaxCodeId" });
            DropIndex("data.PurchaseOrdersInventoryItems", new[] { "PurchaseOrderId" });
            DropIndex("data.InventoryItems", new[] { "TaxCodeId" });
            DropIndex("data.AllocationResourceMaps", new[] { "ArchieveById" });
            DropIndex("data.AllocationResourceMaps", new[] { "ModifiedById" });
            DropIndex("data.AllocationResourceMaps", new[] { "CreatedById" });
            DropIndex("data.AllocationResourceMaps", new[] { "AllocationGroupId" });
            DropIndex("data.AllocationGroups", new[] { "ArchieveById" });
            DropIndex("data.AllocationGroups", new[] { "ModifiedById" });
            DropIndex("data.AllocationGroups", new[] { "CreatedById" });
            DropColumn("data.PurchaseOrdersInventoryItems", "TaxCodeId");
            DropColumn("data.PurchaseOrdersInventoryItems", "Total");
            DropColumn("data.PurchaseOrdersInventoryItems", "Quantity");
            DropColumn("data.PurchaseOrdersInventoryItems", "PurchaseOrderId");
            DropColumn("data.InventoryItems", "TaxCodeId");
            DropColumn("data.BusinessUsers", "IsManager");
            DropTable("data.ResourceCapacityTypes");
            DropTable("data.ResourceCapacities");
            DropTable("data.AllocationResourceMaps");
            DropTable("data.AllocationGroups");
            CreateIndex("data.PurchaseOrdersInventoryItems", "VendorId");
            AddForeignKey("data.PurchaseOrdersInventoryItems", "VendorId", "data.BusinessUsers", "Id");
        }
    }
}
