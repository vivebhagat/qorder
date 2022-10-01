namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0016 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.Products", "TaxCodeId", c => c.Int());
            AddColumn("data.OrderProducts", "TaxCodeId", c => c.Int());
            AddColumn("data.Orders", "ServiceLocationId", c => c.Int());
            CreateIndex("data.Products", "TaxCodeId");
            CreateIndex("data.OrderProducts", "TaxCodeId");
            CreateIndex("data.Orders", "ServiceLocationId");
            AddForeignKey("data.Products", "TaxCodeId", "data.TaxCodes", "Id");
            AddForeignKey("data.Orders", "ServiceLocationId", "data.ServiceLocations", "Id");
            AddForeignKey("data.OrderProducts", "TaxCodeId", "data.TaxCodes", "Id");
            DropColumn("data.Products", "TaxCode");
            DropColumn("data.Orders", "Tax");
        }
        
        public override void Down()
        {
            AddColumn("data.Orders", "Tax", c => c.Double(nullable: false));
            AddColumn("data.Products", "TaxCode", c => c.Int(nullable: false));
            DropForeignKey("data.OrderProducts", "TaxCodeId", "data.TaxCodes");
            DropForeignKey("data.Orders", "ServiceLocationId", "data.ServiceLocations");
            DropForeignKey("data.Products", "TaxCodeId", "data.TaxCodes");
            DropIndex("data.Orders", new[] { "ServiceLocationId" });
            DropIndex("data.OrderProducts", new[] { "TaxCodeId" });
            DropIndex("data.Products", new[] { "TaxCodeId" });
            DropColumn("data.Orders", "ServiceLocationId");
            DropColumn("data.OrderProducts", "TaxCodeId");
            DropColumn("data.Products", "TaxCodeId");
        }
    }
}
