namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0022 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.ServiceLocations", "AllocationGroupId", c => c.Int());
            AddColumn("data.ResourceCapacities", "Capacity", c => c.Int(nullable: false));
            CreateIndex("data.ServiceLocations", "AllocationGroupId");
            AddForeignKey("data.ServiceLocations", "AllocationGroupId", "data.AllocationGroups", "Id");
            DropColumn("data.ResourceCapacities", "Capaccity");
        }
        
        public override void Down()
        {
            AddColumn("data.ResourceCapacities", "Capaccity", c => c.Int(nullable: false));
            DropForeignKey("data.ServiceLocations", "AllocationGroupId", "data.AllocationGroups");
            DropIndex("data.ServiceLocations", new[] { "AllocationGroupId" });
            DropColumn("data.ResourceCapacities", "Capacity");
            DropColumn("data.ServiceLocations", "AllocationGroupId");
        }
    }
}
