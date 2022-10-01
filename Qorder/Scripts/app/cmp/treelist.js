
app.directive('initBind', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            attr.$observe('ngBindHtml', function () {
                if (attr.ngBindHtml) {
                    $compile(element[0].children)(scope);
                }
            });
        }
    };
});

app.component('treeNode', {
    bindings: {
        input: '=',
        parent: '='
    },
    controller: function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile, $window) {

        $scope.expanded = false;
        $scope.MainList = [];
        $scope.parent_link = '';
        $scope.GetList = function () {
            if ($scope.expanded) {
                $scope.MainList = [];
                $scope.expanded = false;
            }
            else {
                _get($http, api_url + '/api/AuthIntUI/ListDirectory/?Path=' + $scope.parent_link.value + $scope.model.Item2,
                       function () { },
                       function (response) { $scope.MainList = response.data; $scope.expanded = true; },
                       function (response) { },
                       function (response) { }
                   );
            }
        };

        this.$onInit = () => {
            $scope.base_url = $rootScope.base_url= base_url;
            var self = this;
            $scope.model = self.input;
            $scope.parent_link = self.parent;
            $scope.dateOpts = appSettings.dateOpts;
            $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
            $scope.timeOnlyOpts = appSettings.timeOnlyOpts;
            //  $scope.ResetMessages();

            $scope.defaultService = $rootScope.defaultService = defaultService;
            $rootScope.authService = authService;
            $scope.defaultService.SetUserData($rootScope);
            $scope.UIData = defaultService.GetUIData();
        };

    },
    template: `<svg ng-show="model.Item1=='D'"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder align-middle me-2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        <svg ng-show="model.Item1=='F'"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class ="feather feather-file align-middle me-2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
        <span ng-click="GetList();" ng-show="model.Item1=='D'">
        <svg ng-show="!expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class ="feather feather-plus-square align-middle me-2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        <svg ng-show="expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class ="feather feather-minus-square align-middle me-2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        </span>
        <div style="margin-left:20px;">
        <div ng-repeat="node in MainList">
        <span ng-show="node.Item1=='D'" >{{node.Item2}}</span>
        <a ng-show="node.Item1=='F'" target="_blank" href="/custompage/pageedit/?path={{parent_link.value+model.Item2 +node.Item2}}">{{node.Item2}} </a>
        <tree-node input="node" parent="{value: parent_link.value+model.Item2}" ></tree-node></div>
        </div>`

});


var commonTreeSetup = function (app, main_config, tag, parent) {

    app.component(tag, {
        controller: function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile, $window) {

            $scope.model = { Item1: 'D', Item2: '/' };
            $scope.Path = '/';
            $scope.SetPath = function () {
                $scope.model.Item2 = $scope.Path;
            };

            $scope.init = function (main_config) {
                $scope.config = main_config;
                $scope.base_url = $rootScope.base_url = base_url;
                $scope.dateOpts = appSettings.dateOpts;
                $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
                $scope.timeOnlyOpts = appSettings.timeOnlyOpts;
                $scope.ResetMessages();

                $scope.defaultService = $rootScope.defaultService = defaultService;
                $rootScope.authService = authService;
                $scope.defaultService.SetUserData($rootScope);
                $scope.UIData = defaultService.GetUIData();

            };

        },
        template: `<div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Server Storage </h5>
                    </div>
                <div class ="card-body">
                <div ><b>Directory </b><input ng-model="Path"  ><button class="btn btn-sm btn-primary" ng-click="SetPath()">Set Path</button></div>
                        <br> {{model.Item2}}  <tree-node input="model" parent="{value:'/'}"></tree-node>
                        </div>
                        </div>
            `
    });
};

commonTreeSetup(app, {}, 'tree', null);