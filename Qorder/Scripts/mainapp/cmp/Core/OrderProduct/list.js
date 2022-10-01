
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetOrderList = function () {
        _appget($http,
            {
                url: api_url + '/api/Order/GetAll',
                resp: function (response) { $scope.ProductList = response.data.Result; }
            });
    };
    $scope.GetOrderList();
    $scope.GetProductList = function () {
        _appget($http,
            {
                url: api_url + '/api/Product/GetAll',
                resp: function (response) { $scope.ProductList = response.data.Result; }
            });
    };
    $scope.GetProductList();

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

    EntityName: 'Order Products',
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
        { view: 'Order' },
        { view: 'Counter' },
        { view: 'Product' },
        { view: 'IsMapped' },
        { view: 'Current Amount' },
        { view: 'Quantity' },
        { view: 'Tax Code' },
        { view: 'Discount' },
        { view: 'Total' },
   
    ],
    tdList: [
        {
            view: '{{m.Order.Id}}'
        },
        {
            view: '{{m.Order.Counter.Name}}'
        },
        {
            view:
                `{{m.Product.Name}}`
        },
        {
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsMapped">`
        },
        {
            view:
                `{{m.CurrentAmount}}`
        },
        {
            view:
                `{{m.Quantity}}`
        },
        {
            view:
                `{{m.Tax}}`
        },
        {
            view:
                `{{m.Discount}}`
        },
        {
            view:
                `{{m.Total}}`
        },
    ],
    fieldList: [[
        {
            view:
                '<div><br><label><b>ORDER</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.OrderId">' +
                '<option ng-value="model.OrderId" >' +
                '{{ model.Order.Id}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.OrderId", apply: 'model.Order' },
            filter: { field: "OrderId", url: '/api/Order/_postGetUIFiltered/', apply: 'Order', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view:
                '<div><br><label><b>Product</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.ProductId">' +
                '<option ng-value="model.ProductId" >' +
                '{{ model.Product.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.ProductId", apply: 'model.Product' },
            filter: { field: "ProductId", url: '/api/Product/_postGetUIFiltered/', apply: 'Product', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: setUIFields('model', 'checkbox', { label: 'Mapped', value: 'IsMapped' }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Currrent Amount', value: 'CurrentAmount' }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Quantity', value: 'Quantity' }), weight: 2

        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Tax Code', value: 'TaxCodeId',
                list: 'TaxCodeList', optid: 'Id',
                optlabel: ['Name']
            }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Discount', value: 'Discount' }), weight: 2

        },
        {
            view: setUIFields('model', 'text', { label: 'Total', value: 'Total' }), weight: 2
        }]
      
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/OrderProduct/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
