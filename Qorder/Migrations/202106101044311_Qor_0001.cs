namespace Qorder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Qor_0001 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "data.ApplicationEntities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        DisplayName = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        IsStandard = c.Boolean(nullable: false),
                        IsOwnershipEntity = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        Prefix = c.String(),
                        Postfix = c.String(),
                        NumberFormat = c.String(),
                        IsGlobalSearchble = c.Boolean(nullable: false),
                        use_server_ui = c.Boolean(nullable: false),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                        DefaultRepository = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.IntUsers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Name = c.String(),
                        UserId = c.String(),
                        Email = c.String(),
                        DOB = c.DateTime(nullable: false),
                        Address1 = c.String(),
                        Address2 = c.String(),
                        Country = c.String(),
                        PostCode = c.String(),
                        OrgId = c.Int(),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Organizations", t => t.OrgId)
                .Index(t => t.OrgId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Organizations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Address1 = c.String(),
                        Address2 = c.String(),
                        City = c.String(),
                        State = c.String(),
                        CountryId = c.Int(),
                        Postcode = c.Int(nullable: false),
                        Phone = c.Int(nullable: false),
                        Website = c.String(),
                        CurrencyId = c.Int(nullable: false),
                        Description = c.String(),
                        LogoImageUrl = c.String(),
                        ParentOrganizationId = c.Int(),
                        IsParent = c.Boolean(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.Countries", t => t.CountryId)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.Currencies", t => t.CurrencyId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Organizations", t => t.ParentOrganizationId)
                .Index(t => t.CountryId)
                .Index(t => t.CurrencyId)
                .Index(t => t.ParentOrganizationId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Countries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        IsPrimary = c.Boolean(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Currencies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        IsPrimary = c.Boolean(nullable: false),
                        Value = c.Double(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);

            Sql("insert into data.Currencies " +
              "(Name, Code, IsPrimary, Value, Inactive, ApplicationNumber, LegacyNumber, CreatedById, CreatedDate, ModifiedById, ModifiedDate, ArchieveById, ArchieveDate)" +
              "values ('INR',	'INR',	1,	1,	0,	NULL,	NULL,	NULL,	'01-04-2021 00:00:00',	NULL,	NULL,	NULL,	NULL)");

            CreateTable(
                "data.ApplicationEntityAccessExpressions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ApplicationEntityId = c.Int(nullable: false),
                        PropertyApplicationEntityId = c.Int(),
                        PropertyAccessExpresion = c.String(),
                        ContextAccessExpresion = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.ApplicationEntities", t => t.PropertyApplicationEntityId)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.PropertyApplicationEntityId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ApplicationEntityProperties",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicationEntityId = c.Int(nullable: false),
                        Name = c.String(),
                        IsStandard = c.Boolean(nullable: false),
                        IsNullable = c.Boolean(nullable: false),
                        type = c.String(),
                        IncludeInName = c.Boolean(nullable: false),
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
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ApplicationFileGroups",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ApplicationFiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ResourceUri = c.String(),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ApplicationFileTypeId = c.Int(nullable: false),
                        ServerDirectoryId = c.Int(),
                        OwnerId = c.Int(nullable: false),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.ApplicationFileTypes", t => t.ApplicationFileTypeId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.IntUsers", t => t.OwnerId, cascadeDelete: true)
                .ForeignKey("data.ServerDirectories", t => t.ServerDirectoryId)
                .Index(t => t.ApplicationFileTypeId)
                .Index(t => t.ServerDirectoryId)
                .Index(t => t.OwnerId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ApplicationFileTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ServerDirectories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ParentDirectoryId = c.Int(),
                        FullPath = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.ServerDirectories", t => t.ParentDirectoryId)
                .Index(t => t.ParentDirectoryId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Bookings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartTime = c.DateTime(nullable: false),
                        EndTime = c.DateTime(nullable: false),
                        ServiceLocationId = c.Int(nullable: false),
                        CUstomerId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.BusinessUsers", t => t.CUstomerId)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.ServiceLocations", t => t.ServiceLocationId, cascadeDelete: true)
                .Index(t => t.ServiceLocationId)
                .Index(t => t.CUstomerId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ServiceLocations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        IsCurrentlyReservrd = c.Boolean(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        OrganisationId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Organizations", t => t.OrganisationId, cascadeDelete: true)
                .Index(t => t.OrganisationId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ChildEntityRelations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ParenEntityId = c.Int(nullable: false),
                        ChildEntityId = c.Int(nullable: false),
                        ChildEntityPropertyId = c.Int(nullable: false),
                        ReplacementTag = c.String(),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.ApplicationEntities", t => t.ChildEntityId, cascadeDelete: true)
                .ForeignKey("data.ApplicationEntityProperties", t => t.ChildEntityPropertyId, cascadeDelete: false)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.ApplicationEntities", t => t.ParenEntityId, cascadeDelete: false)
                .Index(t => t.ParenEntityId)
                .Index(t => t.ChildEntityId)
                .Index(t => t.ChildEntityPropertyId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Communications",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicationEntityId = c.Int(nullable: false),
                        CommunicationTemplateId = c.Int(nullable: false),
                        eId = c.Int(nullable: false),
                        SentDate = c.DateTime(nullable: false),
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
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.CommunicationTemplates", t => t.CommunicationTemplateId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.CommunicationTemplateId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.CommunicationTemplates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicationEntityId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
                        Name = c.String(),
                        CommunicationTypeId = c.Int(nullable: false),
                        Subject = c.String(),
                        Text = c.String(),
                        FromId = c.Int(nullable: false),
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
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.CommunicationTypes", t => t.CommunicationTypeId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.FromId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.CommunicationTypeId)
                .Index(t => t.FromId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.CommunicationTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Inactive = c.Boolean(nullable: false),
                        Name = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.CommunicationTemplateRoleRecieverMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CommunicationTemplateId = c.Int(nullable: false),
                        ToId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.CommunicationTemplates", t => t.CommunicationTemplateId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.UserDefinedRoles", t => t.ToId, cascadeDelete: true)
                .Index(t => t.CommunicationTemplateId)
                .Index(t => t.ToId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.UserDefinedRoles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        OrgId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        DashboardId = c.Int(),
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
                .ForeignKey("data.Dashboards", t => t.DashboardId)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Organizations", t => t.OrgId)
                .Index(t => t.OrgId)
                .Index(t => t.DashboardId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Dashboards",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.CommunicationTemplateUserRecieverMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CommunicationTemplateId = c.Int(nullable: false),
                        ToId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.CommunicationTemplates", t => t.CommunicationTemplateId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.IntUsers", t => t.ToId)
                .Index(t => t.CommunicationTemplateId)
                .Index(t => t.ToId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.CounterProducts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CounterId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.Counters", t => t.CounterId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.CounterId)
                .Index(t => t.ProductId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Counters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        OrganisationId = c.Int(),
                        CustomerId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.BusinessUsers", t => t.CustomerId)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Organizations", t => t.OrganisationId)
                .Index(t => t.OrganisationId)
                .Index(t => t.CustomerId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        OrganisationId = c.Int(),
                        Amount = c.Double(nullable: false),
                        Discount = c.Double(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Organizations", t => t.OrganisationId)
                .Index(t => t.OrganisationId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.CustomPageLinks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        url = c.String(),
                        CustomPageId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.CustomPages", t => t.CustomPageId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CustomPageId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.CustomPages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        IsPublic = c.Boolean(nullable: false),
                        Content = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.EntityNotes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicationEntityId = c.Int(),
                        Data = c.String(),
                        NoteTypeId = c.Int(),
                        eId = c.Int(nullable: false),
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
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.NoteTypes", t => t.NoteTypeId)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.NoteTypeId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.NoteTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.EntityScripts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SubmitEventType = c.Int(nullable: false),
                        ScriptId = c.Int(nullable: false),
                        ApplicationEntityId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Scripts", t => t.ScriptId, cascadeDelete: true)
                .Index(t => t.ScriptId)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Scripts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Text = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.FieldEvents",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        FieldId = c.Int(nullable: false),
                        script = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.Fields", t => t.FieldId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.FieldId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Fields",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FieldTypeId = c.Int(nullable: false),
                        optlabel = c.String(),
                        optid = c.String(),
                        filterurl = c.String(),
                        field = c.String(),
                        searchname = c.String(),
                        changeevent = c.String(),
                        OptionListId = c.Int(),
                        ApplicationEntityPropertyId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
                        IsStandard = c.Boolean(nullable: false),
                        IsMultiSelect = c.Boolean(nullable: false),
                        Description = c.String(),
                        Name = c.String(),
                        HtmlContent = c.String(),
                        Label = c.String(),
                        IsMandatory = c.Boolean(nullable: false),
                        IncludeInName = c.Boolean(nullable: false),
                        NameTransform = c.String(),
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
                .ForeignKey("data.ApplicationEntityProperties", t => t.ApplicationEntityPropertyId)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.FieldTypes", t => t.FieldTypeId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.OptionLists", t => t.OptionListId)
                .Index(t => t.FieldTypeId)
                .Index(t => t.OptionListId)
                .Index(t => t.ApplicationEntityPropertyId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.FieldTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.OptionLists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.FilterFields",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CommonFilterId = c.Int(nullable: false),
                        FieldId = c.Int(nullable: false),
                        FilterOperator = c.Int(nullable: false),
                        FilterValue = c.String(),
                        LockValue = c.Boolean(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.Filters", t => t.CommonFilterId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.Fields", t => t.FieldId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CommonFilterId)
                .Index(t => t.FieldId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Filters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsDefault = c.Boolean(nullable: false),
                        ApplicationEntityId = c.Int(),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.FilterLists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        FilterFieldId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
                        FilterId = c.Int(nullable: false),
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
                .ForeignKey("data.Filters", t => t.FilterId, cascadeDelete: true)
                .ForeignKey("data.FilterFields", t => t.FilterFieldId)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.FilterFieldId)
                .Index(t => t.FilterId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.FilterResultFields",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Expression = c.String(),
                        CommonFilterId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ExcludeInQueryExpression = c.Boolean(nullable: false),
                        ViewTransformExpression = c.String(),
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
                .ForeignKey("data.Filters", t => t.CommonFilterId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CommonFilterId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.FormEvents",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        FormId = c.Int(nullable: false),
                        script = c.String(),
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
                .ForeignKey("data.Forms", t => t.FormId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.FormId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Forms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        cols = c.Int(nullable: false),
                        ApplicationEntityId = c.Int(),
                        IsPreferred = c.Boolean(nullable: false),
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
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.FormFieldMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FormId = c.Int(nullable: false),
                        FieldId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        Index = c.Int(nullable: false),
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
                .ForeignKey("data.Fields", t => t.FieldId, cascadeDelete: true)
                .ForeignKey("data.Forms", t => t.FormId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.FormId)
                .Index(t => t.FieldId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.GroupToApplicationFileMappings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicationNumber = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        LegacyNumber = c.String(),
                        ApplicationFileTypeId = c.Int(nullable: false),
                        ApplicationFileGroupId = c.Int(nullable: false),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ExtraDataHolder = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.ApplicationFileGroups", t => t.ApplicationFileGroupId, cascadeDelete: true)
                .ForeignKey("data.ApplicationFileTypes", t => t.ApplicationFileTypeId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.ApplicationFileTypeId)
                .Index(t => t.ApplicationFileGroupId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.KitchenProducts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Amount = c.Double(nullable: false),
                        Discount = c.Double(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.KitchenProductToProcessBooths",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        KitchenProductId = c.Int(nullable: false),
                        ProcessBoothId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.KitchenProducts", t => t.KitchenProductId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.ProcessBooths", t => t.ProcessBoothId, cascadeDelete: true)
                .Index(t => t.KitchenProductId)
                .Index(t => t.ProcessBoothId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ProcessBooths",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        IsKitchen = c.Boolean(nullable: false),
                        IsPacking = c.Boolean(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Labels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Value = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Menus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        image_url = c.String(),
                        description = c.String(),
                        PageLinkId = c.Int(nullable: false),
                        ParentId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.PageLinks", t => t.PageLinkId, cascadeDelete: true)
                .ForeignKey("data.Menus", t => t.ParentId)
                .Index(t => t.PageLinkId)
                .Index(t => t.ParentId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.PageLinks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        url = c.String(),
                        linkName = c.String(),
                        pageName = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Options",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        OptionListId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.OptionLists", t => t.OptionListId, cascadeDelete: true)
                .Index(t => t.OptionListId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.OrderProducts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                        IsMapped = c.Boolean(nullable: false),
                        CurrentAmount = c.Double(nullable: false),
                        Quantity = c.Int(nullable: false),
                        Total = c.Double(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Orders", t => t.OrderId, cascadeDelete: true)
                .ForeignKey("data.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.OrderId)
                .Index(t => t.ProductId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AltName = c.String(),
                        AltContact = c.String(),
                        AltEmail = c.String(),
                        CounterId = c.Int(),
                        OrderedById = c.Int(),
                        Date = c.DateTime(nullable: false),
                        TotalWithoutTax = c.Double(nullable: false),
                        Tax = c.Double(nullable: false),
                        TotalWithTax = c.Double(nullable: false),
                        IsComplete = c.Boolean(nullable: false),
                        IsCancelled = c.Boolean(nullable: false),
                        OrderStatusId = c.Int(nullable: false),
                        BookingId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.Bookings", t => t.BookingId)
                .ForeignKey("data.Counters", t => t.CounterId)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.BusinessUsers", t => t.OrderedById)
                .ForeignKey("data.OrderStatus", t => t.OrderStatusId, cascadeDelete: true)
                .Index(t => t.CounterId)
                .Index(t => t.OrderedById)
                .Index(t => t.OrderStatusId)
                .Index(t => t.BookingId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.OrderStatus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.OwnershipEntityAccesses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicationEntityId = c.Int(),
                        IntUserId = c.Int(nullable: false),
                        eId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.IntUserId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.IntUserId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.PageAccesses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Index = c.Int(nullable: false),
                        LinkId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.PageLinks", t => t.LinkId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.UserDefinedRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.LinkId)
                .Index(t => t.RoleId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.PaymentMethods",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Payments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Amount = c.Double(nullable: false),
                        PaymentOn = c.DateTime(nullable: false),
                        CurrencyId = c.Int(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        PaymentMethod_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.Currencies", t => t.CurrencyId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.PaymentMethods", t => t.PaymentMethod_Id)
                .Index(t => t.CurrencyId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById)
                .Index(t => t.PaymentMethod_Id);
            
            CreateTable(
                "data.ProcessQueueItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProcessBoothId = c.Int(nullable: false),
                        OrderProductId = c.Int(nullable: false),
                        StatusId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.OrderProducts", t => t.OrderProductId, cascadeDelete: true)
                .ForeignKey("data.ProcessBooths", t => t.ProcessBoothId, cascadeDelete: true)
                .ForeignKey("data.ProcessQueueStatus", t => t.StatusId, cascadeDelete: true)
                .Index(t => t.ProcessBoothId)
                .Index(t => t.OrderProductId)
                .Index(t => t.StatusId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ProcessQueueStatus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ProductCategories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        CategoryId = c.Int(nullable: false),
                        IsMapped = c.Boolean(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.Categories", t => t.CategoryId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.CategoryId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ProductToKitchenProductMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        KitchenProductId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.KitchenProducts", t => t.KitchenProductId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.KitchenProductId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.ProductToProcessBoothMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        ProcessBoothId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.ProcessBooths", t => t.ProcessBoothId, cascadeDelete: true)
                .ForeignKey("data.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.ProcessBoothId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.StateActionAccesses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StateActionId = c.Int(nullable: false),
                        UserDefinedRoleId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.StateActions", t => t.StateActionId, cascadeDelete: true)
                .ForeignKey("data.UserDefinedRoles", t => t.UserDefinedRoleId, cascadeDelete: true)
                .Index(t => t.StateActionId)
                .Index(t => t.UserDefinedRoleId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.StateActions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicationEntityId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        Name = c.String(),
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
                .ForeignKey("data.ApplicationEntities", t => t.ApplicationEntityId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.ApplicationEntityId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.StateActionStatements",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StateActionId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationEntityPropertyId = c.Int(nullable: false),
                        currentValue = c.String(),
                        nextValue = c.String(),
                        UserDefinedRoleId = c.Int(),
                        CommunicationTemplateId = c.Int(),
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
                .ForeignKey("data.ApplicationEntityProperties", t => t.ApplicationEntityPropertyId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.CommunicationTemplates", t => t.CommunicationTemplateId)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.StateActions", t => t.StateActionId)
                .ForeignKey("data.UserDefinedRoles", t => t.UserDefinedRoleId)
                .Index(t => t.StateActionId)
                .Index(t => t.ApplicationEntityPropertyId)
                .Index(t => t.UserDefinedRoleId)
                .Index(t => t.CommunicationTemplateId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.SysParameters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Value = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.TaxCodes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Value = c.Double(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.UserDefinedRoleMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoleId = c.Int(nullable: false),
                        ControllerName = c.String(),
                        ActionName = c.String(),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.UserDefinedRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.RoleId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.UserDefinedRoleToUserMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoleId = c.Int(),
                        IntUserId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
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
                .ForeignKey("data.UserDefinedRoles", t => t.RoleId)
                .Index(t => t.RoleId)
                .Index(t => t.IntUserId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.UserTasks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        UserTaskStatus = c.Int(nullable: false),
                        UserTaskResult = c.Int(nullable: false),
                        UserTaskTypeId = c.Int(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                        ScheduledTaskId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.ScheduledTasks", t => t.ScheduledTaskId)
                .ForeignKey("data.UserTaskTypes", t => t.UserTaskTypeId)
                .Index(t => t.UserTaskTypeId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById)
                .Index(t => t.ScheduledTaskId);
            
            CreateTable(
                "data.ScheduledTasks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        UserTaskTypeId = c.Int(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        Rule = c.Int(nullable: false),
                        RepeatConstant = c.Int(nullable: false),
                        Day = c.Int(nullable: false),
                        Month = c.Int(nullable: false),
                        StartingFrom = c.DateTime(),
                        LastExecutedOn = c.DateTime(),
                        EndingOn = c.DateTime(),
                        ExtraDataHolder = c.String(),
                        IsReady = c.Boolean(nullable: false),
                        LastTriggeredOn = c.DateTime(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.UserTaskTypes", t => t.UserTaskTypeId, cascadeDelete: true)
                .Index(t => t.UserTaskTypeId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.UserTaskTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Type = c.String(),
                        Method = c.String(),
                        Inactive = c.Boolean(nullable: false),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        ExtraDataHolder = c.String(),
                        CreatedById = c.Int(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedById = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ArchieveById = c.Int(),
                        ArchieveDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.ArchieveById)
                .ForeignKey("data.IntUsers", t => t.CreatedById)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.WidgetDatas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Inactive = c.Boolean(nullable: false),
                        Name = c.String(),
                        ScriptId = c.Int(),
                        ApplicationNumber = c.String(),
                        LegacyNumber = c.String(),
                        Json_Data = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.Scripts", t => t.ScriptId)
                .Index(t => t.ScriptId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.WidgetParameters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Inactive = c.Boolean(nullable: false),
                        Name = c.String(),
                        WidgetParameterTypeId = c.Int(nullable: false),
                        WidgetDataId = c.Int(nullable: false),
                        Expression = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.WidgetDatas", t => t.WidgetDataId, cascadeDelete: true)
                .ForeignKey("data.WidgetParameterTypes", t => t.WidgetParameterTypeId, cascadeDelete: true)
                .Index(t => t.WidgetParameterTypeId)
                .Index(t => t.WidgetDataId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.WidgetParameterTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Inactive = c.Boolean(nullable: false),
                        Name = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.Widgets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Inactive = c.Boolean(nullable: false),
                        Name = c.String(),
                        WidgetTypeId = c.Int(nullable: false),
                        WidgetTemplateId = c.Int(nullable: false),
                        DashboardId = c.Int(nullable: false),
                        WidgetDataId = c.Int(),
                        Index = c.Int(nullable: false),
                        Row = c.Int(nullable: false),
                        ColSpan = c.Int(nullable: false),
                        RowSpan = c.Int(nullable: false),
                        Style = c.String(),
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
                .ForeignKey("data.Dashboards", t => t.DashboardId, cascadeDelete: true)
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .ForeignKey("data.WidgetDatas", t => t.WidgetDataId)
                .ForeignKey("data.WidgetTemplates", t => t.WidgetTemplateId, cascadeDelete: true)
                .ForeignKey("data.WidgetTypes", t => t.WidgetTypeId, cascadeDelete: true)
                .Index(t => t.WidgetTypeId)
                .Index(t => t.WidgetTemplateId)
                .Index(t => t.DashboardId)
                .Index(t => t.WidgetDataId)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.WidgetTemplates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Inactive = c.Boolean(nullable: false),
                        Name = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.WidgetTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Inactive = c.Boolean(nullable: false),
                        Name = c.String(),
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
                .ForeignKey("data.IntUsers", t => t.ModifiedById)
                .Index(t => t.CreatedById)
                .Index(t => t.ModifiedById)
                .Index(t => t.ArchieveById);
            
            CreateTable(
                "data.BusinessUsers",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        IsCustomer = c.Boolean(nullable: false),
                        IsEmployee = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("data.IntUsers", t => t.Id)
                .Index(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("data.BusinessUsers", "Id", "data.IntUsers");
            DropForeignKey("data.Widgets", "WidgetTypeId", "data.WidgetTypes");
            DropForeignKey("data.WidgetTypes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.WidgetTypes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.WidgetTypes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Widgets", "WidgetTemplateId", "data.WidgetTemplates");
            DropForeignKey("data.WidgetTemplates", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.WidgetTemplates", "CreatedById", "data.IntUsers");
            DropForeignKey("data.WidgetTemplates", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Widgets", "WidgetDataId", "data.WidgetDatas");
            DropForeignKey("data.Widgets", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Widgets", "DashboardId", "data.Dashboards");
            DropForeignKey("data.Widgets", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Widgets", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.WidgetParameters", "WidgetParameterTypeId", "data.WidgetParameterTypes");
            DropForeignKey("data.WidgetParameterTypes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.WidgetParameterTypes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.WidgetParameterTypes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.WidgetParameters", "WidgetDataId", "data.WidgetDatas");
            DropForeignKey("data.WidgetParameters", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.WidgetParameters", "CreatedById", "data.IntUsers");
            DropForeignKey("data.WidgetParameters", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.WidgetDatas", "ScriptId", "data.Scripts");
            DropForeignKey("data.WidgetDatas", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.WidgetDatas", "CreatedById", "data.IntUsers");
            DropForeignKey("data.WidgetDatas", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.UserTasks", "UserTaskTypeId", "data.UserTaskTypes");
            DropForeignKey("data.UserTasks", "ScheduledTaskId", "data.ScheduledTasks");
            DropForeignKey("data.ScheduledTasks", "UserTaskTypeId", "data.UserTaskTypes");
            DropForeignKey("data.UserTaskTypes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.UserTaskTypes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.UserTaskTypes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ScheduledTasks", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ScheduledTasks", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ScheduledTasks", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.UserTasks", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.UserTasks", "CreatedById", "data.IntUsers");
            DropForeignKey("data.UserTasks", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoleToUserMaps", "RoleId", "data.UserDefinedRoles");
            DropForeignKey("data.UserDefinedRoleToUserMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoleToUserMaps", "IntUserId", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoleToUserMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoleToUserMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoleMaps", "RoleId", "data.UserDefinedRoles");
            DropForeignKey("data.UserDefinedRoleMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoleMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoleMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.TaxCodes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.TaxCodes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.TaxCodes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.SysParameters", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.SysParameters", "CreatedById", "data.IntUsers");
            DropForeignKey("data.SysParameters", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.StateActionStatements", "UserDefinedRoleId", "data.UserDefinedRoles");
            DropForeignKey("data.StateActionStatements", "StateActionId", "data.StateActions");
            DropForeignKey("data.StateActionStatements", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.StateActionStatements", "CreatedById", "data.IntUsers");
            DropForeignKey("data.StateActionStatements", "CommunicationTemplateId", "data.CommunicationTemplates");
            DropForeignKey("data.StateActionStatements", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.StateActionStatements", "ApplicationEntityPropertyId", "data.ApplicationEntityProperties");
            DropForeignKey("data.StateActionAccesses", "UserDefinedRoleId", "data.UserDefinedRoles");
            DropForeignKey("data.StateActionAccesses", "StateActionId", "data.StateActions");
            DropForeignKey("data.StateActions", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.StateActions", "CreatedById", "data.IntUsers");
            DropForeignKey("data.StateActions", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.StateActions", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.StateActionAccesses", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.StateActionAccesses", "CreatedById", "data.IntUsers");
            DropForeignKey("data.StateActionAccesses", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ProductToProcessBoothMaps", "ProductId", "data.Products");
            DropForeignKey("data.ProductToProcessBoothMaps", "ProcessBoothId", "data.ProcessBooths");
            DropForeignKey("data.ProductToProcessBoothMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ProductToProcessBoothMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ProductToProcessBoothMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ProductToKitchenProductMaps", "ProductId", "data.Products");
            DropForeignKey("data.ProductToKitchenProductMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ProductToKitchenProductMaps", "KitchenProductId", "data.KitchenProducts");
            DropForeignKey("data.ProductToKitchenProductMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ProductToKitchenProductMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ProductCategories", "ProductId", "data.Products");
            DropForeignKey("data.ProductCategories", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ProductCategories", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ProductCategories", "CategoryId", "data.Categories");
            DropForeignKey("data.ProductCategories", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ProcessQueueItems", "StatusId", "data.ProcessQueueStatus");
            DropForeignKey("data.ProcessQueueStatus", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ProcessQueueStatus", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ProcessQueueStatus", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ProcessQueueItems", "ProcessBoothId", "data.ProcessBooths");
            DropForeignKey("data.ProcessQueueItems", "OrderProductId", "data.OrderProducts");
            DropForeignKey("data.ProcessQueueItems", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ProcessQueueItems", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ProcessQueueItems", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Payments", "PaymentMethod_Id", "data.PaymentMethods");
            DropForeignKey("data.Payments", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Payments", "CurrencyId", "data.Currencies");
            DropForeignKey("data.Payments", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Payments", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.PaymentMethods", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.PaymentMethods", "CreatedById", "data.IntUsers");
            DropForeignKey("data.PaymentMethods", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.PageAccesses", "RoleId", "data.UserDefinedRoles");
            DropForeignKey("data.PageAccesses", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.PageAccesses", "LinkId", "data.PageLinks");
            DropForeignKey("data.PageAccesses", "CreatedById", "data.IntUsers");
            DropForeignKey("data.PageAccesses", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.OwnershipEntityAccesses", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.OwnershipEntityAccesses", "IntUserId", "data.IntUsers");
            DropForeignKey("data.OwnershipEntityAccesses", "CreatedById", "data.IntUsers");
            DropForeignKey("data.OwnershipEntityAccesses", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.OwnershipEntityAccesses", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.OrderProducts", "ProductId", "data.Products");
            DropForeignKey("data.OrderProducts", "OrderId", "data.Orders");
            DropForeignKey("data.Orders", "OrderStatusId", "data.OrderStatus");
            DropForeignKey("data.OrderStatus", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.OrderStatus", "CreatedById", "data.IntUsers");
            DropForeignKey("data.OrderStatus", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Orders", "OrderedById", "data.BusinessUsers");
            DropForeignKey("data.Orders", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Orders", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Orders", "CounterId", "data.Counters");
            DropForeignKey("data.Orders", "BookingId", "data.Bookings");
            DropForeignKey("data.Orders", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.OrderProducts", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.OrderProducts", "CreatedById", "data.IntUsers");
            DropForeignKey("data.OrderProducts", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Options", "OptionListId", "data.OptionLists");
            DropForeignKey("data.Options", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Options", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Options", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Menus", "ParentId", "data.Menus");
            DropForeignKey("data.Menus", "PageLinkId", "data.PageLinks");
            DropForeignKey("data.PageLinks", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.PageLinks", "CreatedById", "data.IntUsers");
            DropForeignKey("data.PageLinks", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Menus", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Menus", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Menus", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Labels", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Labels", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Labels", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.KitchenProductToProcessBooths", "ProcessBoothId", "data.ProcessBooths");
            DropForeignKey("data.ProcessBooths", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ProcessBooths", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ProcessBooths", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.KitchenProductToProcessBooths", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.KitchenProductToProcessBooths", "KitchenProductId", "data.KitchenProducts");
            DropForeignKey("data.KitchenProductToProcessBooths", "CreatedById", "data.IntUsers");
            DropForeignKey("data.KitchenProductToProcessBooths", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.KitchenProducts", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.KitchenProducts", "CreatedById", "data.IntUsers");
            DropForeignKey("data.KitchenProducts", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.GroupToApplicationFileMappings", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.GroupToApplicationFileMappings", "CreatedById", "data.IntUsers");
            DropForeignKey("data.GroupToApplicationFileMappings", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.GroupToApplicationFileMappings", "ApplicationFileTypeId", "data.ApplicationFileTypes");
            DropForeignKey("data.GroupToApplicationFileMappings", "ApplicationFileGroupId", "data.ApplicationFileGroups");
            DropForeignKey("data.FormFieldMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.FormFieldMaps", "FormId", "data.Forms");
            DropForeignKey("data.FormFieldMaps", "FieldId", "data.Fields");
            DropForeignKey("data.FormFieldMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.FormFieldMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.FormEvents", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.FormEvents", "FormId", "data.Forms");
            DropForeignKey("data.Forms", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Forms", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Forms", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Forms", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.FormEvents", "CreatedById", "data.IntUsers");
            DropForeignKey("data.FormEvents", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.FilterResultFields", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.FilterResultFields", "CreatedById", "data.IntUsers");
            DropForeignKey("data.FilterResultFields", "CommonFilterId", "data.Filters");
            DropForeignKey("data.FilterResultFields", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.FilterLists", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.FilterLists", "FilterFieldId", "data.FilterFields");
            DropForeignKey("data.FilterLists", "FilterId", "data.Filters");
            DropForeignKey("data.FilterLists", "CreatedById", "data.IntUsers");
            DropForeignKey("data.FilterLists", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.FilterFields", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.FilterFields", "FieldId", "data.Fields");
            DropForeignKey("data.FilterFields", "CreatedById", "data.IntUsers");
            DropForeignKey("data.FilterFields", "CommonFilterId", "data.Filters");
            DropForeignKey("data.Filters", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Filters", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Filters", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Filters", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.FilterFields", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.FieldEvents", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.FieldEvents", "FieldId", "data.Fields");
            DropForeignKey("data.Fields", "OptionListId", "data.OptionLists");
            DropForeignKey("data.OptionLists", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.OptionLists", "CreatedById", "data.IntUsers");
            DropForeignKey("data.OptionLists", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Fields", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Fields", "FieldTypeId", "data.FieldTypes");
            DropForeignKey("data.FieldTypes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.FieldTypes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.FieldTypes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Fields", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Fields", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Fields", "ApplicationEntityPropertyId", "data.ApplicationEntityProperties");
            DropForeignKey("data.FieldEvents", "CreatedById", "data.IntUsers");
            DropForeignKey("data.FieldEvents", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.EntityScripts", "ScriptId", "data.Scripts");
            DropForeignKey("data.Scripts", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Scripts", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Scripts", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.EntityScripts", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.EntityScripts", "CreatedById", "data.IntUsers");
            DropForeignKey("data.EntityScripts", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.EntityScripts", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.EntityNotes", "NoteTypeId", "data.NoteTypes");
            DropForeignKey("data.NoteTypes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.NoteTypes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.NoteTypes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.EntityNotes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.EntityNotes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.EntityNotes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.EntityNotes", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.CustomPageLinks", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.CustomPageLinks", "CustomPageId", "data.CustomPages");
            DropForeignKey("data.CustomPages", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.CustomPages", "CreatedById", "data.IntUsers");
            DropForeignKey("data.CustomPages", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.CustomPageLinks", "CreatedById", "data.IntUsers");
            DropForeignKey("data.CustomPageLinks", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.CounterProducts", "ProductId", "data.Products");
            DropForeignKey("data.Products", "OrganisationId", "data.Organizations");
            DropForeignKey("data.Products", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Products", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Products", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.CounterProducts", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.CounterProducts", "CreatedById", "data.IntUsers");
            DropForeignKey("data.CounterProducts", "CounterId", "data.Counters");
            DropForeignKey("data.Counters", "OrganisationId", "data.Organizations");
            DropForeignKey("data.Counters", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Counters", "CustomerId", "data.BusinessUsers");
            DropForeignKey("data.Counters", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Counters", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.CounterProducts", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplateUserRecieverMaps", "ToId", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplateUserRecieverMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplateUserRecieverMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplateUserRecieverMaps", "CommunicationTemplateId", "data.CommunicationTemplates");
            DropForeignKey("data.CommunicationTemplateUserRecieverMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplateRoleRecieverMaps", "ToId", "data.UserDefinedRoles");
            DropForeignKey("data.UserDefinedRoles", "OrgId", "data.Organizations");
            DropForeignKey("data.UserDefinedRoles", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoles", "DashboardId", "data.Dashboards");
            DropForeignKey("data.Dashboards", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Dashboards", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Dashboards", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoles", "CreatedById", "data.IntUsers");
            DropForeignKey("data.UserDefinedRoles", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplateRoleRecieverMaps", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplateRoleRecieverMaps", "CreatedById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplateRoleRecieverMaps", "CommunicationTemplateId", "data.CommunicationTemplates");
            DropForeignKey("data.CommunicationTemplateRoleRecieverMaps", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Communications", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Communications", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Communications", "CommunicationTemplateId", "data.CommunicationTemplates");
            DropForeignKey("data.CommunicationTemplates", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplates", "FromId", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplates", "CreatedById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplates", "CommunicationTypeId", "data.CommunicationTypes");
            DropForeignKey("data.CommunicationTypes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.CommunicationTypes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.CommunicationTypes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplates", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.CommunicationTemplates", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.Communications", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Communications", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.ChildEntityRelations", "ParenEntityId", "data.ApplicationEntities");
            DropForeignKey("data.ChildEntityRelations", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ChildEntityRelations", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ChildEntityRelations", "ChildEntityPropertyId", "data.ApplicationEntityProperties");
            DropForeignKey("data.ChildEntityRelations", "ChildEntityId", "data.ApplicationEntities");
            DropForeignKey("data.ChildEntityRelations", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Categories", "OrganisationId", "data.Organizations");
            DropForeignKey("data.Categories", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Categories", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Categories", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Bookings", "ServiceLocationId", "data.ServiceLocations");
            DropForeignKey("data.ServiceLocations", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ServiceLocations", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ServiceLocations", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Bookings", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Bookings", "CUstomerId", "data.BusinessUsers");
            DropForeignKey("data.Bookings", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Bookings", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ApplicationFiles", "ServerDirectoryId", "data.ServerDirectories");
            DropForeignKey("data.ServerDirectories", "ParentDirectoryId", "data.ServerDirectories");
            DropForeignKey("data.ServerDirectories", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ServerDirectories", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ServerDirectories", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ApplicationFiles", "OwnerId", "data.IntUsers");
            DropForeignKey("data.ApplicationFiles", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ApplicationFiles", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ApplicationFiles", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ApplicationFiles", "ApplicationFileTypeId", "data.ApplicationFileTypes");
            DropForeignKey("data.ApplicationFileTypes", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ApplicationFileTypes", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ApplicationFileTypes", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ApplicationFileGroups", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ApplicationFileGroups", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ApplicationFileGroups", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ApplicationEntityProperties", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ApplicationEntityProperties", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ApplicationEntityProperties", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ApplicationEntityProperties", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.ApplicationEntityAccessExpressions", "PropertyApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.ApplicationEntityAccessExpressions", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ApplicationEntityAccessExpressions", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ApplicationEntityAccessExpressions", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.ApplicationEntityAccessExpressions", "ApplicationEntityId", "data.ApplicationEntities");
            DropForeignKey("data.ApplicationEntities", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.ApplicationEntities", "CreatedById", "data.IntUsers");
            DropForeignKey("data.ApplicationEntities", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.IntUsers", "OrgId", "data.Organizations");
            DropForeignKey("data.Organizations", "ParentOrganizationId", "data.Organizations");
            DropForeignKey("data.Organizations", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Organizations", "CurrencyId", "data.Currencies");
            DropForeignKey("data.Currencies", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Currencies", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Currencies", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Organizations", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Organizations", "CountryId", "data.Countries");
            DropForeignKey("data.Countries", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.Countries", "CreatedById", "data.IntUsers");
            DropForeignKey("data.Countries", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.Organizations", "ArchieveById", "data.IntUsers");
            DropForeignKey("data.IntUsers", "ModifiedById", "data.IntUsers");
            DropForeignKey("data.IntUsers", "CreatedById", "data.IntUsers");
            DropForeignKey("data.IntUsers", "ArchieveById", "data.IntUsers");
            DropIndex("data.BusinessUsers", new[] { "Id" });
            DropIndex("data.WidgetTypes", new[] { "ArchieveById" });
            DropIndex("data.WidgetTypes", new[] { "ModifiedById" });
            DropIndex("data.WidgetTypes", new[] { "CreatedById" });
            DropIndex("data.WidgetTemplates", new[] { "ArchieveById" });
            DropIndex("data.WidgetTemplates", new[] { "ModifiedById" });
            DropIndex("data.WidgetTemplates", new[] { "CreatedById" });
            DropIndex("data.Widgets", new[] { "ArchieveById" });
            DropIndex("data.Widgets", new[] { "ModifiedById" });
            DropIndex("data.Widgets", new[] { "CreatedById" });
            DropIndex("data.Widgets", new[] { "WidgetDataId" });
            DropIndex("data.Widgets", new[] { "DashboardId" });
            DropIndex("data.Widgets", new[] { "WidgetTemplateId" });
            DropIndex("data.Widgets", new[] { "WidgetTypeId" });
            DropIndex("data.WidgetParameterTypes", new[] { "ArchieveById" });
            DropIndex("data.WidgetParameterTypes", new[] { "ModifiedById" });
            DropIndex("data.WidgetParameterTypes", new[] { "CreatedById" });
            DropIndex("data.WidgetParameters", new[] { "ArchieveById" });
            DropIndex("data.WidgetParameters", new[] { "ModifiedById" });
            DropIndex("data.WidgetParameters", new[] { "CreatedById" });
            DropIndex("data.WidgetParameters", new[] { "WidgetDataId" });
            DropIndex("data.WidgetParameters", new[] { "WidgetParameterTypeId" });
            DropIndex("data.WidgetDatas", new[] { "ArchieveById" });
            DropIndex("data.WidgetDatas", new[] { "ModifiedById" });
            DropIndex("data.WidgetDatas", new[] { "CreatedById" });
            DropIndex("data.WidgetDatas", new[] { "ScriptId" });
            DropIndex("data.UserTaskTypes", new[] { "ArchieveById" });
            DropIndex("data.UserTaskTypes", new[] { "ModifiedById" });
            DropIndex("data.UserTaskTypes", new[] { "CreatedById" });
            DropIndex("data.ScheduledTasks", new[] { "ArchieveById" });
            DropIndex("data.ScheduledTasks", new[] { "ModifiedById" });
            DropIndex("data.ScheduledTasks", new[] { "CreatedById" });
            DropIndex("data.ScheduledTasks", new[] { "UserTaskTypeId" });
            DropIndex("data.UserTasks", new[] { "ScheduledTaskId" });
            DropIndex("data.UserTasks", new[] { "ArchieveById" });
            DropIndex("data.UserTasks", new[] { "ModifiedById" });
            DropIndex("data.UserTasks", new[] { "CreatedById" });
            DropIndex("data.UserTasks", new[] { "UserTaskTypeId" });
            DropIndex("data.UserDefinedRoleToUserMaps", new[] { "ArchieveById" });
            DropIndex("data.UserDefinedRoleToUserMaps", new[] { "ModifiedById" });
            DropIndex("data.UserDefinedRoleToUserMaps", new[] { "CreatedById" });
            DropIndex("data.UserDefinedRoleToUserMaps", new[] { "IntUserId" });
            DropIndex("data.UserDefinedRoleToUserMaps", new[] { "RoleId" });
            DropIndex("data.UserDefinedRoleMaps", new[] { "ArchieveById" });
            DropIndex("data.UserDefinedRoleMaps", new[] { "ModifiedById" });
            DropIndex("data.UserDefinedRoleMaps", new[] { "CreatedById" });
            DropIndex("data.UserDefinedRoleMaps", new[] { "RoleId" });
            DropIndex("data.TaxCodes", new[] { "ArchieveById" });
            DropIndex("data.TaxCodes", new[] { "ModifiedById" });
            DropIndex("data.TaxCodes", new[] { "CreatedById" });
            DropIndex("data.SysParameters", new[] { "ArchieveById" });
            DropIndex("data.SysParameters", new[] { "ModifiedById" });
            DropIndex("data.SysParameters", new[] { "CreatedById" });
            DropIndex("data.StateActionStatements", new[] { "ArchieveById" });
            DropIndex("data.StateActionStatements", new[] { "ModifiedById" });
            DropIndex("data.StateActionStatements", new[] { "CreatedById" });
            DropIndex("data.StateActionStatements", new[] { "CommunicationTemplateId" });
            DropIndex("data.StateActionStatements", new[] { "UserDefinedRoleId" });
            DropIndex("data.StateActionStatements", new[] { "ApplicationEntityPropertyId" });
            DropIndex("data.StateActionStatements", new[] { "StateActionId" });
            DropIndex("data.StateActions", new[] { "ArchieveById" });
            DropIndex("data.StateActions", new[] { "ModifiedById" });
            DropIndex("data.StateActions", new[] { "CreatedById" });
            DropIndex("data.StateActions", new[] { "ApplicationEntityId" });
            DropIndex("data.StateActionAccesses", new[] { "ArchieveById" });
            DropIndex("data.StateActionAccesses", new[] { "ModifiedById" });
            DropIndex("data.StateActionAccesses", new[] { "CreatedById" });
            DropIndex("data.StateActionAccesses", new[] { "UserDefinedRoleId" });
            DropIndex("data.StateActionAccesses", new[] { "StateActionId" });
            DropIndex("data.ProductToProcessBoothMaps", new[] { "ArchieveById" });
            DropIndex("data.ProductToProcessBoothMaps", new[] { "ModifiedById" });
            DropIndex("data.ProductToProcessBoothMaps", new[] { "CreatedById" });
            DropIndex("data.ProductToProcessBoothMaps", new[] { "ProcessBoothId" });
            DropIndex("data.ProductToProcessBoothMaps", new[] { "ProductId" });
            DropIndex("data.ProductToKitchenProductMaps", new[] { "ArchieveById" });
            DropIndex("data.ProductToKitchenProductMaps", new[] { "ModifiedById" });
            DropIndex("data.ProductToKitchenProductMaps", new[] { "CreatedById" });
            DropIndex("data.ProductToKitchenProductMaps", new[] { "KitchenProductId" });
            DropIndex("data.ProductToKitchenProductMaps", new[] { "ProductId" });
            DropIndex("data.ProductCategories", new[] { "ArchieveById" });
            DropIndex("data.ProductCategories", new[] { "ModifiedById" });
            DropIndex("data.ProductCategories", new[] { "CreatedById" });
            DropIndex("data.ProductCategories", new[] { "CategoryId" });
            DropIndex("data.ProductCategories", new[] { "ProductId" });
            DropIndex("data.ProcessQueueStatus", new[] { "ArchieveById" });
            DropIndex("data.ProcessQueueStatus", new[] { "ModifiedById" });
            DropIndex("data.ProcessQueueStatus", new[] { "CreatedById" });
            DropIndex("data.ProcessQueueItems", new[] { "ArchieveById" });
            DropIndex("data.ProcessQueueItems", new[] { "ModifiedById" });
            DropIndex("data.ProcessQueueItems", new[] { "CreatedById" });
            DropIndex("data.ProcessQueueItems", new[] { "StatusId" });
            DropIndex("data.ProcessQueueItems", new[] { "OrderProductId" });
            DropIndex("data.ProcessQueueItems", new[] { "ProcessBoothId" });
            DropIndex("data.Payments", new[] { "PaymentMethod_Id" });
            DropIndex("data.Payments", new[] { "ArchieveById" });
            DropIndex("data.Payments", new[] { "ModifiedById" });
            DropIndex("data.Payments", new[] { "CreatedById" });
            DropIndex("data.Payments", new[] { "CurrencyId" });
            DropIndex("data.PaymentMethods", new[] { "ArchieveById" });
            DropIndex("data.PaymentMethods", new[] { "ModifiedById" });
            DropIndex("data.PaymentMethods", new[] { "CreatedById" });
            DropIndex("data.PageAccesses", new[] { "ArchieveById" });
            DropIndex("data.PageAccesses", new[] { "ModifiedById" });
            DropIndex("data.PageAccesses", new[] { "CreatedById" });
            DropIndex("data.PageAccesses", new[] { "RoleId" });
            DropIndex("data.PageAccesses", new[] { "LinkId" });
            DropIndex("data.OwnershipEntityAccesses", new[] { "ArchieveById" });
            DropIndex("data.OwnershipEntityAccesses", new[] { "ModifiedById" });
            DropIndex("data.OwnershipEntityAccesses", new[] { "CreatedById" });
            DropIndex("data.OwnershipEntityAccesses", new[] { "IntUserId" });
            DropIndex("data.OwnershipEntityAccesses", new[] { "ApplicationEntityId" });
            DropIndex("data.OrderStatus", new[] { "ArchieveById" });
            DropIndex("data.OrderStatus", new[] { "ModifiedById" });
            DropIndex("data.OrderStatus", new[] { "CreatedById" });
            DropIndex("data.Orders", new[] { "ArchieveById" });
            DropIndex("data.Orders", new[] { "ModifiedById" });
            DropIndex("data.Orders", new[] { "CreatedById" });
            DropIndex("data.Orders", new[] { "BookingId" });
            DropIndex("data.Orders", new[] { "OrderStatusId" });
            DropIndex("data.Orders", new[] { "OrderedById" });
            DropIndex("data.Orders", new[] { "CounterId" });
            DropIndex("data.OrderProducts", new[] { "ArchieveById" });
            DropIndex("data.OrderProducts", new[] { "ModifiedById" });
            DropIndex("data.OrderProducts", new[] { "CreatedById" });
            DropIndex("data.OrderProducts", new[] { "ProductId" });
            DropIndex("data.OrderProducts", new[] { "OrderId" });
            DropIndex("data.Options", new[] { "ArchieveById" });
            DropIndex("data.Options", new[] { "ModifiedById" });
            DropIndex("data.Options", new[] { "CreatedById" });
            DropIndex("data.Options", new[] { "OptionListId" });
            DropIndex("data.PageLinks", new[] { "ArchieveById" });
            DropIndex("data.PageLinks", new[] { "ModifiedById" });
            DropIndex("data.PageLinks", new[] { "CreatedById" });
            DropIndex("data.Menus", new[] { "ArchieveById" });
            DropIndex("data.Menus", new[] { "ModifiedById" });
            DropIndex("data.Menus", new[] { "CreatedById" });
            DropIndex("data.Menus", new[] { "ParentId" });
            DropIndex("data.Menus", new[] { "PageLinkId" });
            DropIndex("data.Labels", new[] { "ArchieveById" });
            DropIndex("data.Labels", new[] { "ModifiedById" });
            DropIndex("data.Labels", new[] { "CreatedById" });
            DropIndex("data.ProcessBooths", new[] { "ArchieveById" });
            DropIndex("data.ProcessBooths", new[] { "ModifiedById" });
            DropIndex("data.ProcessBooths", new[] { "CreatedById" });
            DropIndex("data.KitchenProductToProcessBooths", new[] { "ArchieveById" });
            DropIndex("data.KitchenProductToProcessBooths", new[] { "ModifiedById" });
            DropIndex("data.KitchenProductToProcessBooths", new[] { "CreatedById" });
            DropIndex("data.KitchenProductToProcessBooths", new[] { "ProcessBoothId" });
            DropIndex("data.KitchenProductToProcessBooths", new[] { "KitchenProductId" });
            DropIndex("data.KitchenProducts", new[] { "ArchieveById" });
            DropIndex("data.KitchenProducts", new[] { "ModifiedById" });
            DropIndex("data.KitchenProducts", new[] { "CreatedById" });
            DropIndex("data.GroupToApplicationFileMappings", new[] { "ArchieveById" });
            DropIndex("data.GroupToApplicationFileMappings", new[] { "ModifiedById" });
            DropIndex("data.GroupToApplicationFileMappings", new[] { "CreatedById" });
            DropIndex("data.GroupToApplicationFileMappings", new[] { "ApplicationFileGroupId" });
            DropIndex("data.GroupToApplicationFileMappings", new[] { "ApplicationFileTypeId" });
            DropIndex("data.FormFieldMaps", new[] { "ArchieveById" });
            DropIndex("data.FormFieldMaps", new[] { "ModifiedById" });
            DropIndex("data.FormFieldMaps", new[] { "CreatedById" });
            DropIndex("data.FormFieldMaps", new[] { "FieldId" });
            DropIndex("data.FormFieldMaps", new[] { "FormId" });
            DropIndex("data.Forms", new[] { "ArchieveById" });
            DropIndex("data.Forms", new[] { "ModifiedById" });
            DropIndex("data.Forms", new[] { "CreatedById" });
            DropIndex("data.Forms", new[] { "ApplicationEntityId" });
            DropIndex("data.FormEvents", new[] { "ArchieveById" });
            DropIndex("data.FormEvents", new[] { "ModifiedById" });
            DropIndex("data.FormEvents", new[] { "CreatedById" });
            DropIndex("data.FormEvents", new[] { "FormId" });
            DropIndex("data.FilterResultFields", new[] { "ArchieveById" });
            DropIndex("data.FilterResultFields", new[] { "ModifiedById" });
            DropIndex("data.FilterResultFields", new[] { "CreatedById" });
            DropIndex("data.FilterResultFields", new[] { "CommonFilterId" });
            DropIndex("data.FilterLists", new[] { "ArchieveById" });
            DropIndex("data.FilterLists", new[] { "ModifiedById" });
            DropIndex("data.FilterLists", new[] { "CreatedById" });
            DropIndex("data.FilterLists", new[] { "FilterId" });
            DropIndex("data.FilterLists", new[] { "FilterFieldId" });
            DropIndex("data.Filters", new[] { "ArchieveById" });
            DropIndex("data.Filters", new[] { "ModifiedById" });
            DropIndex("data.Filters", new[] { "CreatedById" });
            DropIndex("data.Filters", new[] { "ApplicationEntityId" });
            DropIndex("data.FilterFields", new[] { "ArchieveById" });
            DropIndex("data.FilterFields", new[] { "ModifiedById" });
            DropIndex("data.FilterFields", new[] { "CreatedById" });
            DropIndex("data.FilterFields", new[] { "FieldId" });
            DropIndex("data.FilterFields", new[] { "CommonFilterId" });
            DropIndex("data.OptionLists", new[] { "ArchieveById" });
            DropIndex("data.OptionLists", new[] { "ModifiedById" });
            DropIndex("data.OptionLists", new[] { "CreatedById" });
            DropIndex("data.FieldTypes", new[] { "ArchieveById" });
            DropIndex("data.FieldTypes", new[] { "ModifiedById" });
            DropIndex("data.FieldTypes", new[] { "CreatedById" });
            DropIndex("data.Fields", new[] { "ArchieveById" });
            DropIndex("data.Fields", new[] { "ModifiedById" });
            DropIndex("data.Fields", new[] { "CreatedById" });
            DropIndex("data.Fields", new[] { "ApplicationEntityPropertyId" });
            DropIndex("data.Fields", new[] { "OptionListId" });
            DropIndex("data.Fields", new[] { "FieldTypeId" });
            DropIndex("data.FieldEvents", new[] { "ArchieveById" });
            DropIndex("data.FieldEvents", new[] { "ModifiedById" });
            DropIndex("data.FieldEvents", new[] { "CreatedById" });
            DropIndex("data.FieldEvents", new[] { "FieldId" });
            DropIndex("data.Scripts", new[] { "ArchieveById" });
            DropIndex("data.Scripts", new[] { "ModifiedById" });
            DropIndex("data.Scripts", new[] { "CreatedById" });
            DropIndex("data.EntityScripts", new[] { "ArchieveById" });
            DropIndex("data.EntityScripts", new[] { "ModifiedById" });
            DropIndex("data.EntityScripts", new[] { "CreatedById" });
            DropIndex("data.EntityScripts", new[] { "ApplicationEntityId" });
            DropIndex("data.EntityScripts", new[] { "ScriptId" });
            DropIndex("data.NoteTypes", new[] { "ArchieveById" });
            DropIndex("data.NoteTypes", new[] { "ModifiedById" });
            DropIndex("data.NoteTypes", new[] { "CreatedById" });
            DropIndex("data.EntityNotes", new[] { "ArchieveById" });
            DropIndex("data.EntityNotes", new[] { "ModifiedById" });
            DropIndex("data.EntityNotes", new[] { "CreatedById" });
            DropIndex("data.EntityNotes", new[] { "NoteTypeId" });
            DropIndex("data.EntityNotes", new[] { "ApplicationEntityId" });
            DropIndex("data.CustomPages", new[] { "ArchieveById" });
            DropIndex("data.CustomPages", new[] { "ModifiedById" });
            DropIndex("data.CustomPages", new[] { "CreatedById" });
            DropIndex("data.CustomPageLinks", new[] { "ArchieveById" });
            DropIndex("data.CustomPageLinks", new[] { "ModifiedById" });
            DropIndex("data.CustomPageLinks", new[] { "CreatedById" });
            DropIndex("data.CustomPageLinks", new[] { "CustomPageId" });
            DropIndex("data.Products", new[] { "ArchieveById" });
            DropIndex("data.Products", new[] { "ModifiedById" });
            DropIndex("data.Products", new[] { "CreatedById" });
            DropIndex("data.Products", new[] { "OrganisationId" });
            DropIndex("data.Counters", new[] { "ArchieveById" });
            DropIndex("data.Counters", new[] { "ModifiedById" });
            DropIndex("data.Counters", new[] { "CreatedById" });
            DropIndex("data.Counters", new[] { "CustomerId" });
            DropIndex("data.Counters", new[] { "OrganisationId" });
            DropIndex("data.CounterProducts", new[] { "ArchieveById" });
            DropIndex("data.CounterProducts", new[] { "ModifiedById" });
            DropIndex("data.CounterProducts", new[] { "CreatedById" });
            DropIndex("data.CounterProducts", new[] { "ProductId" });
            DropIndex("data.CounterProducts", new[] { "CounterId" });
            DropIndex("data.CommunicationTemplateUserRecieverMaps", new[] { "ArchieveById" });
            DropIndex("data.CommunicationTemplateUserRecieverMaps", new[] { "ModifiedById" });
            DropIndex("data.CommunicationTemplateUserRecieverMaps", new[] { "CreatedById" });
            DropIndex("data.CommunicationTemplateUserRecieverMaps", new[] { "ToId" });
            DropIndex("data.CommunicationTemplateUserRecieverMaps", new[] { "CommunicationTemplateId" });
            DropIndex("data.Dashboards", new[] { "ArchieveById" });
            DropIndex("data.Dashboards", new[] { "ModifiedById" });
            DropIndex("data.Dashboards", new[] { "CreatedById" });
            DropIndex("data.UserDefinedRoles", new[] { "ArchieveById" });
            DropIndex("data.UserDefinedRoles", new[] { "ModifiedById" });
            DropIndex("data.UserDefinedRoles", new[] { "CreatedById" });
            DropIndex("data.UserDefinedRoles", new[] { "DashboardId" });
            DropIndex("data.UserDefinedRoles", new[] { "OrgId" });
            DropIndex("data.CommunicationTemplateRoleRecieverMaps", new[] { "ArchieveById" });
            DropIndex("data.CommunicationTemplateRoleRecieverMaps", new[] { "ModifiedById" });
            DropIndex("data.CommunicationTemplateRoleRecieverMaps", new[] { "CreatedById" });
            DropIndex("data.CommunicationTemplateRoleRecieverMaps", new[] { "ToId" });
            DropIndex("data.CommunicationTemplateRoleRecieverMaps", new[] { "CommunicationTemplateId" });
            DropIndex("data.CommunicationTypes", new[] { "ArchieveById" });
            DropIndex("data.CommunicationTypes", new[] { "ModifiedById" });
            DropIndex("data.CommunicationTypes", new[] { "CreatedById" });
            DropIndex("data.CommunicationTemplates", new[] { "ArchieveById" });
            DropIndex("data.CommunicationTemplates", new[] { "ModifiedById" });
            DropIndex("data.CommunicationTemplates", new[] { "CreatedById" });
            DropIndex("data.CommunicationTemplates", new[] { "FromId" });
            DropIndex("data.CommunicationTemplates", new[] { "CommunicationTypeId" });
            DropIndex("data.CommunicationTemplates", new[] { "ApplicationEntityId" });
            DropIndex("data.Communications", new[] { "ArchieveById" });
            DropIndex("data.Communications", new[] { "ModifiedById" });
            DropIndex("data.Communications", new[] { "CreatedById" });
            DropIndex("data.Communications", new[] { "CommunicationTemplateId" });
            DropIndex("data.Communications", new[] { "ApplicationEntityId" });
            DropIndex("data.ChildEntityRelations", new[] { "ArchieveById" });
            DropIndex("data.ChildEntityRelations", new[] { "ModifiedById" });
            DropIndex("data.ChildEntityRelations", new[] { "CreatedById" });
            DropIndex("data.ChildEntityRelations", new[] { "ChildEntityPropertyId" });
            DropIndex("data.ChildEntityRelations", new[] { "ChildEntityId" });
            DropIndex("data.ChildEntityRelations", new[] { "ParenEntityId" });
            DropIndex("data.Categories", new[] { "ArchieveById" });
            DropIndex("data.Categories", new[] { "ModifiedById" });
            DropIndex("data.Categories", new[] { "CreatedById" });
            DropIndex("data.Categories", new[] { "OrganisationId" });
            DropIndex("data.ServiceLocations", new[] { "ArchieveById" });
            DropIndex("data.ServiceLocations", new[] { "ModifiedById" });
            DropIndex("data.ServiceLocations", new[] { "CreatedById" });
            DropIndex("data.Bookings", new[] { "ArchieveById" });
            DropIndex("data.Bookings", new[] { "ModifiedById" });
            DropIndex("data.Bookings", new[] { "CreatedById" });
            DropIndex("data.Bookings", new[] { "CUstomerId" });
            DropIndex("data.Bookings", new[] { "ServiceLocationId" });
            DropIndex("data.ServerDirectories", new[] { "ArchieveById" });
            DropIndex("data.ServerDirectories", new[] { "ModifiedById" });
            DropIndex("data.ServerDirectories", new[] { "CreatedById" });
            DropIndex("data.ServerDirectories", new[] { "ParentDirectoryId" });
            DropIndex("data.ApplicationFileTypes", new[] { "ArchieveById" });
            DropIndex("data.ApplicationFileTypes", new[] { "ModifiedById" });
            DropIndex("data.ApplicationFileTypes", new[] { "CreatedById" });
            DropIndex("data.ApplicationFiles", new[] { "ArchieveById" });
            DropIndex("data.ApplicationFiles", new[] { "ModifiedById" });
            DropIndex("data.ApplicationFiles", new[] { "CreatedById" });
            DropIndex("data.ApplicationFiles", new[] { "OwnerId" });
            DropIndex("data.ApplicationFiles", new[] { "ServerDirectoryId" });
            DropIndex("data.ApplicationFiles", new[] { "ApplicationFileTypeId" });
            DropIndex("data.ApplicationFileGroups", new[] { "ArchieveById" });
            DropIndex("data.ApplicationFileGroups", new[] { "ModifiedById" });
            DropIndex("data.ApplicationFileGroups", new[] { "CreatedById" });
            DropIndex("data.ApplicationEntityProperties", new[] { "ArchieveById" });
            DropIndex("data.ApplicationEntityProperties", new[] { "ModifiedById" });
            DropIndex("data.ApplicationEntityProperties", new[] { "CreatedById" });
            DropIndex("data.ApplicationEntityProperties", new[] { "ApplicationEntityId" });
            DropIndex("data.ApplicationEntityAccessExpressions", new[] { "ArchieveById" });
            DropIndex("data.ApplicationEntityAccessExpressions", new[] { "ModifiedById" });
            DropIndex("data.ApplicationEntityAccessExpressions", new[] { "CreatedById" });
            DropIndex("data.ApplicationEntityAccessExpressions", new[] { "PropertyApplicationEntityId" });
            DropIndex("data.ApplicationEntityAccessExpressions", new[] { "ApplicationEntityId" });
            DropIndex("data.Currencies", new[] { "ArchieveById" });
            DropIndex("data.Currencies", new[] { "ModifiedById" });
            DropIndex("data.Currencies", new[] { "CreatedById" });
            DropIndex("data.Countries", new[] { "ArchieveById" });
            DropIndex("data.Countries", new[] { "ModifiedById" });
            DropIndex("data.Countries", new[] { "CreatedById" });
            DropIndex("data.Organizations", new[] { "ArchieveById" });
            DropIndex("data.Organizations", new[] { "ModifiedById" });
            DropIndex("data.Organizations", new[] { "CreatedById" });
            DropIndex("data.Organizations", new[] { "ParentOrganizationId" });
            DropIndex("data.Organizations", new[] { "CurrencyId" });
            DropIndex("data.Organizations", new[] { "CountryId" });
            DropIndex("data.IntUsers", new[] { "ArchieveById" });
            DropIndex("data.IntUsers", new[] { "ModifiedById" });
            DropIndex("data.IntUsers", new[] { "CreatedById" });
            DropIndex("data.IntUsers", new[] { "OrgId" });
            DropIndex("data.ApplicationEntities", new[] { "ArchieveById" });
            DropIndex("data.ApplicationEntities", new[] { "ModifiedById" });
            DropIndex("data.ApplicationEntities", new[] { "CreatedById" });
            DropTable("data.BusinessUsers");
            DropTable("data.WidgetTypes");
            DropTable("data.WidgetTemplates");
            DropTable("data.Widgets");
            DropTable("data.WidgetParameterTypes");
            DropTable("data.WidgetParameters");
            DropTable("data.WidgetDatas");
            DropTable("data.UserTaskTypes");
            DropTable("data.ScheduledTasks");
            DropTable("data.UserTasks");
            DropTable("data.UserDefinedRoleToUserMaps");
            DropTable("data.UserDefinedRoleMaps");
            DropTable("data.TaxCodes");
            DropTable("data.SysParameters");
            DropTable("data.StateActionStatements");
            DropTable("data.StateActions");
            DropTable("data.StateActionAccesses");
            DropTable("data.ProductToProcessBoothMaps");
            DropTable("data.ProductToKitchenProductMaps");
            DropTable("data.ProductCategories");
            DropTable("data.ProcessQueueStatus");
            DropTable("data.ProcessQueueItems");
            DropTable("data.Payments");
            DropTable("data.PaymentMethods");
            DropTable("data.PageAccesses");
            DropTable("data.OwnershipEntityAccesses");
            DropTable("data.OrderStatus");
            DropTable("data.Orders");
            DropTable("data.OrderProducts");
            DropTable("data.Options");
            DropTable("data.PageLinks");
            DropTable("data.Menus");
            DropTable("data.Labels");
            DropTable("data.ProcessBooths");
            DropTable("data.KitchenProductToProcessBooths");
            DropTable("data.KitchenProducts");
            DropTable("data.GroupToApplicationFileMappings");
            DropTable("data.FormFieldMaps");
            DropTable("data.Forms");
            DropTable("data.FormEvents");
            DropTable("data.FilterResultFields");
            DropTable("data.FilterLists");
            DropTable("data.Filters");
            DropTable("data.FilterFields");
            DropTable("data.OptionLists");
            DropTable("data.FieldTypes");
            DropTable("data.Fields");
            DropTable("data.FieldEvents");
            DropTable("data.Scripts");
            DropTable("data.EntityScripts");
            DropTable("data.NoteTypes");
            DropTable("data.EntityNotes");
            DropTable("data.CustomPages");
            DropTable("data.CustomPageLinks");
            DropTable("data.Products");
            DropTable("data.Counters");
            DropTable("data.CounterProducts");
            DropTable("data.CommunicationTemplateUserRecieverMaps");
            DropTable("data.Dashboards");
            DropTable("data.UserDefinedRoles");
            DropTable("data.CommunicationTemplateRoleRecieverMaps");
            DropTable("data.CommunicationTypes");
            DropTable("data.CommunicationTemplates");
            DropTable("data.Communications");
            DropTable("data.ChildEntityRelations");
            DropTable("data.Categories");
            DropTable("data.ServiceLocations");
            DropTable("data.Bookings");
            DropTable("data.ServerDirectories");
            DropTable("data.ApplicationFileTypes");
            DropTable("data.ApplicationFiles");
            DropTable("data.ApplicationFileGroups");
            DropTable("data.ApplicationEntityProperties");
            DropTable("data.ApplicationEntityAccessExpressions");
            DropTable("data.Currencies");
            DropTable("data.Countries");
            DropTable("data.Organizations");
            DropTable("data.IntUsers");
            DropTable("data.ApplicationEntities");
        }
    }
}
