
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.$on('getEvent', function (event, data) {
        $scope.Get();
    });

 

};




var _config1 =
{

    EntityName: 'Stocks',
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
                    url: api_url + '/api/InventoryLocationStock/GetInventoryLocationStockForInventoryLocation/?Id=' + $location.search().Id,
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
                m.InventoryLocationId = $location.search().Id;
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
                m.InventoryLocationId = $location.search().Id;
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

        $scope.GetInventoryItemList = function () {
            _appget($http,
                {
                    url: api_url + '/api/InventoryItem/GetAll',
                    resp: function (response) { $scope.InventoryItemList = response.data.Result; }
                });
        };
        $scope.GetInventoryItemList();

        $scope.GetUnitList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Unit/GetAll',
                    resp: function (response) { $scope.UnitList = response.data.Result; }
                });
        };
        $scope.GetUnitList();


    },
    actionlist: [],
    thList: [
        { view: 'Inventory Item' },
        {view: 'Unit'},
        { view: 'Quantity' },
        { view: 'Minimum Stock Level' },
    ],
    tdList: [

        {
            view:
                `{{m.InventoryItem.Name}}`
        },
        {
            view:
                `{{m.InventoryItem.Unit.Name}}`
        },
        {
            view:
                `{{m.Quantity}}`
        },
        {
            view:
                `{{m.MinimumStockLevel}}`
        },

    ],
    fieldList: [[

        {
            view:
                '<div><br><label><b>INVENTORY ITEM</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.InventoryItemId">' +
                '<option ng-value="model.InventoryItemId" >' +
                '{{ model.InventoryItem.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.InventoryItemId", apply: 'model.InventoryItem' },
            filter: { field: "InventoryItemId", url: '/api/InventoryItem/_postGetUIFiltered/', apply: 'InventoryItem', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: '</br><lable><b>UNIT</b></lable></br>{{model.InventoryItem.Unit.Name}}', weight: 2

        },
        {
            view: setUIFields('model', 'number', { label: 'Quantity', value: 'Quantity' }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Minimum Stock Level', value: 'MinimumStockLevel' }), weight: 2
        }]

    ],
    api_base: '/api/InventoryLocationStock/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};


var config =
{

    EntityName: 'Inventory Locations',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'inventory_location_stock' },],
    tabList: [
        { text: 'Stocks ', id: 'inventory_location_stock' },
    ],
    onscreenAdd: false,
    cols: 3,
    backbutton: {
        url: '/InventoryLocation/index'
    },
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },

    ],
    api_base: '/api/InventoryLocation/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');

