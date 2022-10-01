
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.$on('getEvent', function (event, data) {
        $scope.Get();
    });

    $scope.GetUnitList = function () {
        _appget($http,
            {
                url: api_url + '/api/Unit/GetAll',
                resp: function (response) { $scope.UnitList = response.data.Result; }
            });
    };
    $scope.GetUnitList();
    $scope.GetTaxCodeList = function () {
        _appget($http,
            {
                url: api_url + '/api/TaxCode/GetAll',
                resp: function (response) { $scope.TaxCodeList = response.data.Result; }
            });
    };
    $scope.GetTaxCodeList();


};




var _config1 =
{

    EntityName: 'Vendors',
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
                    url: api_url + '/api/VendorToInventoryItemMap/GetVendorForInventoryItem/?Id=' + $location.search().Id,
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
                m.InventoryItemId = $location.search().Id;
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
                m.InventoryItemId = $location.search().Id;
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

        $scope.GetVendorList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Vendor/GetAll',
                    resp: function (response) { $scope.VendorList = response.data.Result; }
                });
        };
        $scope.GetVendorList();


    },
    actionlist: [],
    thList: [
        { view: 'Vendor' },
        { view: 'Price' },
    ],
    tdList: [

        {
            view:
                `{{m.Vendor.Name}}`
        },
        {
            view:
                `{{m.Price}}`
        },

    ],
    fieldList: [[

        {
            view:
                '<div><br><label><b>VENDOR</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.VendorId">' +
                '<option ng-value="model.VendorId" >' +
                '{{ model.Vendor.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.VendorId", apply: 'model.Vendor' },
            filter: { field: "VendorId", url: '/api/Vendor/_postGetUIFiltered/', apply: 'Vendor', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Price', value: 'Price' }), weight: 2
        }]

    ],
    api_base: '/api/VendorToInventoryItemMap/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var _config2 =
{
    EntityName: 'Products',
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
                    url: api_url + '/api/ProductToInventoryItemMap/GetProductForInventoryItem/?Id=' + $location.search().Id,
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
                $scope.DefaultMessage.ErrorMessage = 'No details recieved.';
            }
            else {
                m.InventoryItemId = $location.search().Id;
                _apppost($http,
                    {
                        url: api_url + $scope.config.api_base + 'Add',
                        model: m,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.model = {};
                            $scope.cancel();
                        },
                        eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                    });
            }
        };

        $scope.Edit = function (m) {
            if (m == null) {
                $scope.DefaultMessage.ErrorMessage = 'No details recieved.';
            }
            else {
                m.InventoryItemId = $location.search().Id;
                _apppost($http,
                    {
                        url: api_url + $scope.config.api_base + 'Edit',
                        model: m,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                        },
                        eresp: function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        }
                    });
            }
        };

        $scope.GetProductList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Product/GetAll',
                    resp: function (response) { $scope.CProductList = response.data.Result; }
                });
        };
        $scope.GetProductList();




    },
    actionlist: [],
    thList: [
        { view: 'Product' },
        { view: 'Quantity' },
    ],
    tdList: [

        {
            view:
                `{{m.Product.Name}}`
        },
        {
            view:
                `{{m.Quantity}}`
        },

    ],
    fieldList: [[

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
            view: setUIFields('model', 'number', { label: 'Quantity', value: 'Quantity' }), weight: 2
        }]

    ],
    api_base: '/api/ProductToInventoryItemMap/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var _config3 =
{

    EntityName: 'Stocks',
    onscreenAdd: true,
    onscreenEdit: true,
    use_filter: false,
    popupEdit: false,
    addbutton: {
        url: '/Category/Add'
    },
    filterFieldList: [],
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.GetList = function () {
            _appget($http,
                {
                    url: api_url + '/api/InventoryLocationStock/GetInventoryLocationStockForInventoryItem/?Id=' + $location.search().Id,
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
                $scope.DefaultMessage.ErrorMessage = 'No details recieved.';
            }
            else {
                m.InventoryItemId = $location.search().Id;
                _apppost($http,
                    {
                        url: api_url + $scope.config.api_base + 'Add',
                        model: m,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.model = {};
                            $scope.cancel();
                        },
                        eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                    });
            }
        };

        $scope.Edit = function (m) {
            if (m == null) {
                $scope.DefaultMessage.ErrorMessage = 'No details recieved.';
            }
            else {
                m.InventoryItemId = $location.search().Id;
                _apppost($http,
                    {
                        url: api_url + $scope.config.api_base + 'Edit',
                        model: m,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.model = {};
                            $scope.cancel();
                            $scope.parent.sendEvent();
                            console.log($scope);
                        },
                        eresp: function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        }
                    });
            }
        };

        $scope.GetInventoryLocationList = function () {
            _appget($http,
                {
                    url: api_url + '/api/InventoryLocation/GetAll',
                    resp: function (response) { $scope.InventoryLocationList = response.data.Result; }
                });
        };
        $scope.GetInventoryLocationList();

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
        { view: 'Inventory Location' },
        {view: 'Unit'},
        { view: 'Quantity' },
        { view: 'Minimum Stock Level' },
    ],
    tdList: [

        {
            view:
                `{{m.InventoryLocation.Name}}`
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
                '<div><br><label><b>INVENTORY LOCATION</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.InventoryLocationId">' +
                '<option ng-value="model.InventoryLocationId" >' +
                '{{ model.InventoryLocation.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.InventoryLocationId", apply: 'model.InventoryLocation' },
            filter: { field: "InventoryLocationId", url: '/api/InventoryLocation/_postGetUIFiltered/', apply: 'InventoryLocation', name: 'Name' },
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

    EntityName: 'Inventory Items',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'vendor_to_inventory_item_map' },
        { config: _config2, tab: 'product_to_inventory_item_map' },
        { config: _config3, tab: 'inventory_location_stock' },    ],
    tabList: [
        { text: 'Vendors ', id: 'vendor_to_inventory_item_map' },
        { text: 'Products', id: 'product_to_inventory_item_map' },
        { text: 'Stocks', id: 'inventory_location_stock' },
    ],
    onscreenAdd: false,
    cols: 3,
    backbutton: {
        url: '/InventoryItem/index'
    },
    actionlist: [],
    fieldList: [
        {
             view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
             view: setUIFields('model', 'number', { label: 'Base Price', value: 'BasePrice' }), weight: 2
        },

         {
             view: setUIFields('model', 'dropdown', {
                    label: 'Unit', value: 'UnitId',
                    list: 'UnitList', optid: 'Id', optlabel: ['Name']
                }), weight: 2

         },
         {
             view: setUIFields('model', 'dropdown', {
                    label: 'Tax Code', value: 'TaxCodeId',
                    list: 'TaxCodeList', optid: 'Id',
                    optlabel: ['Name']
                }), weight: 2
         },
    ],
    api_base: '/api/InventoryItem/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');

