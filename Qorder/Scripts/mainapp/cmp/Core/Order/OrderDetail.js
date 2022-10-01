var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


    $scope.GetList = function () {
        _appget($http,
            {
                url: api_url + '/api/Order/GetOrderDetail/?Id=' + $location.search().Id,
                resp: function (response) {
                    $scope.MainList = response.data.Result;
                }
            });
    };

    $scope.$on('getEvent', function (event, data) {
        $scope.Get();
    });

    $scope.GetCounterList = function () {
        _appget($http,
            {
                url: api_url + '/api/Counter/GetAll',
                resp: function (response) { $scope.CounterList = response.data.Result; }
            });
    };
    $scope.GetCounterList();

    $scope.GetOrderedByList = function () {
        _appget($http,
            {
                url: api_url + '/api/BusinessUser/GetAll',
                resp: function (response) { $scope.OrderedByList = response.data.Result; }
            });
    };
    $scope.GetOrderedByList();


    $scope.GetOrderStatusList = function () {
        _appget($http,
            {
                url: api_url + '/api/OrderStatus/GetAll',
                resp: function (response) { $scope.OrderStatusList = response.data.Result; }
            });
    };
    $scope.GetOrderStatusList();

    $scope.GetBookingList = function () {
        _appget($http,
            {
                url: api_url + '/api/Booking/GetAll',
                resp: function (response) { $scope.BookingList = response.data.Result; }
            });
    };
    $scope.GetBookingList();


    $scope.GetServiceLocationList = function () {
        _appget($http,
            {
                url: api_url + '/api/ServiceLocation/GetAll',
                resp: function (response) { $scope.ServiceLocationList = response.data.Result; }
            });
    };
    $scope.GetServiceLocationList();

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

    $scope.GetOrderedByList = function () {
        _appget($http,
            {
                url: api_url + '/api/BusinessUser/GetAll',
                resp: function (response) { $scope.OrderedByList = response.data.Result; }
            });
    };
    $scope.GetOrderedByList();


    $scope.GetOrderStatusList = function () {
        _appget($http,
            {
                url: api_url + '/api/OrderStatus/GetAll',
                resp: function (response) { $scope.OrderStatusList = response.data.Result; }
            });
    };
    $scope.GetOrderStatusList();

    $scope.GetBookingList = function () {
        _appget($http,
            {
                url: api_url + '/api/Booking/GetAll',
                resp: function (response) { $scope.BookingList = response.data.Result; }
            });
    };
    $scope.GetBookingList();

    $scope.GetServiceLocationList = function () {
        _appget($http,
            {
                url: api_url + '/api/ServiceLocation/GetAll',
                resp: function (response) { $scope.ServiceLocationList = response.data.Result; }
            });
    };
    $scope.GetServiceLocationList();


};


var _config1 =
{

    EntityName: 'Order Items',
    onscreenAdd: true,
    onscreenEdit: true,
    use_filter: false,
    popupEdit: false,
    enableDelete: true,
    filterFieldList: [],
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.GetList = function () {
            _appget($http,
                {
                    url: api_url + '/api/OrderProduct/GetOrderProductForOrder/?Id=' + $location.search().Id,
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
                m.OrderId = $location.search().Id;
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
                m.OrderId = $location.search().Id;
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

        $scope.GetOrderList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Order/GetAll',
                    resp: function (response) { $scope.OrderList = response.data.Result; }
                });
        };
        $scope.GetOrderList();
        $scope.GetProductList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Product/GetAll',
                    resp: function (response) { $scope.ProductList = response.data.Result; }
                });
        };
        $scope.GetProductList();

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
        { view: 'Product' },
        // { view: 'IsMapped' },
        { view: 'Current Amount' },
        { view: 'Quantity' },
        { view: 'Tax Code' },
        { view: 'Discount' },
        { view: 'Total' },

    ],
    tdList: [

        {
            view:
                `{{m.Product.Name}}`
        },
        /*{
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsMapped">`
        },*/
        {
            view:
                `{{m.CurrentAmount}}`
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
                `{{m.Discount}}`
        },
        {
            view:
                `{{m.Total}}`
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
    api_base: '/api/OrderProduct/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var _config2 =
{
    EntityName: 'Payments',
    onscreenAdd: true,
    onscreenEdit: true,
    use_filter: false,
    popupEdit: false,
    enableDelete: true,
    filterFieldList: [],
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.GetList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Payment/GetPaymentForOrder/?Id=' + $location.search().Id,
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
                m.OrderId = $location.search().Id;
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
                m.OrderId = $location.search().Id;
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

        $scope.GetPaymentMethodList = function () {
            _appget($http,
                {
                    url: api_url + '/api/PaymentMethod/GetAll',
                    resp: function (response) { $scope.PaymentMethodList = response.data.Result; }
                });
        };
        $scope.GetPaymentMethodList();

        $scope.GetCurrencyList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Currency/GetAll',
                    resp: function (response) { $scope.CurrencyList = response.data.Result; }
                });
        };
        $scope.GetCurrencyList();

        $scope.GetOrderList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Order/GetAll',
                    resp: function (response) { $scope.OrderList = response.data.Result; }
                });
        };
        $scope.GetOrderList();



    },
    actionlist: [],
    thList: [
        { view: 'Payment Method' },
        { view: 'Amount' },
        { view: 'Payment On' },
        { view: 'Currency' },

    ],
    tdList: [
        {
            view: '{{m.PaymentMethod.Name}}'
        },
        {
            view: '{{m.Amount}}'
        },
        {
            view:
                `{{m.PaymentOn}}`
        },
        {
            view:
                `{{m.Currency.Name}}`
        },

    ],
    fieldList: [[

        {
            view: setUIFields('model', 'dropdown', {
                label: 'Payment method', value: 'PaymentMethodId',
                list: 'PaymentMethodList', optid: 'Id', optlabel: ['Name']
            }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Amount', value: 'Amount' }), weight: 2
        },
        {
            view: setUIFields('model', 'dateonly', { label: 'Payment On', value: 'PaymentOn' }), weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Currency', value: 'CurrencyId',
                list: 'CurrencyList', optid: 'Id', optlabel: ['Name']
            }), weight: 2
        }]
    ],
    api_base: '/api/Payment/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var config =
{

    EntityName: 'Orders',
    Editctrl: Editctrl,
    showPrint: true,
    childListConfigs: [
        { config: _config1, tab: 'order_product' },
        { config: _config2, tab: 'payment' },],
    tabList: [
        { text: 'Order Items', id: 'order_product' },
        { text: 'Payments', id: 'payment' },
    ],
    onscreenAdd: false,
    cols: 3,
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'dateonly', { label: 'Date', value: 'Date' }), weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Order Status', value: 'OrderStatusId',
                list: 'OrderStatusList', optid: 'Id', optlabel: ['Name']
            }), weight: 2

        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Counter', value: 'CounterId',
                list: 'CounterList', optid: 'Id', optlabel: ['Name']
            }), weight: 2

        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Table', value: 'ServiceLocationId',
                list: 'ServiceLocationList', optid: 'Id', optlabel: ['Name']
            }), weight: 2

        },
        /* {
             view:
                 '<div><br><label><b>ORDERED BY</b></label>' +
                 '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.OrderedById">' +
                 '<option ng-value="model.OrderedById" >' +
                 '{{ model.OrderedBy.FirstName +" "+ model.OrderedBy.LastName}}' +
                 '</option>' +
                 '</select></div></div></div>',
             apply_filter_list: true,
             load: { field: "model.OrderedById", apply: 'model.OrderedBy' },
             filter: { field: "OrderedById", url: '/api/BusinessUser/_postGetUIFiltered/', apply: 'OrderedBy', name: 'FirstName' },
             btnLikeDisable: false, weight: 2
         },*/
        {
            view:
                '<div><br><label><b>BOOKING</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.BookingId">' +
                '<option ng-value="model.BookingId" >' +
                '{{ model.Booking.Id}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.BookingId", apply: 'model.Booking' },
            filter: { field: "BookingId", url: '/api/Booking/_postGetUIFiltered/', apply: 'Booking', name: 'Id' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: `<br/><label><b>TOTAL EXC. TAX</b></label><br/><label>{{ model.TotalWithoutTax }}<label>`, weight: 2
        },
        {
            view: `<br/><label><b>TOTAL INC. TAX</b></label><br/><label>{{ model.TotalWithTax }}<label>`, weight: 2
        },
        {
            view: `<br/><label><b>DISCOUNT</b></label><br/><label>{{ model.Discount }}<label>`, weight: 2
        },
        /*  {
              view: setUIFields('model', 'checkbox', { label: 'Complete', value: 'IsComplete' }), weight: 2
          },
          {
              view: setUIFields('model', 'checkbox', { label: 'Cancelled', value: 'IsCancelled' }), weight: 2
          },*/
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'AltName' }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Contact', value: 'AltContact' }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Email', value: 'AltEmail' }), weight: 2
        }],
    api_base: '/api/Order/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');
