

var config = {

    View:
    {
        Entity: "Filter View"
    },
    activable: true,
    use_filter : true,
    onscreenAdd: true,
    inlineEdit: false,
    actionlist: [],
    thList: [],
    tdList: [
       
    ],
    fieldList: [
    ],
    api_base: '/api/Filter/',
    onscreenEdit: true,
    template_url : '/Scripts/app/cmp/filterlist.html'
};


(function (app, config) {

    app.component('list', {
        controller: function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService) {
            $scope.PageSizeList = [10, 25, 50];
            $scope.Entity = {};
            $scope.FilterList = [];
            $scope.Filter = {};
            $scope.filter = { PageSize: 10, PageIndex: 1 };
            var table;
            $scope._filterFieldList = [];


            $scope.Activation = function (m) {
                if (!m.Inactive) {
                    _get($http, api_url + $scope.config.api_base + 'Deactivate/?Id='+m.Id,
                        function () { },
                        function (response) { $scope.Load(); },
                        function (response) { },
                        function (response) { }
                    );
                }
                else {
                    _get($http, api_url + $scope.config.api_base + 'Activate/?Id=' + m.Id,
                        function () { },
                        function (response) { $scope.Load(); },
                        function (response) { },
                        function (response) { }
                    );
                }
            };

            $scope.showAdvanced = function (ev) {
                $scope.customFullscreen = false;

                var _fieldList = $scope.config.fieldList;
                var add_scope = $scope;
                $mdDialog.show({
                    controller: function ($scope, $mdDialog)
                    {
                        $scope.ResetMessages = function () {
                            $scope.AddDefaultMessage = new _message();
                        };

                        $scope.ResetMessages();
                        console.log(_fieldList);
                        $scope.config = add_scope.config;
                        $scope.config.fieldList = _fieldList;

                        $scope.hide = function () {
                            $mdDialog.hide();
                        };

                        $scope.cancel = function () {
                            $mdDialog.cancel();
                            add_scope.Load(); 
                        };

                        $scope.answer = function (answer) {
                            $mdDialog.hide(answer);
                        };

                        $scope.Add = function (m) {

                            if (m == null) {
                                $scope.AddDefaultMessage.ErrorMessage = _sfconstant.no_details_message;
                            }
                            else {
                                alert();
                                _post($http, api_url + $scope.config.api_base + 'Add', m,
                                    $scope.ResetMessages,
                                    function (response) {
                                        $scope.AddDefaultMessage.SuccessMessage = response.data.SuccessMessage;
                                        $scope.model = {};
                                        $scope.cancel();
                                    },
                                    function (response) { $scope.AddDefaultMessage.ErrorMessage = response.data.ErrorMessage; },
                                    function (response) { }
                                );
                            }
                        };
                        
                        this.$onInit = () => {
                            $scope.model = {};
                            $scope.config.addfieldList = [];
                            if ($scope.config.fieldList) {
                                for (i = 0; i < $scope.config.fieldList.length; i++) {
                                    $scope.config.addfieldList.push({ view: $sce.trustAsHtml($scope.config.fieldList[i].view) });;
                                    console.log($scope.config.addfieldList[i].view);
                                }
                            }
                            if (typeof AddCtrl !== 'undefined') {
                                AddCtrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
                            }
                        };

                    },
                    template: '<md-dialog aria-label="">'+
                        '<div class="x_panel" style="min-width:500px;"> '+
                        '<div class= "row x_title">' +
                        '<div class= "col-md-6">' +
                        '<h2>Add</h2>' +
                        '</div>' +
                        '<div class= "col-md-6 ">' +
                        '<button class="btn btn-sm btn-default pull-right" ng-click="cancel()">' +
                        'Close' +
                        '</button>' +
                        '</div>' +
                        '</div>' +   
                        '<div class= "x_panel" >' +
                        '<div class="row">' +
                        '<div class="col-md-12">'+
                        '<div class="alert alert-info alert-dismissible" ng-show="AddDefaultMessage.SuccessMessage!=\'\'">{{ DefaultMessage.SuccessMessage }}</div>'+
                        '<div class="alert alert-danger alert-dismissible" ng-show="AddDefaultMessage.ErrorMessage!=\'\'">{{ DefaultMessage.ErrorMessage }}</div>'+
                        '</div>' +
                        '</div>'+
                        '<div class= "row" ng-repeat="f in config.addfieldList">' +
                        '<div class="col-md-12" compile ng-bind-html="f.view" ></div><br/>' +
                        '</div>' +
                        '<div class="row">'+
                        '<div class="col-md-12">' +
                        '<button class="btn btn-sm btn-default pull-right" type="button" ng-click="Add(model)">Add</button>'+
                        '</div>'+
                        '</div>'+
                        '</div></md-dialog>',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                }).then(function (answer) {
                 }, function () {
                    });


            };


            $scope.ResetMessages = function () {
                $scope.DefaultMessage = new _message();
            };

            $scope.GetList = function () {
                _get($http, api_url + '/api/Filter/Filter/?Id=' + $scope.param + "&s=" + $scope.filter.PageSize + "&n=" + $scope.filter.PageIndex,
                    function () { },
                    function (response) {
                        $scope.MainList = response.data.Result.Result; 
                        $scope.Count = response.data.Result.Count;
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.GetEntity = function () {
                _get($http, api_url + $scope.config.api_base + 'GetEntity',
                    function () { },
                    function (response) { $scope.Entity = response.data.Result; $scope.GetFilters();},
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.GetFilters = function () {
                _get($http, api_url + '/api/Filter/GetForEntity/?Id='+$scope.Entity.Id,
                    function () { },
                    function (response) { $scope.FilterList = response.data.Result; $scope.FilterId = $scope.FilterList[0].Id; $scope.GetFilter($scope.FilterList[0].Id); 
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.setPage = function () {
                $scope.filter.PageIndex = this.n + 1;

                $scope.GetList();
            };

            $scope.GetFilter = function (Id) {
                _get($http, api_url + '/api/Filter/Get/?Id='+Id,
                    function () { },
                    function (response) { $scope.Filter = response.data.Result; 
                        $scope.GetFilterField($scope.Filter.Id);
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.GetFilterField = function (Id) {
                _get($http, api_url + '/api/FilterField/GetForFilter/?Id=' + Id,
                    function () { },
                    function (response) { 
                        $scope.config.filterFieldList = [];
                        $scope._filterFieldList = response.data.Result;

                        for (i = 0; i < $scope._filterFieldList.length; i++) {
                            if (!($scope._filterFieldList[i].LockValue)) {
                                $scope.config.filterFieldList.push({ view: SetFilterField($scope._filterFieldList[i], i) });
                            }

                        }
                        if ($scope.config.filterFieldList) {
                            for (i = 0; i < $scope.config.filterFieldList.length; i++) {
                                $scope.config.filterFieldList[i].view = $sce.trustAsHtml($scope.config.filterFieldList[i].view);
                                console.log($scope.config.filterFieldList[i].view);
                            }
                        }
                       // $scope.FilterAll();
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.GetResultFilterField = function (Id) {
                _get($http, api_url + '/api/FilterResultField/GetForFilter/?Id=' + Id,
                    function () { },
                    function (response) {
                        $scope.config.tdList = [];
                        $scope.config.thList = [];

                        var _list = response.data.Result;

                        for (i = 0; i < _list.length; i++) {
                            {
                                $scope.config.thList.push({ view: '' + _list[i].Name + '' });
                                $scope.config.tdList.push({ view: '' + _list[i].ViewTransformExpression + '' });
                            }

                        }
                        if ($scope.config.thList) {
                            for (i = 0; i < $scope.config.thList.length; i++) {
                                $scope.config.thList[i].view = $sce.trustAsHtml($scope.config.thList[i].view);
                                $scope.config.tdList[i].view = $sce.trustAsHtml($scope.config.tdList[i].view);
                                console.log($scope.config.thList[i].view);
                            }
                        }
                        $scope.Load(); 

                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.FilterAll = function () {
        
                _post($http, api_url + $scope.config.api_base + '_postGetFiltered',
                    { filterFields: $scope._filterFieldList, Id: $scope.Filter.Id},
                    function () { },
                    function (response) { $scope.MainList = response.data.Result;
                        if (table == undefined) {
                          table =  $('#MainTable').DataTable({
                              "scrollX": true,
                              "bPaginate": false,
                              "bLengthChange": false,
                              "bFilter": false,
                              "bInfo": false,
                              language: {
                                  "zeroRecords": " "
                              }
                            });
                        }
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.Edit = function (m) {
                if (m == null) {
                    $scope.DefaultMessage.ErrorMessage = "No details recieved";
                }
                else {
                    _post($http, api_url + $scope.config.api_base + 'Edit', m,
                        $scope.ResetMessages,
                        function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.GetList();
                        },
                        function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        },
                        function (response) { }
                    );
                }
            };

            $scope.setUrl = function (url, model)
            {
                var _url = url.replace('{Id}', model.Id);
                console.log(_url);
                return _url;
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

            $scope.GetFilterOptions = function (Id, name)
            {
                _get($http, api_url + '/api/Field/GetOptions/?Id=' + Id,
                    function () { },
                    function (response) {
                        $scope._filterOptionList[name] = response.data.Result;
                        console.log(name);
                        console.log($scope.options);
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.Load = function () {
                    $scope.GetList();
            };

            this.$onInit = () => {
                $scope.config = config;
                $scope.base_url = base_url;
                $rootScope.base_url = base_url;
                $scope.param = $location.search().Id;
                $scope.ResetMessages();

                $scope.defaultService = defaultService;
                $rootScope.authService = authService;
                $scope.defaultService.SetUserData($rootScope);
                $scope.GetFilter($scope.param);
 
                if (typeof Mainctrl !== 'undefined') {
                    Mainctrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
                }
                //$scope.Load();
                $scope.GetResultFilterField($scope.param);

            };



        },
        templateUrl: base_url + config.template_url
    });
})(app, config);