namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR_0003 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("data.Payments", "PaymentMethod_Id", "data.PaymentMethods");
            DropIndex("data.Bookings", new[] { "CUstomerId" });
            DropIndex("data.Payments", new[] { "PaymentMethod_Id" });
            RenameColumn(table: "data.Payments", name: "PaymentMethod_Id", newName: "PaymentMethodId");
            RenameColumn(table: "data.Counters", name: "OrganisationId", newName: "OrganizationId");
            RenameColumn(table: "data.Products", name: "OrganisationId", newName: "OrganizationId");
            RenameIndex(table: "data.Counters", name: "IX_OrganisationId", newName: "IX_OrganizationId");
            RenameIndex(table: "data.Products", name: "IX_OrganisationId", newName: "IX_OrganizationId");
            AlterColumn("data.Payments", "PaymentMethodId", c => c.Int(nullable: false));
            CreateIndex("data.Bookings", "CustomerId");
            CreateIndex("data.Payments", "PaymentMethodId");
            AddForeignKey("data.Payments", "PaymentMethodId", "data.PaymentMethods", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("data.Payments", "PaymentMethodId", "data.PaymentMethods");
            DropIndex("data.Payments", new[] { "PaymentMethodId" });
            DropIndex("data.Bookings", new[] { "CustomerId" });
            AlterColumn("data.Payments", "PaymentMethodId", c => c.Int());
            RenameIndex(table: "data.Products", name: "IX_OrganizationId", newName: "IX_OrganisationId");
            RenameIndex(table: "data.Counters", name: "IX_OrganizationId", newName: "IX_OrganisationId");
            RenameColumn(table: "data.Products", name: "OrganizationId", newName: "OrganisationId");
            RenameColumn(table: "data.Counters", name: "OrganizationId", newName: "OrganisationId");
            RenameColumn(table: "data.Payments", name: "PaymentMethodId", newName: "PaymentMethod_Id");
            CreateIndex("data.Payments", "PaymentMethod_Id");
            CreateIndex("data.Bookings", "CUstomerId");
            AddForeignKey("data.Payments", "PaymentMethod_Id", "data.PaymentMethods", "Id");
        }
    }
}
