namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR0012 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("data.CustomPageLinks", "CustomPageId", "data.CustomPages");
            DropIndex("data.CustomPageLinks", new[] { "CustomPageId" });
            AddColumn("data.CustomPageLinks", "PageLinkId", c => c.Int(nullable: false));
            AddColumn("data.CustomPageLinks", "Content", c => c.String());
            CreateIndex("data.CustomPageLinks", "PageLinkId");
            AddForeignKey("data.CustomPageLinks", "PageLinkId", "data.PageLinks", "Id", cascadeDelete: true);
            DropColumn("data.CustomPageLinks", "CustomPageId");
        }
        
        public override void Down()
        {
            AddColumn("data.CustomPageLinks", "CustomPageId", c => c.Int(nullable: false));
            DropForeignKey("data.CustomPageLinks", "PageLinkId", "data.PageLinks");
            DropIndex("data.CustomPageLinks", new[] { "PageLinkId" });
            DropColumn("data.CustomPageLinks", "Content");
            DropColumn("data.CustomPageLinks", "PageLinkId");
            CreateIndex("data.CustomPageLinks", "CustomPageId");
            AddForeignKey("data.CustomPageLinks", "CustomPageId", "data.CustomPages", "Id", cascadeDelete: true);
        }
    }
}
