namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0010 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.OrderStatus", "SystemCode", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("data.OrderStatus", "SystemCode");
        }
    }
}
