
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetOrganizationList = function () {
        _appget($http,
            {
                url: api_url + '/api/Organization/GetAll',
                resp: function (response) { $scope.OrganizationList = response.data.Result; }
            });
    };
    $scope.GetOrganizationList();


    $scope.GetTaxCodeList = function () {
        _appget($http,
            {
                url: api_url + '/api/TaxCode/GetAll',
                resp: function (response) { $scope.TaxCodeList = response.data.Result; }
            });
    };
    $scope.GetTaxCodeList();


};



var config =
{

    EntityName: 'Products',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    cols: 3,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Product/Add'
    },
    actionlist: [{
        url: '/Product/Edit/?Id={Id}', Text: 'Edit',
    }
        
        ],
    filterFieldList: [],
    thList: [
        { view: 'Name' },
        { view: 'Organization' },
        { view: 'Amount' },
        { view: 'Discount' },
        { view: 'Tax Code' },
        { view: 'Sku' },

    ],
    tdList: [
        {
            view: `{{m.Name}}`
        },
        {
            view: `{{m.Organization.Name}}`
        },
        {
            view: `{{m.Amount}}`
        },
        {
            view: `{{m.Discount}}`
        },
        {
            view: `{{m.TaxCode.Name}}`
        },
        {
            view: `{{m.Sku}}`
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
            view: setUIFields('model', 'number', { label: 'Amount', value: 'Amount' }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Discount', value: 'Discount' }), weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Tax Code', value: 'TaxCodeId',
                list: 'TaxCodeList', optid: 'Id',
                optlabel: ['Name']
            }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Sku', value: 'Sku' }), weight: 2
        },
   
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/Product/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
