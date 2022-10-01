namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR_0002 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "data.Categories", name: "OrganisationId", newName: "OrganizationId");
            RenameIndex(table: "data.Categories", name: "IX_OrganisationId", newName: "IX_OrganizationId");
            AddColumn("data.ServiceLocations", "IsCurrentlyReserved", c => c.Boolean(nullable: false));
            DropColumn("data.ServiceLocations", "IsCurrentlyReservrd");
        }
        
        public override void Down()
        {
            AddColumn("data.ServiceLocations", "IsCurrentlyReservrd", c => c.Boolean(nullable: false));
            DropColumn("data.ServiceLocations", "IsCurrentlyReserved");
            RenameIndex(table: "data.Categories", name: "IX_OrganizationId", newName: "IX_OrganisationId");
            RenameColumn(table: "data.Categories", name: "OrganizationId", newName: "OrganisationId");
        }
    }
}
