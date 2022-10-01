
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



};



var config =
{


    EntityName: 'Inventory Locations',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    cols: 3,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/InventoryLocation/Add'
    },
    actionlist: [{
        url: '/InventoryLocation/Edit/?Id={Id}', Text: 'Edit',

    },],
    filterFieldList: [],
    thList: [

        { view: 'Name' },

    ],
    tdList: [

        {
            view: '{{m.Name }}'
        },

    ],
    fieldList: [],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/InventoryLocation/',
    activable: false,
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
