namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0019 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.OrderProducts", "Discount", c => c.Double(nullable: false));
            AddColumn("data.Orders", "Discount", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("data.Orders", "Discount");
            DropColumn("data.OrderProducts", "Discount");
        }
    }
}
