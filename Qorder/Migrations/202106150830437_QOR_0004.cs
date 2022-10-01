namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QOR_0004 : DbMigration
    {
        public override void Up()
        {
            AddColumn("data.Counters", "Url", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("data.Counters", "Url");
        }
    }
}
