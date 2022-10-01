
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetKitchenProductList = function () {
        _appget($http,
            {
                url: api_url + '/api/KitchenProduct/GetAll',
                resp: function (response) { $scope.KitchenProductList = response.data.Result; }
            });
    };
    $scope.GetKitchenProductList();


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
    EntityName: 'Kitchen Product To Process Booths',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: true,
    enableDelete: true,
    activable: true,
    addbutton: {
        url: '/Category/Add'
    },
    actionlist: [],
    filterFieldList: [],
    thList: [
        { view: 'Kitchen Product' },
        { view: 'Process Booth' },
    ],
    tdList: [
        {
            view: '{{m.KitchenProduct.Name}}'
        },
        {
            view:
                `{{m.ProcessBooth.Name}}`
        },

    ],
    fieldList: [[
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
        },
        {
            view:
                '<div><br><label><b>PROCESS BOOTH</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.ProcessBoothId">' +
                '<option ng-value="model.ProcessBoothId" >' +
                '{{ model.ProcessBooth.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.ProcessBoothId", apply: 'model.ProcessBooth' },
            filter: { field: "ProcessBoothId", url: '/api/ProcessBooth/_postGetUIFiltered/', apply: 'ProcessBooth', name: 'Name' },
            btnLikeDisable: false, weight: 2
        }]
        
        
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/KitchenProductToProcessBooth/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
