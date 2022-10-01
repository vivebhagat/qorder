
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.$on('getEvent', function (event, data) {
        $scope.Get();
    });


    $scope.GetVendorList = function () {
        _appget($http,
            {
                url: api_url + '/api/Vendor/GetAll',
                resp: function (response) { $scope.VendorList = response.data.Result; }
            });
    };
    $scope.GetVendorList();
};




var _config1 =
{

    EntityName: 'Inventory Items',
    onscreenAdd: true,
    showPrint:true,
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
                    url: api_url + '/api/PurchaseOrdersInventoryitem/GetPurchaseOrdersInventoryItemForPurchaseOrder/?Id=' + $location.search().Id,
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
                m.PurchaseOrderId = $location.search().Id;
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
                m.PurchaseOrderId = $location.search().Id;
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


        $scope.GetPurchaseOrderList = function () {
            _appget($http,
                {
                    url: api_url + '/api/PurchaseOrder/GetAll',
                    resp: function (response) { $scope.PurchaseOrderList = response.data.Result; }
                });
        };
        $scope.GetPurchaseOrderList();

        $scope.GetInventoryItemList = function () {
            _appget($http,
                {
                    url: api_url + '/api/InventoryItem/GetAll',
                    resp: function (response) { $scope.InventoryItemList = response.data.Result; }
                });
        };
        $scope.GetInventoryItemList();

        $scope.GetTaxCodeList = function () {
            _appget($http,
                {
                    url: api_url + '/api/TaxCode/GetAll',
                    resp: function (response) { $scope.TaxCodeList = response.data.Result; }
                });
        };
        $scope.GetTaxCodeList();

 
        $scope.GetItemPrice = function (Id) {
            alert("Clicked");
            $scope.Total = 'BasePrice: ' + $scope.InventoryItem.BasePrice;

            _appget($http,
                {
                url: api_url + '/api/PurchaseOrdersInventoryItem/GetPurchaseOrdersInventoryItemForPurchaseOrder/?Id=' ,
                function () { },
                function(response) { $scope.PurchaseOrdersInventoryItemList = response.data.Result; },
                });
        };
 



    },
    actionlist: [],
    thList: [
        { view: 'Inventory Items' },
        { view: 'Price' },
        { view: 'Unit' },
        { view: 'Quantity' },
        { view: 'Tax Code' },
        { view: 'Total' },
    ],
    tdList: [


        {
            view:
                `{{m.InventoryItem.Name}}`
        },
        {
            view:
                `{{m.Price}}`
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
                `{{m.TaxCode.Name}}`
        },
        {
            view:
                `{{m.Total}}`
        },

    ],
    fieldList: [[
        {
            view:
                '<div><br><label><b>INVENTORY ITEM</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-change="GetItemPrice(Model.InventoryItemId)" ng-model="model.InventoryItemId">' +
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
            view: setUIFields('model', 'number', { label: 'Quantity', value: 'Quantity' }), weight: 2
        },
        {
            view: '</br><lable><b>UNIT</b></lable></br>{{model.InventoryItem.Unit.Name}}', weight: 2

        },
        {
            view: '</br><lable><b>Tax Code</b></lable></br>{{model.InventoryItem.TaxCode.Name}}', weight: 2

        },
        {
            view: '</br><lable><b>TOTAL</b></lable></br>{{model.Total}}', weight: 2

        },
   
    ]],
    api_base: '/api/PurchaseOrdersInventoryItem/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};


var config =
{

    EntityName: 'Purchase Orders',
    Editctrl: Editctrl,
    showPrint: true,
    childListConfigs: [
        { config: _config1, tab: 'purchase_orders_inventory_item' },],
    tabList: [
        { text: 'Inventory Items', id: 'purchase_orders_inventory_item' },
    ],
    onscreenAdd: false,
    cols: 3,
    backbutton: {
        url: '/PurchaseOrder/index'
    },
    actionlist: [],
    fieldList: [
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
            view: setUIFields('model', 'date', { label: 'Date', value: 'Date' }), weight: 2
        },
        {
            view: `<br/><label><b>TOTAL EXC. TAX</b></label><br/><label>{{ model.TotalWithoutTax }}<label>`, weight: 2
        },
        {
            view: `<br/><label><b>TOTAL INC. TAX</b></label><br/><label>{{ model.TotalWithTax }}<label>`, weight: 2
        },

    ],
    api_base: '/api/PurchaseOrder/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');

