
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

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

    $scope.Edit = function (m) {
        _apppost($http, {
            url: api_url + '/api/IntUser/UpdateLoginData',
            model:m,
            resp: function (response) {
                $scope.Get();
            }
        });
    };

    $scope.CreateLogin = function () {
        _apppost($http, {
            url: api_url + '/api/IntUser/CreateLoginFor',
            model: $scope.model,
        });
    }
};

var config =
{


    EntityName: 'Login Data',
    Editctrl: Editctrl,
    btnList: [{ name: 'Create Login', action: 'CreateLogin' }],
    backbutton: {
        url: '/Vendor/Index'
    },
    actionlist: [],
    fieldList: [[{
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
        view: setUIFields('model', 'text', { label: 'Password', value: 'Password' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'ConfirmPassword', value: 'ConfirmPassword' }), weight: 2
    }]
    ],
    api_base: '/api/Vendor/',
    template_url: '/Scripts/app/cmp/edit.html'
};

commonEditConfig(app, config, 'edit');
