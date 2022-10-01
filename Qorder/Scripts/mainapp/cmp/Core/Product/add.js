
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

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

var config =
{
  
    EntityName: 'Products',
    Mainctrl: Mainctrl,
    cols: 2,
    backbutton: {
        url: '/Product/Index'
    },
    editurl: '/Product/edit/?Id=',
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
                list: 'TaxCodeList', optid: 'Id',
                optlabel: ['Name']
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
            view: setUIFields('model', 'text', { label: 'Url', value: 'Url' }), weight: 11
        },
        {
            view: setUIFields('model', 'textarea', { label: 'Description', value: 'Description' }), weight: 11
        },

    ],
    api_base: '/api/Product/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');