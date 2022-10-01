namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR_0006 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("data.Counters", "CustomerId", "data.BusinessUsers");
            DropIndex("data.Counters", new[] { "CustomerId" });
            DropColumn("data.Counters", "CustomerId");
        }
        
        public override void Down()
        {
            AddColumn("data.Counters", "CustomerId", c => c.Int(nullable: false));
            CreateIndex("data.Counters", "CustomerId");
            AddForeignKey("data.Counters", "CustomerId", "data.BusinessUsers", "Id");
        }
    }
}
