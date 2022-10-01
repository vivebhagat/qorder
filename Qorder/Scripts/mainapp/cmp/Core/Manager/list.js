


var config =
{
   
    EntityName: 'Managers',
    onPageAdd: true,
    onscreenAdd: false,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Manager/Add'
    },
    actionlist: [
        {
            url: '/Manager/Edit/?Id={Id}', Text: 'Edit'
        },
        {
            url: '/Manager/RoleMap/?Id={Id}', Text: 'Role Map'
        },
        {
            url: '/Manager/LoginData/?Id={Id}', Text: 'Login Data'
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
    api_base: '/api/Manager/',
    inlineEdit: false,
    onscreenEdit : false,
    template_url: '/scripts/app/cmp/list.html'
};



commonListSetup(app, config, 'list');
