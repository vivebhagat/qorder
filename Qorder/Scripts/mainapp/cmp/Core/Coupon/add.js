


var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.ResetMessage = function () {
        $scope.DefaultMessage = new _message();
    };
    $scope.Add = function () {
        _post($http, api_url + '/api/Coupon/Add',
            $scope.model,
            $scope.ResetMessage,
            function (response) {

                window.location = base_url + '/Coupon/Edit/?Id=' + response.data.Result;
            },
            function (response) {
                $scope.DefaultMessage = response.data.ErrorMessage;
            },
            function (response) {
            });
    };

};

var config =
{
    EntityName: 'Coupons',
    Mainctrl: Mainctrl,
    cols: 2,
    backbutton: {
        url: '/coupon/index'
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
            view: setUIFields('model', 'text', { label: 'Value', value: 'Value' }), weight: 2
        },
        {
            view: '', weight: 6
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
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'dateonly', { label: 'COUPON TIME VALIDITY', value: 'CouponTimeValidity' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'dateonly', { label: 'DISTRIBUTER TIME VALIDITY', value: 'DistributerTimeValidity' }), weight: 2
        },
        {
            view: setUIFields('model', 'textarea', { label: 'Description', value: 'Description' }), weight: 11
        },
        {
            view: '', weight: 6
        },
    ],
    api_base: '/api/Coupon/',
    template_url: "/Scripts/app/cmp/add.html"
};


commonAddConfig(app, config, 'add');