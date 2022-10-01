


var config =
{
   
    EntityName: 'Business Users',
    onPageAdd: true,
    onscreenAdd: false,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/businessuser/Add'
    },
    actionlist: [
        {
            url: '/businessuser/Edit/?Id={Id}', Text: 'Edit'
        },
        {
            url: '/businessuser/RoleMap/?Id={Id}', Text: 'Role Map'
        },
        {
            url: '/businessuser/LoginData/?Id={Id}', Text: 'Login Data'
        }
    ],
    filterFieldList: [],
    thList: [
        { view: 'User Name'},
        { view: 'First Name'},
        { view: 'Last Name'},
        { view: 'DOB'},
        { view: 'Email' },
        { view: 'Is Manager'},
        { view: 'Is Customer'},
        { view: 'Is Vendor'},
        { view: 'Is Staff'},

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
        {
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsManager">`
        },
        {
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsCustomer">`
        },
        {
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsVendor">`
        },
        {
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsStaff">`
        },
      
    ],
    fieldList: [
    ],
    use_filter: true,
    use_local_list: false,
    api_base: '/api/businessuser/',
    inlineEdit: false,
    onscreenEdit : false,
    template_url: '/scripts/app/cmp/list.html'
};



commonListSetup(app, config, 'list');
