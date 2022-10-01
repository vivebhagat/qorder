
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {




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
   
};



var config =
{

    EntityName: 'Payments',
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
        { view: 'Order' },
        { view: 'Payment Method' },
        { view: 'Amount' },
        { view: 'Payment On' },
        { view: 'Currency' },
    
    ],
    tdList: [
        {
            view: '{{m.Order.Id}}'
        },
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
            view:
                '<div><br><label><b>ORDER</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.OrderId">' +
                '<option ng-value="model.OrderId" >' +
                '{{ model.Order.Id}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.OrderId", apply: 'model.Order' },
            filter: { field: "OrderId", url: '/api/Order/_postGetUIFiltered/', apply: 'Order', name: 'Id' },
            btnLikeDisable: false, weight: 2
        },
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
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/Payment/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
