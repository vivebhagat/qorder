
var config =
{
    EntityName: 'User',
    onPageAdd: true,
    onscreenAdd: false,
    activable: true,
    addbutton: {
        url: '/IntUsers/Add'
    },
    actionlist: [
        {
            url: '/IntUsers/Edit/?Id={Id}', Text: 'Edit'
        },
        {
            url: '/IntUsers/RoleMap/?Id={Id}', Text: 'Roles'
        },
        {
            url: '/IntUsers/EntityAccess/?Id={Id}', Text: 'Entity Access'
        },
        {
            url: '/IntUsers/LoginData/?Id={Id}', Text: 'Login Data'
        }
    ],
    filterFieldList: [],
    thList: [
        { view: 'User Name' },
        { view: 'First Name' },
        { view: 'Last Name' },
        { view: 'DOB' },
        { view: 'Email' }
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
        }
    ],
    fieldList: [],
    use_filter: false,
    api_base: '/api/intuser/',
    inlineEdit: false,
    onscreenEdit: false,
    use_local_list: false,
    template_url: _sfconstant.default_list_template_path
};

commonListSetup(app, config, 'list');