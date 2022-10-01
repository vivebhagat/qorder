namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatedatabase : DbMigration
    {
        public override void Up()
        {
            DropColumn("data.ServiceLocations", "IsCurrentlyReserved");
        }
        
        public override void Down()
        {
            AddColumn("data.ServiceLocations", "IsCurrentlyReserved", c => c.Boolean(nullable: false));
        }
    }
}
