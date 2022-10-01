
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {




};



var config =
{
    EntityName: 'Hotel Sections',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    cols: 3,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Counter/Add'
    },
    actionlist: [
        { url: '/Counter/Edit/?Id={Id}', Text: 'Edit', },
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
                label: 'Organization', value: 'OrganizationId',
                list: 'OrganizationList', optid: 'Id',
                optlabel: ['Name']
            }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Url', value: 'Url' }), weight: 2
        },
    ],

    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/Counter/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
