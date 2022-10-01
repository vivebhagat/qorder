namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0021 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.Widgets", "ExpiryMins", c => c.Int(nullable: false));
            AddColumn("data.Widgets", "LastQueryTime", c => c.DateTime());
            AddColumn("data.Widgets", "SavedQueryOutput", c => c.String());
            AddColumn("data.Widgets", "AllowRefresh", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("data.Widgets", "AllowRefresh");
            DropColumn("data.Widgets", "SavedQueryOutput");
            DropColumn("data.Widgets", "LastQueryTime");
            DropColumn("data.Widgets", "ExpiryMins");
        }
    }
}
