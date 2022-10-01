
(function (app) {

    app.component('panel', {


        controller: function ($scope, $http, $rootScope, authService, defaultService) {

            $scope.config = {
                inlineEdit: true
            };

            $scope.GetAll = function () {
                _appget($http,
                    {
                        url:'/api/accountdomain/getall',
                        resp: function (response) { $scope.MainList = response.data; }
                    });
            };

            $scope.Edit = function (m) {
                _apppost($http,
                    {
                        url: '/api/accountdomain/edit',
                        model: m,
                        resp: function (response) { $scope.GetAll(); }
                    });
            };

            $scope.Add = function (m) {

                _apppost($http, {
                    url: '/api/accountdomain/add',
                    model :m,
                    resp:function (response) {
                        $scope.GetAll();
                        $scope.new = {};
                    }});
            };

            this.$onInit = () => {
                $scope.base_url = $rootScope.base_url = base_url;
                $scope.defaultService = $rootScope.defaultService = defaultService;
                $scope.defaultService.SetUserData($rootScope);
                $rootScope.authService = authService;
                $scope.GetAll();
            };
        },
        templateUrl: base_url + page_url
    });
})(app);