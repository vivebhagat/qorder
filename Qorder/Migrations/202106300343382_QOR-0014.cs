namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0014 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.ServiceLocations", "Url", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("data.ServiceLocations", "Url");
        }
    }
}
