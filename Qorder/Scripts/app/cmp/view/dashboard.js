

(function (app) {

    app.component('dashboard', {
        controller: function ($scope, $rootScope, $http, defaultService, authService) {

            $scope.GetAll = function () {
                _appget($http,
                    {
                        url: api_url + '/api/Dashboard/GetAll',
                        resp: function (response) { $scope.List = response.data.Result; }
                    }
                );
            };

            this.$onInit = () => {
                $rootScope.base_url = $scope.base_url = base_url;
                $rootScope.defaultService = $scope.defaultService = defaultService;
                $scope.defaultService.SetUserData($rootScope);
                $scope.defaultService.SetMainMenu();
                $rootScope.authService = authService;
                $scope.GetAll();
            };

            $scope.range = function (size, count) {
                var ret = [];
                console.log(size, count);

                for (var i = 0; i < size / count; i++) {
                    if (i - $scope.filter.PageIndex > 5) {
                        break;
                    }
                    else {
                        if ($scope.filter.PageIndex - i < 5) {
                            ret.push(i);
                        }
                    }
                }
                console.log(ret);
                return ret;
            };



            $scope.setPage = function () {
                $scope.filter.PageIndex = this.n;
                $scope.FilterAssets();
            };
        },
        templateUrl: base_url + _sfconstant.default_list_template_path
    });
});


var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.GetOptionList = function () {
        _appget($http,
            {
                url: api_url + '/api/Category/GetAll',
                resp: function (response) { $scope.ParentOptionList = response.data.Result; }
            });
    };
    $scope.GetOptionList();
};



var config =
{
    View:
    {
        Entity: 'Dashboard'
    },
    AddCtrl: AddCtrl,
    onscreenAdd: true,
    inlineEdit: false,
    activable: true,
    addbutton: {
        url: '/Home/DashboardAdd'
    },
    actionlist: [{
            url: '/Home/setup/?Id={Id}', Text: 'Setup'
        },{
            url: '/Home/DashboardView/?Id={Id}',Text : 'View'
           }],
    filterFieldList: [],
    thList: [
        { view: 'Name' }
    ],
    tdList: [        
        {
            view: '{{m.Name}}'
        }
    ],
    fieldList: [{
        view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }) 
            
    },
    {
        view: setUIFields('model', 'checkbox', { label: 'Inactive', value: 'Inactive' })              
    }
    ],
    use_filter: true,
    onscreenEdit: true,
    api_base: '/api/Dashboard/',
    template_url: _sfconstant.default_list_template_path
};

commonListSetup(app, config, 'dashboard');