


var config =
{
   
    EntityName: 'Customers',
    onPageAdd: true,
    onscreenAdd: false,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Customer/Add'
    },
    actionlist: [
        {
            url: '/Customer/Edit/?Id={Id}', Text: 'Edit'
        },
        {
            url: '/Customer/RoleMap/?Id={Id}', Text: 'Role Map'
        },
        {
            url: '/Customer/LoginData/?Id={Id}', Text: 'Login Data'
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
    api_base: '/api/Customer/',
    inlineEdit: false,
    onscreenEdit : false,
    template_url: '/scripts/app/cmp/list.html'
};



commonListSetup(app, config, 'list');
