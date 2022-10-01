
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};



var config =
{

    EntityName: 'Order Statuses',
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
        { view: 'Status' },
        { view: 'System Code' },

    ],
    tdList: [

        {
            view: '{{m.Name}}'
        },
        {
            view: '{{m.SystemCode}}'
        },

    ],
    fieldList: [[
        {
            view: setUIFields('model', 'text', { label: 'Status', value: 'Name' }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'System Code', value: 'SystemCode' }), weight: 2
        }]

    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/OrderStatus/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
