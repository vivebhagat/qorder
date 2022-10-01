namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0023 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.InventoryItems", "BasePrice", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("data.InventoryItems", "BasePrice");
        }
    }
}
