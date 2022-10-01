
(function (app) {

    app.component('panel', {
        controller: function ($scope, $rootScope, authService, defaultService) {

            this.$onInit = () => {
                $scope.base_url = $rootScope.base_url = base_url;
                $scope.defaultService = $rootScope.defaultService = defaultService;
                $scope.defaultService.SetUserData($rootScope);
                $rootScope.authService = authService;             
            };       
        },
        templateUrl: base_url + page_url
    });
})(app);