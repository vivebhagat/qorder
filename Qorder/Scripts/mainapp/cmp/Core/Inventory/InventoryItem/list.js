
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



};



var config =
{


    EntityName: 'Inventory Items',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    cols: 3,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/InventoryItem/Add'
    },
    actionlist: [{
        url: '/InventoryItem/Edit/?Id={Id}', Text: 'Edit',

    },],
    filterFieldList: [],
    thList: [

        { view: 'Name' },
        {view: 'Base Price'},
        { view: 'Unit' },
        { view: 'Tax Code' },
  
    ],
    tdList: [

        {
            view: '{{m.Name }}'
        },
        {
            view: '{{m.BasePrice}}'

        },
        {
            view: '{{m.Unit.Name}}'
        },
        {
            view: '{{m.TaxCode.Name}}'
        },
    
    ],
    fieldList: [],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/InventoryItem/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
