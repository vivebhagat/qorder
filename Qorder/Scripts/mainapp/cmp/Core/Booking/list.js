
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



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
    EntityName: 'Bookings',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: false,
    onPageAdd:true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Booking/Add'
    },
    actionlist: [{ url: '/Booking/Edit/?Id={Id}', Text: 'Edit' },],
    filterFieldList: [],
    thList: [
        { view: 'Start Time' },
        { view: 'End Time' },
        { view: 'Service Location' },
        { view: 'Customer' },
    ],
    tdList: [
        {
            view: '{{m.StartTime}}'
        },
        {
            view: '{{m.EndTime}}'
        },
        {
            view: '{{m.ServiceLocation.Name}}'
        },
        {
            view: '{{m.Customer.FirstName +" "+ m.Customer.LastName}}'
        },

    ],
    fieldList: [
        {
            view: setUIFields('model', 'timeonly', { label: 'Start Time', value: 'StartTime' }), weight:2
        },
        {
            view: setUIFields('model', 'timeonly', { label: 'End Time', value: 'EndTime' }), weight: 2
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
            filter: { field: "CustomerId", url: '/api/BusinessUser/_postGetUIFiltered/', apply: 'Customer', name: 'FirstName' },
            btnLikeDisable: false, weight: 2
        },
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/Booking/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
