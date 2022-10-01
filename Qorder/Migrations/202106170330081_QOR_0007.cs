namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR_0007 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.Categories", "Url", c => c.String());
            AddColumn("data.Products", "Url", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("data.Products", "Url");
            DropColumn("data.Categories", "Url");
        }
    }
}
