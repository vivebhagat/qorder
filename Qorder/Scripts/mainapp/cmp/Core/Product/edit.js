
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.dateOpts = appSettings.dateOpts;
    console.log($scope.dateOpts);
    $scope.$on('getEvent', function (event, data) {
        $scope.Get();
    });




    $scope.GetOrganizationList = function () {
        _appget($http,
            {
                url: api_url + '/api/Organization/GetAll',
                resp: function (response) { $scope.OrganizationList = response.data.Result; }
            });
    };
    $scope.GetOrganizationList();

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
    EntityName: 'Categories',
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
                    url: api_url + '/api/ProductCategory/GetProductCategoryForProducts/?Id=' + $location.search().Id,
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
                m.ProductId = $location.search().Id;
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
                m.ProductId = $location.search().Id;
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

    },
    actionlist: [],
    thList: [
        { view: 'Category' },
        // { view: 'Is Mapped' },
    ],
    tdList: [
        {
            view: '{{m.Category.Name}}'
        },
        /*{
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsMapped">`
        },*/

    ],
    fieldList: [[

        {
            view:
                '<div><br><label>CATEGORY</label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.CategoryId">' +
                '<option ng-value="model.CategoryId" >' +
                '{{ model.Category.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.CategoryId", apply: 'model.Category' },
            filter: { field: "CategoryId", url: '/api/Category/_postGetUIFiltered/', apply: 'Category', name: 'Name' },
            btnLikeDisable: false, weight: 2
        }
      /*  {
            view: setUIFields('model', 'checkbox', { label: 'Is Mapped', value: 'IsMapped' }), weight: 2
        },*/
    ]],
    api_base: '/api/ProductCategory/',
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
    addbutton: {
        url: '/Category/Add'
    },
    filterFieldList: [],
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
        $scope.GetList = function () {
            _appget($http,
                {
                    url: api_url + '/api/ProductToKitchenProductMap/GetProductToKitchenProductMapForProducts/?Id=' + $location.search().Id,
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
                m.ProductId = $location.search().Id;
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
                m.ProductId = $location.search().Id;
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


        $scope.GetProductList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Product/GetAll',
                    resp: function (response) { $scope.ProductList = response.data.Result; }
                });
        };
        $scope.GetProductList();

        $scope.GetKitchenProductList = function () {
            _appget($http,
                {
                    url: api_url + '/api/KitchenProduct/GetAll',
                    resp: function (response) { $scope.KitchenProductList = response.data.Result; }
                });
        };
        $scope.GetKitchenProductList();
    },
    actionlist: [],
    thList: [
        { view: 'Kitchen Product' },
        { view: 'Time To Process' },
    ],
    tdList: [
        {
            view:
                `{{m.KitchenProduct.Name}}`
        },
        {
            view:
                `{{m.KitchenProduct.TimeToProcess}}`
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
    api_base: '/api/ProductToKitchenProductMap/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var _config3 =
{
   EntityName: 'Process Booths',
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
                    url: api_url + '/api/ProductToProcessBoothMap/GetProductToProcessBoothMapForProducts/?Id=' + $location.search().Id,
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
                m.ProductId = $location.search().Id;
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
                m.ProductId = $location.search().Id;
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
    },

    actionlist: [],
    thList: [
        { view: 'Process Booth' },
    ],
    tdList: [
        {
            view:
                `{{m.ProcessBooth.Name}}`
        },

    ],
    fieldList: [[
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Process Booth', value: 'ProcessBoothId',
                list: 'ProcessBoothList', optid: 'Id', optlabel: ['Name']
            }), weight: 2
        }]
    ],
    api_base: '/api/ProductToProcessBoothMap/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var _config4 =
{
    EntityName: "Variations",
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
                    url: api_url + '/api/ProductVariation/GetProductVariationForProducts/?Id=' + $location.search().Id,
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
                m.ProductId = $location.search().Id;
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
                m.ProductId = $location.search().Id;
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

    },
    actionlist: [],
    thList: [   
        { view: 'Variations' },
    ],
    tdList: [
        {
            view: '{{m.Variation.Name}}'
        },

    ],
    fieldList: [[
        {
            view:
                '<div><br><label>Variation</label>' +
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
    api_base: '/api/ProductVariation/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var _config5 =
{

    EntityName: 'Inventory Items',
    onscreenAdd: true,
    showPrint: true,
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
                    url: api_url + '/api/ProductToInventoryItemMap/GetInventoryItemForProduct/?Id=' + $location.search().Id,
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
                m.ProductId = $location.search().Id;
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
                m.ProductId = $location.search().Id;
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


    },
    actionlist: [],
    thList: [
        { view: 'Inventory Items' },
        { view: 'Base Price' },
        { view: 'Unit' },
        { view: 'Quantity' },

    ],
    tdList: [


        {
            view: '{{m.InventoryItem.Name }}'
        },

        {
            view: '{{m.InventoryItem.BasePrice}}'

        },
        {
            view: '{{m.InventoryItem.Unit.Name}}'
        },
        {
            view:
                `{{m.Quantity}}`
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
            view: setUIFields('model', 'number', { label: 'Quantity', value: 'Quantity' }), weight: 2
        },
        {
            view: '</br><lable><b>BASE PRICE</b></lable></br>{{model.InventoryItem.BasePrice}}', weight: 2

        },
        {
            view: '</br><lable><b>UNIT</b></lable></br>{{model.InventoryItem.Unit.Name}}', weight: 2

        },
        ]],
    api_base: '/api/ProductToInventoryItemMap/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};



var config =
{

    EntityName: 'Products',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'product_category' },
        { config: _config2, tab: 'product_to_kitchen_product_map' },
        { config: _config3, tab: 'product_to_process_booth_map' },
        { config: _config4, tab: 'product_variation' },
        { config: _config5, tab: 'inventory_item' },       ],
    tabList: [
       { text: 'Categories', id: 'product_category' },
        { text: 'Kitchen Items', id: 'product_to_kitchen_product_map' },
        { text: 'Process Booths', id: 'product_to_process_booth_map' },
        { text: 'Variations', id: 'product_variation' },
        { text: 'Inventory Items', id: 'inventory_item' },

    ],
    onscreenAdd: false,
    cols: 3,
    backbutton: {
        url: '/Product/index'
    },
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Organization', value: 'OrganizationId',
                list: 'OrganizationList', optid: 'Id',
                optlabel: ['Name']
            }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Amount', value: 'Amount' }), weight: 2
        },
        {
            view: '', weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Discount', value: 'Discount' }), weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Tax Code', value: 'TaxCodeId',
                list: 'TaxCodeList',
                optid: 'Id', optlabel: ['Name']
            }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Sku', value: 'Sku' }), weight: 2
        },
        {
            view: '', weight: 2
        },
        {

            view: ` <br><label><b> IMAGE  </b> </label><br/>
                     <img src="{{model.Url}}" style="Height:150px;Width:150px"></img>`, weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'text', { label: 'Url', value: 'Url' }), weight: 11
        },
        {
            view: setUIFields('model', 'textarea', { label: 'Description', value: 'Description' }), weight: 11
        },
    ],
    api_base: '/api/Product/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};





commonEditConfig(app, config, 'edit');