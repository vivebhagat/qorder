namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0025 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.ServiceLocations", "StartTime", c => c.DateTime(nullable: false));
            AddColumn("data.ServiceLocations", "EndTime", c => c.DateTime(nullable: false));
            AddColumn("data.ServiceLocations", "MaxNoOfOrders", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("data.ServiceLocations", "MaxNoOfOrders");
            DropColumn("data.ServiceLocations", "EndTime");
            DropColumn("data.ServiceLocations", "StartTime");
        }
    }
}
