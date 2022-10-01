namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0024 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.ResourceCapacities", "ResourceCapacityTypeId", c => c.Int(nullable: false));
            CreateIndex("data.ResourceCapacities", "ResourceCapacityTypeId");
            AddForeignKey("data.ResourceCapacities", "ResourceCapacityTypeId", "data.ResourceCapacityTypes", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("data.ResourceCapacities", "ResourceCapacityTypeId", "data.ResourceCapacityTypes");
            DropIndex("data.ResourceCapacities", new[] { "ResourceCapacityTypeId" });
            DropColumn("data.ResourceCapacities", "ResourceCapacityTypeId");
        }
    }
}
