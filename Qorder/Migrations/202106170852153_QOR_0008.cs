namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR_0008 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.Products", "Sku", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("data.Products", "Sku");
        }
    }
}
