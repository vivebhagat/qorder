
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.$on('getEvent', function (event, data) {
        $scope.Get();
    });


};


var _config1 =
{

    EntityName: 'Queue Items',
    onscreenAdd: true,
    onscreenEdit: true,
    use_filter: false,
    popupEdit: false,
    enableDelete: true,
    addbutton: {
        url: '/Category/Add'
    },
    filterFieldList: [],
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.GetList = function () {
            _appget($http,
                {
                    url: api_url + '/api/ProcessQueueItem/GetProcessQueueItemForProcessBooth/?Id=' + $location.search().Id,
                    resp: function (response) {
                        $scope.MainList = response.data.Result;
                    }
                });
        };


        $scope.sendEvent = function () {
            $scope.$emit('getEvent', []);
        };
    },
    AddCtrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.dateOpts = appSettings.dateOpts;

        $scope.Add = function (m) {
            if (m == null) {
                $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
            }
            else {
                m.ProcessBoothId = $location.search().Id;
                _apppost($http, {
                    url: api_url + $scope.config.api_base + 'Add', model: m,
                    before: $scope.ResetMessages,
                    resp: function (response) {
                        $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                        $scope.model = {};
                        $scope.model_id = response.data.Result;
                        $scope.Get();
                    },
                    eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                });
            }
        };

        $scope.Edit = function (m) {

            if (m == null) {
                $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
            }
            else {
                if (typeof m.ExtraData != 'undefined') {
                    m.LegacyNumber = JSON.stringify(m.ExtraData);
                }
                m.ProcessBoothId = $location.search().Id;
                _apppost($http, {
                    url: api_url + $scope.config.api_base + 'Edit', model: m,
                    before: $scope.ResetMessages,
                    resp: function (response) {
                        $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                    },
                    eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                });
            }
        };


        $scope.GetOrderProductList = function () {
            _appget($http,
                {
                    url: api_url + '/api/OrderProduct/GetAll',
                    resp: function (response) { $scope.OrderProductList = response.data.Result; }
                });
        };
        $scope.GetOrderProductList();


        $scope.GetStatusList = function () {
            _appget($http,
                {
                    url: api_url + '/api/ProcessQueueStatus/GetAll',
                    resp: function (response) { $scope.StatusList = response.data.Result; }
                });
        };
        $scope.GetStatusList();

   
    },
    actionlist: [],
    thList: [
        { view: 'Order Product' },
        { view: 'Status' },
    ],
    tdList: [
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
            view:
                '<div><br><label>ORDER PRODUCT</label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.OrderProductId">' +
                '<option ng-value="model.OrderProductId" >' +
                '{{ model.OrderProduct.Id}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.OrderProductId", apply: 'model.OrderProduct' },
            filter: { field: "OrderProductId", url: '/api/OrderProduct/_postGetUIFiltered/', apply: 'OrderProduct', Name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Process Queue Status', value: 'StatusId',
                list: 'StatusList', optid: 'Id', optlabel: ['Name']
            }), weight: 2
        }]
    ],
    api_base: '/api/ProcessQueueItem/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var _config2 =
{
    EntityName: 'Kitchen Items',
    onscreenAdd: true,
    onscreenEdit: true,
    use_filter: false,
    popupEdit: false,
    enableDelete: true,
    addbutton: {
        url: '/Category/Add'
    },
    filterFieldList: [],
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
  
        $scope.GetList = function () {
            _appget($http,
                {
                    url: api_url + '/api/KitchenProductToProcessBooth/GetKitchenProductToProcessBoothForProcessBooth/?Id=' + $location.search().Id,
                    resp: function (response) {
                        $scope.MainList = response.data.Result;
                    }
                });
        };


        $scope.sendEvent = function () {
            $scope.$emit('getEvent', []);
        };
    },
    AddCtrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.dateOpts = appSettings.dateOpts;

        $scope.Add = function (m) {
            if (m == null) {
                $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
            }
            else {
                m.ProcessBoothId = $location.search().Id;
                _apppost($http, {
                    url: api_url + $scope.config.api_base + 'Add', model: m,
                    before: $scope.ResetMessages,
                    resp: function (response) {
                        $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                        $scope.model = {};
                        $scope.model_id = response.data.Result;
                        $scope.Get();
                    },
                    eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                });
            }
        };

        $scope.Edit = function (m) {

            if (m == null) {
                $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
            }
            else {
                if (typeof m.ExtraData != 'undefined') {
                    m.LegacyNumber = JSON.stringify(m.ExtraData);
                }
                m.ProcessBoothId = $location.search().Id;
                _apppost($http, {
                    url: api_url + $scope.config.api_base + 'Edit', model: m,
                    before: $scope.ResetMessages,
                    resp: function (response) {
                        $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                    },
                    eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                });
            }
        };



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


    },
    actionlist: [],
    thList: [
        { view: 'Kitchen Product' },
        { view: 'Time To Process    ' },

    ],
    tdList: [
        {
            view: '{{m.KitchenProduct.Name}}'
        },
        {
            view: '{{m.TimeToProcess}}'
        },
   

    ],
    fieldList: [[
        {
            view:
                '<div><br><label>KITCHEN PRODUCT</label>' +
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
    api_base: '/api/KitchenProductToProcessBooth/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};



var config =
{

    EntityName: 'Process Booths',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'process_booth_queue_' },
        { config: _config2, tab: 'kitchen_product_to_process_booth' },

    ],
    tabList: [
        { text: 'Queue Items', id: 'process_booth_queue_' },
        { text: 'Kitchen Items', id: 'kitchen_product_to_process_booth' }
    ],
    onscreenAdd: false,
    cols: 1,
    backbutton: {
        url: '/ProcessBooth/index'
    },
    actionlist: [],
    fieldList: [

        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'checkbox', { label: 'Is Kitchen', value: 'IsKitchen' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'checkbox', { label: 'Is Packing', value: 'IsPacking' }), weight: 2
        },

    ],
    api_base: '/api/ProcessBooth/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');

