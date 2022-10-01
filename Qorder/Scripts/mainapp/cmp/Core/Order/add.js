
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

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

var config =
{
    EntityName: 'Orders',
    Mainctrl: Mainctrl,
    cols: 2,
    backbutton: {
        url: '/Order/Index'
    },
    editurl: '/Order/edit/?Id=',
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
            filter: { field: "BookingId", url: '/api/Booking/_postGetUIFiltered/', apply: 'BookingId', name: 'Id' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Total Exc. Tax', value: 'TotalWithoutTax' }), weight: 2
        },

        {
            view: setUIFields('model', 'text', { label: 'Total Inc. Tax', value: 'TotalWithTax' }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Discount', value: 'Discount' }), weight: 2
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
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');