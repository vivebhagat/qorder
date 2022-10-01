
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.GetOrganizationList = function () {
        _appget($http,
            {
                url: api_url + '/api/Organization/GetAll',
                resp: function (response) {
                    $scope.OrganizationList = response.data.Result;
          

                }
            });
    };
    $scope.GetOrganizationList();


    $scope.GetCountryList = function () {
        _appget($http,
            {
                url: api_url + '/api/Country/GetAll',
                resp: function (response) {
                    $scope.CountryList = response.data.Result;
     

                }
            });
    };
    $scope.GetCountryList();


    $scope.GetCurrencyList = function () {
        _appget($http,
            {
                url: api_url + '/api/Currency/GetAll',
                resp: function (response) {
                    $scope.CurrencyList = response.data.Result;
                  

                }
            });
    };
    $scope.GetCurrencyList();


};

var config =
{
   
    EntityName: 'Staffs',
    Mainctrl: Mainctrl,
    backbutton: {
        url: '/Staff/Index'
    },
    editurl: '/Staff/Edit/Id={Id}',
    actionlist: [],
    fieldList: [{
        view: setUIFields('model', 'text', { label: 'First Name', value: 'FirstName' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Last Name', value: 'LastName' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'User Name', value: 'Name' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Email', value: 'Email' }), weight: 2
    },
    {
        view: setUIFields('model', 'date', { label: 'DOB', value: 'DOB' }), weight: 2

    },
    {
        view: setUIFields('model', 'textarea', { label: 'Address1', value: 'Address1' }), weight: 2
    },
    {
        view: setUIFields('model', 'textarea', { label: 'Address2', value: 'Address2' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Country', value: 'Country' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Postcode', value: 'PostCode' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Password', value: 'Password' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'ConfirmPassword', value: 'ConfirmPassword' }), weight: 2
    },
    {
        view: setUIFields('model', 'dropdown', {
            label: 'Organization', value: 'OrgId',
            list: 'OrganizationList', optid: 'Id',
            optlabel: ['Name']
        }), weight: 2
    },
    ],
    api_base: '/api/Staff/',
    template_url: '/scripts/app/cmp/add.html'
};

commonAddConfig(app, config, 'add');
