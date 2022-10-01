
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};



var config =
{
    EntityName: 'Payment Methods',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Category/Add'
    },
    actionlist: [],
    filterFieldList: [],
    thList: [
        { view: 'Name' },

    ],
    tdList: [
        {
            view: '{{m.Name}}'
        },

    ],
    fieldList: [[
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        }]
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/PaymentMethod/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
