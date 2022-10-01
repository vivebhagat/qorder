
var FilterDialogScope = function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile) {

    $scope.showFilter = function (ev, _model) {
        var parent_scope = $scope;
        $mdDialog.show({
            controller: function ($scope, $mdDialog, $http) {
                $scope.parent = parent_scope;
                $scope.ResetMessages = function () {
                    $scope.DefaultMessage = new _message();
                };
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();

                };

                $scope.Search = function () {

                    $scope.filter.PageIndex = 1;

                    $scope.loadOptionList();
                };

                $scope.range = function (size, count) {
                    var ret = [];

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

                    return ret;
                };

                $scope.setPage = function () {
                    $scope.filter.PageIndex = this.n + 1;

                    $scope.loadOptionList();
                };

                $scope.filter = { PageSize: 100, PageIndex: 1 };

                $scope.select = function () {
                    $scope.parent.model[$scope._model.filter.apply] = $scope.selected;
                    $scope.parent.model[$scope._model.filter.field] = $scope.selected.Id;
                    $mdDialog.cancel();
                };
                $scope.loadOptionList = function () {
                    if ($scope._model.filter_list) {

                        _appget($http,
                            {
                                url: api_url + $scope._model.filter.url + '&s=' + $scope.filter.PageSize + '&n=' + $scope.filter.PageIndex,
                                resp:function (response) {
                                    $scope.OptionList = response.data.Result;
                                    $scope.Count = response.data.Result.Count;
                            }}
                        );
                    }
                    else {
                        _appput($http,
                            {
                                url:api_url + $scope._model.filter.url + 'value=' + $scope.value + '&s=' + $scope.filter.PageSize + '&n=' + $scope.filter.PageIndex,
                                model :{},
                                resp:function (response) {
                                    $scope.OptionList = response.data.Result.Result;
                                    $scope.Count = response.data.Result.Count;
                                }}
                        );
                    }

                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };

                this.$onInit = () => {
                    $scope._model = _model;
                    $scope.ResetMessages();
                    $scope.loadOptionList();

                };

            },
            templateUrl: $scope.base_url + '/scripts/app/cmp/subcomponents/filter/filter.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen
        }).then(function (answer) {
        }, function () {
        });
    };
};
