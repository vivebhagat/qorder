


var config =
{
   
    EntityName: 'Vendors',
    onPageAdd: true,
    onscreenAdd: false,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Vendor/Add'
    },
    actionlist: [
        {
            url: '/Vendor/Edit/?Id={Id}', Text: 'Edit'
        },
        {
            url: '/Vendor/RoleMap/?Id={Id}', Text: 'Role Map'
        },
        {
            url: '/Vendor/LoginData/?Id={Id}', Text: 'Login Data'
        }
    ],
    filterFieldList: [],
    thList: [
        { view: 'User Name' },
        { view: 'First Name' },
        { view: 'Last Name' },
        { view: 'DOB' },
        { view: 'Email' },
    ],
    tdList: [
        {
            view: '{{m.Name}}'
        },
        {
            view: '{{m.FirstName}}'
        },
        {
            view: '{{m.LastName}}'
        },
        {
            view: '{{m.DOB | date : "dd/MM/yyyy"}}'
        },
        {
            view: '{{m.Email}}'
        },
    ],
    fieldList: [
    ],
    use_filter: true,
    use_local_list: false,
    api_base: '/api/Vendor/',
    inlineEdit: false,
    onscreenEdit : false,
    template_url: '/scripts/app/cmp/list.html'
};



commonListSetup(app, config, 'list');
