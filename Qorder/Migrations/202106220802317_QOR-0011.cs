namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0011 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "data.Coupons",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Value = c.Int(nullable: false),
                        CouponTimeValidity = c.DateTime(),
                        DistributerTimeValidity = c.DateTime(),
                        CustomerId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
                        UIFormId = c.Int(),
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
                .ForeignKey("data.BusinessUsers", t => t.CustomerId)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Forms", t => t.UIFormId)
                .Index(t => t.CustomerId)
                .Index(t => t.UIFormId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        EventDate = c.DateTime(nullable: false),
                        Desciption = c.String(),
                        Address = c.String(),
                        Agenda = c.String(),
                        _lat = c.Double(nullable: false),
                        _long = c.Double(nullable: false),
                        Url = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        UIFormId = c.Int(),
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
                .ForeignKey("data.Forms", t => t.UIFormId)
                .Index(t => t.UIFormId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.EventToBusinessUserMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EventId = c.Int(nullable: false),
                        BusinessUserId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        UIFormId = c.Int(),
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
                .ForeignKey("data.BusinessUsers", t => t.BusinessUserId)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.Events", t => t.EventId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Forms", t => t.UIFormId)
                .Index(t => t.EventId)
                .Index(t => t.BusinessUserId)
                .Index(t => t.UIFormId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ProductVariations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        VariationId = c.Int(nullable: false),
                        OffsetAmount = c.Double(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        UIFormId = c.Int(),
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
                .ForeignKey("data.Products", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("data.Forms", t => t.UIFormId)
                .ForeignKey("data.Variations", t => t.VariationId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.VariationId)
                .Index(t => t.UIFormId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Variations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        UIFormId = c.Int(),
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
                .ForeignKey("data.Forms", t => t.UIFormId)
                .Index(t => t.UIFormId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
        }
        
        public override void Down()
        {
            DropForeignKey("data.ProductVariations", "VariationId", "data.Variations");
            DropForeignKey("data.Variations", "UIFormId", "data.Forms");
            DropForeignKey("data.Variations", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Variations", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Variations", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ProductVariations", "UIFormId", "data.Forms");
            DropForeignKey("data.ProductVariations", "ProductId", "data.Products");
            DropForeignKey("data.ProductVariations", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ProductVariations", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ProductVariations", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.EventToBusinessUserMaps", "UIFormId", "data.Forms");
            DropForeignKey("data.EventToBusinessUserMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.EventToBusinessUserMaps", "EventId", "data.Events");
            DropForeignKey("data.EventToBusinessUserMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.EventToBusinessUserMaps", "BusinessUserId", "data.BusinessUsers");
            DropForeignKey("data.EventToBusinessUserMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Events", "UIFormId", "data.Forms");
            DropForeignKey("data.Events", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Events", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Events", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Coupons", "UIFormId", "data.Forms");
            DropForeignKey("data.Coupons", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Coupons", "CustomerId", "data.BusinessUsers");
            DropForeignKey("data.Coupons", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Coupons", "ArchieveById", "data.IntUsers");
            DropIndex("data.Variations", new[] { "ArchieveById" });
            DropIndex("data.Variations", new[] { "ModifiedById" });
            DropIndex("data.Variations", new[] { "CreatedById" });
            DropIndex("data.Variations", new[] { "UIFormId" });
            DropIndex("data.ProductVariations", new[] { "ArchieveById" });
            DropIndex("data.ProductVariations", new[] { "ModifiedById" });
            DropIndex("data.ProductVariations", new[] { "CreatedById" });
            DropIndex("data.ProductVariations", new[] { "UIFormId" });
            DropIndex("data.ProductVariations", new[] { "VariationId" });
            DropIndex("data.ProductVariations", new[] { "ProductId" });
            DropIndex("data.EventToBusinessUserMaps", new[] { "ArchieveById" });
            DropIndex("data.EventToBusinessUserMaps", new[] { "ModifiedById" });
            DropIndex("data.EventToBusinessUserMaps", new[] { "CreatedById" });
            DropIndex("data.EventToBusinessUserMaps", new[] { "UIFormId" });
            DropIndex("data.EventToBusinessUserMaps", new[] { "BusinessUserId" });
            DropIndex("data.EventToBusinessUserMaps", new[] { "EventId" });
            DropIndex("data.Events", new[] { "ArchieveById" });
            DropIndex("data.Events", new[] { "ModifiedById" });
            DropIndex("data.Events", new[] { "CreatedById" });
            DropIndex("data.Events", new[] { "UIFormId" });
            DropIndex("data.Coupons", new[] { "ArchieveById" });
            DropIndex("data.Coupons", new[] { "ModifiedById" });
            DropIndex("data.Coupons", new[] { "CreatedById" });
            DropIndex("data.Coupons", new[] { "UIFormId" });
            DropIndex("data.Coupons", new[] { "CustomerId" });
            DropTable("data.Variations");
            DropTable("data.ProductVariations");
            DropTable("data.EventToBusinessUserMaps");
            DropTable("data.Events");
            DropTable("data.Coupons");
        }
    }
}
