
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


    $scope.GetCounterList = function () {
        _appget($http,
            {
                url: api_url + '/api/Counter/GetAll',
                resp: function (response) { $scope.CounterList = response.data.Result; }
            });
    };
    $scope.GetCounterList();

    $scope.GetProductList = function () {
        _appget($http,
            {
                url: api_url + '/api/Product/GetAll',
                resp: function (response) { $scope.CProductList = response.data.Result; }
            });
    };
    $scope.GetProductList();

};



var config =
{
    EntityName: 'Counter Products',
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
        { view: 'Counter' },
        { view: 'Product' },
    ],
    tdList: [
        {
            view:
                `{{m.Counter.Name}}`
        },

        {
            view:
                `{{m.Product.Name}}`
        },

    ],
    fieldList: [[
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Counter', value: 'CounterId',
                list: 'CounterList', optid: 'Id', optlabel: ['Name']
            }), weight: 2

        },
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
        }]
  
    ],
    use_filter: true,
    onscreenEdit: true,
    use_local_list: false,
    api_base: '/api/CounterProduct/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
