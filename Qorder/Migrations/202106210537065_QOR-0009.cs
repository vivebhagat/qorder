namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0009 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.Products", "TaxCode", c => c.Int(nullable: false));
            AddColumn("data.KitchenProducts", "TimeToProcess", c => c.Int(nullable: false));
            DropColumn("data.KitchenProducts", "Amount");
            DropColumn("data.KitchenProducts", "Discount");
        }
        
        public override void Down()
        {
            AddColumn("data.KitchenProducts", "Discount", c => c.Double(nullable: false));
            AddColumn("data.KitchenProducts", "Amount", c => c.Double(nullable: false));
            DropColumn("data.KitchenProducts", "TimeToProcess");
            DropColumn("data.Products", "TaxCode");
        }
    }
}
