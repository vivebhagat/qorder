
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetProcessBoothList = function () {
        _appget($http,
            {
                url: api_url + '/api/ProcessBooth/GetAll',
                resp: function (response) { $scope.ProcessBoothList = response.data.Result; }
            });
    };
    $scope.GetProcessBoothList();

    $scope.GetOrderProductList = function () {
        _appget($http,
            {
                url: api_url + '/api/OrderProduct/GetAll',
                resp: function (response) { $scope.OrderProductList = response.data.Result; }
            });
    };
    $scope.GetOrderProductList();


    $scope.GetProcessQueueStatusList = function () {
        _appget($http,
            {
                url: api_url + '/api/ProcessQueueStatus/GetAll',
                resp: function (response) { $scope.ProcessQueueStatusList = response.data.Result; }
            });
    };
    $scope.GetProcessQueueStatusList();

};



var config =
{
    EntityName: 'Process Queue Items',
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
        { view: 'Process Booth' },
        { view: 'Order Product' },
        { view: 'Status' },
    ],
    tdList: [
        {
            view: '{{m.ProcessBooth.Name}}'
        },
        {
            view:
                `{{m.OrderProduct.Id}}`
        },
        {
            view:
                `{{m.Status.Name}}`
        },

    ],
    fieldList: [[
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Process Booth', value: 'ProcessBoothId',
                list: 'ProcessBoothList', optid: 'Id', optlabel: ['Name']
            })
        },
        {
            view:
                '<div><br><label><b>ORDER PRODUCT</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.OrderProductId">' +
                '<option ng-value="model.OrderProductId" >' +
                '{{ model.OrderProduct.Id}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.OrderProductId", apply: 'model.OrderProduct' },
            filter: { field: "OrderProductId", url: '/api/OrderProduct/_postGetUIFiltered/', apply: 'OrderProduct', name: 'Id' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Process Queue Status', value: 'ProcessQueueStatusId',
                list: 'ProcessQueueStatusList', optid: 'Id', optlabel: ['Name']
            }), weight: 2
        }]
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/ProcessQueueItem/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
