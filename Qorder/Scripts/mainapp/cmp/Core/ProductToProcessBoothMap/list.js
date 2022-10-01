
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

    $scope.GetProcessBoothList = function () {
        _appget($http,
            {
                url: api_url + '/api/ProcessBooth/GetAll',
                resp: function (response) { $scope.ProcessBoothList = response.data.Result; }
            });
    };
    $scope.GetProcessBoothList();

};



var config =
{
   EntityName: 'Product To Process Booth Maps',
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
        { view: 'Process Booth' },
    ],
    tdList: [
        {
            view: '{{m.Product.Name}}'
        },
        {
            view:
                `{{m.ProcessBooth.Name}}`
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
            view: setUIFields('model', 'dropdown', {
                label: 'Process Booth', value: 'ProcessBoothId',
                list: 'ProcessBoothList', optid: 'Id', optlabel: ['Name']
            }), weight: 2
        }]
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/ProductToProcessBoothMap/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
