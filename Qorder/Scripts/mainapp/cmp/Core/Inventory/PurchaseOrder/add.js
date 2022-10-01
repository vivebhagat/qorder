
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


    $scope.GetVendorList = function () {
        _appget($http,
            {
                url: api_url + '/api/Vendor/GetAll',
                resp: function (response) { $scope.VendorList = response.data.Result; }
            });
    };
    $scope.GetVendorList();


};

var config =
{
    EntityName: 'Purchase Orders',
    Mainctrl: Mainctrl,
    cols: 2,
    backbutton: {
        url: '/PurchaseOrder/Index'
    },
    editurl: '/PurchaseOrder/edit/?Id=',
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
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');