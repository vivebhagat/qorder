namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0017 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.Payments", "OrderId", c => c.Int());
            CreateIndex("data.Payments", "OrderId");
            AddForeignKey("data.Payments", "OrderId", "data.Orders", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("data.Payments", "OrderId", "data.Orders");
            DropIndex("data.Payments", new[] { "OrderId" });
            DropColumn("data.Payments", "OrderId");
        }
    }
}
