
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

    $scope.GetCategoryList = function () {
        _appget($http,
            {
                url: api_url + '/api/Category/GetAll',
                resp: function (response) { $scope.CategoryList = response.data.Result; }
            });
    };
    $scope.GetCategoryList();


};



var config =
{
    EntityName: 'Product Categories',
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
        { view: 'Category' },
        { view: 'Is Mapped' },
    ],
    tdList: [
        {
            view: '{{m.Product.Name}}'
        },
        {
            view: '{{m.Category.Name}}'
        },
        {
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsMapped">`
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
                '<div><br><label><b>CATEGORY</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.CategoryId">' +
                '<option ng-value="model.CategoryId" >' +
                '{{ model.Category.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.CategoryId", apply: 'model.Category' },
            filter: { field: "CategoryId", url: '/api/Category/_postGetUIFiltered/', apply: 'Category', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: setUIFields('model', 'checkbox', { label: 'Is Mapped', value: 'IsMapped' }), weight: 2
        }]
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/ProductCategory/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
