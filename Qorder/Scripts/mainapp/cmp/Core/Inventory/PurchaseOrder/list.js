
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



};



var config =
{


    EntityName: 'Purchase Orders',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    cols: 3,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/PurchaseOrder/Add'
    },
    actionlist: [{
        url: '/PurchaseOrder/Edit/?Id={Id}', Text: 'Edit',

    },],
    filterFieldList: [],
    thList: [
        { view: 'Vendor' },
        { view: 'Date' },
        { view: 'Total Exc. Tax' },
        { view: 'Total Inc. Tax' },

    ],
    tdList: [
        {
            view: '{{m.Vendor.Name}}'
        },
        {
            view: '{{m.Date}}'
        },
        {
            view:
                `{{m.TotalWithoutTax}}`
        },
        {
            view:
                `{{m.TotalWithTax}}`
        },
      
    ],
    fieldList: [],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/PurchaseOrder/',
    activable: false,
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
