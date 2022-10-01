
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

    $scope.GetVariationList = function () {
        _appget($http,
            {
                url: api_url + '/api/Variation/GetAll',
                resp: function (response) { $scope.VariationList = response.data.Result; }
            });
    };
    $scope.GetVariationList();


};



var config =
{
    EntityName: 'Product Variations',
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
        { view: 'Variation' },
    ],
    tdList: [,
        {
            view: '{{m.Product.Name}}'
        },
        {
            view: '{{m.Variation.Name}}'
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
                '<div><br><label><b>Variation</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.VariationId">' +
                '<option ng-value="model.VariationId" >' +
                '{{ model.Variation.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.VariationId", apply: 'model.Variation' },
            filter: { field: "VariationId", url: '/api/Variation/_postGetUIFiltered/', apply: 'Variation', name: 'Name' },
            btnLikeDisable: false, weight: 2
        }]
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/ProductVariation/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
