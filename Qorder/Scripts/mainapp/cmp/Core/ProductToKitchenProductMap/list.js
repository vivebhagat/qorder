
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetProductList = function () {
        _appget($http,
            {
                url: api_url + '/api/Product/GetAll',
                resp: function (response) { $scope.ProductList = response.data.Result; }
            });
    };
    $scope.GetProductList();

    $scope.GetKitchenProductList = function () {
        _appget($http,
            {
                url: api_url + '/api/KitchenProduct/GetAll',
                resp: function (response) { $scope.KitchenProductList = response.data.Result; }
            });
    };
    $scope.GetKitchenProductList();


};



var config =
{
    

    EntityName: 'Product To Kitchen Items Maps',
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
        { view: 'Product' },
        { view: 'Kitchen Product' },
    ],
    tdList: [
        {
            view: '{{m.Product.Name}}'
        },
        {
            view:
                `{{m.KitchenProduct.Name}}`
        },

    ],
    fieldList: [[
        {
            view:
                '<div><br><label><b>PRODUCT</b></label>' +
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
            view:
                '<div><br><label><b>KITCHEN PRODUCT</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.KitchenProductId">' +
                '<option ng-value="model.KitchenProductId" >' +
                '{{ model.KitchenProduct.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.KitchenProductId", apply: 'model.KitchenProduct' },
            filter: { field: "KitchenProductId", url: '/api/KitchenProduct/_postGetUIFiltered/', apply: 'KitchenProduct', name: 'Name' },
            btnLikeDisable: false, weight: 2
        }]
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/ProductToKitchenProductMap/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
