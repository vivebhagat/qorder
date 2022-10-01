namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0013 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.ServiceLocations", "CounterId", c => c.Int(nullable: false));
            CreateIndex("data.ServiceLocations", "CounterId");
            AddForeignKey("data.ServiceLocations", "CounterId", "data.Counters", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("data.ServiceLocations", "CounterId", "data.Counters");
            DropIndex("data.ServiceLocations", new[] { "CounterId" });
            DropColumn("data.ServiceLocations", "CounterId");
        }
    }
}
