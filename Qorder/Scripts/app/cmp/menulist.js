

var commonMenuSetup = function (app, main_config, tag, parent) {

    app.component(tag, {
        controller: function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile, $window) {

            setupHistory(config, $scope, $window, $location);


            $scope.GetList = function () {
                _appget($http, { url:api_url +  '/api/menu/getforparent/?Id='+$location.search().Id,
                    resp:function (response) { $scope.MainList = response.data.Result; }}
                );
            };


            $scope.init = function (main_config) {
                $scope.config = main_config;
                $scope.base_url = base_url;
                $rootScope.base_url = base_url;
                $scope.dateOpts = appSettings.dateOpts;
                $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
                $scope.timeOnlyOpts = appSettings.timeOnlyOpts;
                $scope.ResetMessages();

                $scope.defaultService = defaultService;
                $rootScope.defaultService = defaultService;
                $rootScope.authService = authService;
                $scope.defaultService.SetUserData($rootScope);
                $scope.UIData = defaultService.GetUIData();


                if (typeof config.Mainctrl !== 'undefined') {
                    config.Mainctrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
                }
                $scope.GetList();

            };

            this.$onInit = () => {
                $scope.init(main_config);
            };

        },
        templateUrl: base_url + config.template_url
    });
};