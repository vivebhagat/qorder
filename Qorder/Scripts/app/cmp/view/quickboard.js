
(function (app) {

    app.component('quickBoard', {
        controller: function ($scope, $rootScope, $http,  defaultService) {

            $scope.ResetMessages = function () {
                $scope.DefaultMessage = new _message();
            };

            $scope.GetDashboardComponents = function () {
                _appget($http,
                    {
                        url: api_url + '/api/Dashboard/GetComponentForDahsboard/?Id=' + $scope.qid,
                        resp: function (response) {
                            $scope.CompList = response.data.Result;
                            for (i = 0; i < $scope.CompList.length; i++) {
                                $scope.GetUIObject(i);
                            }
                        },
                        eresp: function (response) { $scope.ErrorMessage = response.data.ErrorMessage; }
                    });
            };

            $scope.GetUIObject = function (n) {
                _appget($http,
                    {
                        url:api_url + '/api/Dashboard/GetUIObject/?Id=' + $scope.CompList[n].Id,
                        resp:function (response) {
                            $scope.CompList[n].UI = {};
                            $scope.CompList[n].UI = response.data.Result;
                        },
                        eresp:function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        }
                    }
                );
            };

            $scope.GetQuickDashboard = function () {
                _appget($http,
                    {
                        url:api_url + '/api/Dashboard/GetQuickDashboard',
                        resp:function (response) {
                            $scope.qid = response.data.Result.Id;
                            $scope.GetDashboardComponents();
                        },
                        eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                    }
                );
            };

            this.$onInit = () => {
                $scope.base_url = $rootScope.base_url = base_url;
                $scope.ResetMessages();
                $scope.GetQuickDashboard();
                $scope.defaultService = defaultService;
                $scope.defaultService.SetUserData($rootScope);
                $scope.defaultService.SetMainMenu();
                init();
            };
        },
        templateUrl: base_url + "/Scripts/app/cmp/view/quickboard.html"
    });
})(app);