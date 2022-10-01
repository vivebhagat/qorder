
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};



var config =
{
    EntityName: 'Categories',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Category/Add'
    },
    actionlist: [
       { url: '/Category/Edit/?Id={Id}', Text: 'Edit' },


    ],
    filterFieldList: [],
    thList: [
        { view: 'Name' },
        { view: 'Organization' },
    ],
    tdList: [
        {
            view: `{{m.Name}}`
        },
        {
            view: `{{m.Organization.Name}}`
        },
       

    ],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'ORGANIZATION', value: 'OrganizationId',
                list: 'OrganizationList', optid: 'Id', optlabel: ['Name']
            }), weight: 2
        },

    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/Category/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
