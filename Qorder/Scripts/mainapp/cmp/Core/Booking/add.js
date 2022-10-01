
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.GetServiceLocationList = function () {
        _appget($http,
            {
                url: api_url + '/api/ServiceLocation/GetAll',
                resp: function (response) { $scope.ServiceLocationList = response.data.Result; }
            });
    };
    $scope.GetServiceLocationList();

    $scope.GetCustomerList = function () {
        _appget($http,
            {
                url: api_url + '/api/Customer/GetAll',
                resp: function (response) { $scope.CustomerList = response.data.Result; }
            });
    };
    $scope.GetCustomerList();

};

var config =
{

    EntityName: 'Booking',
    Mainctrl: Mainctrl,
    cols: 1,
    backbutton: {
        url: '/Booking/Index'
    },
    editurl: '/Booking/edit/?Id=',
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'dateonly', { label: 'Start Time', value: 'StartTime' }), weight: 2
        },
        {
            view: setUIFields('model', 'dateonly', { label: 'End Time', value: 'EndTime' }), weight: 2
        },
        {
            view:
                '<div><br><label><b>SERVICE LOCATION</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.ServiceLocationId">' +
                '<option ng-value="model.ServiceLocationId" >' +
                '{{ model.ServiceLocation.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.ServiceLocationId", apply: 'model.ServiceLocation' },
            filter: { field: "ServiceLocationId", url: '/api/ServiceLocation/_postGetUIFiltered/', apply: 'ServiceLocation', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view:
                '<div><br><label><b>CUSTOMER</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.CustomerId">' +
                '<option ng-value="model.CustomerId" >' +
                '{{ model.Customer.FirstName +" "+ model.Customer.LastName}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.CustomerId", apply: 'model.Customer' },
            filter: { field: "CustomerId", url: '/api/Customer/_postGetUIFiltered/', apply: 'Customer', name: 'FirstName' },
            btnLikeDisable: false, weight: 2
        },
    ],
    api_base: '/api/Booking/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'add');