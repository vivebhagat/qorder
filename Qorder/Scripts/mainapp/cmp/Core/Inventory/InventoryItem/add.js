
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

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

var config =
{
    EntityName: 'Inventory Items',
    Mainctrl: Mainctrl,
    cols: 1,
    backbutton: {
        url: '/InventoryItem/Index'
    },
    editurl: '/InventoryItem/edit/?Id=',
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
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');