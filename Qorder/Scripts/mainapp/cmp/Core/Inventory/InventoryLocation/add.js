
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

   


};

var config =
{
    EntityName: 'Inventory Locations',
    Mainctrl: Mainctrl,
    cols: 2,
    backbutton: {
        url: '/InventoryLocation/Index'
    },
    editurl: '/InventoryLocation/edit/?Id=',
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },

    ],
    api_base: '/api/InventoryLocation/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');