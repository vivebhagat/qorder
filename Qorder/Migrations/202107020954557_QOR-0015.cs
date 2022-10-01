namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0015 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "data.Alerts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IntUserId = c.Int(nullable: false),
                        Sender = c.String(),
                        Name = c.String(),
                        Type = c.String(),
                        Body = c.String(),
                        Group = c.String(),
                        IsRead = c.Boolean(nullable: false),
                        SentDate = c.DateTime(nullable: false),
                        ExpiryDate = c.DateTime(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.IntUserId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.IntUserId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
        }
        
        public override void Down()
        {
            DropForeignKey("data.Alerts", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Alerts", "IntUserId", "data.IntUsers");
            DropForeignKey("data.Alerts", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Alerts", "ArchieveById", "data.IntUsers");
            DropIndex("data.Alerts", new[] { "ArchieveById" });
            DropIndex("data.Alerts", new[] { "ModifiedById" });
            DropIndex("data.Alerts", new[] { "CreatedById" });
            DropIndex("data.Alerts", new[] { "IntUserId" });
            DropTable("data.Alerts");
        }
    }
}
