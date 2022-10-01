
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


var ActivatableScope = function ($scope,  $sce, $rootScope, $location, $http, defaultService, authService, $compile) {
    $scope.Activation = function (m) {
        if (!m.Inactive) {
            _appget($http,
                {
                    url: api_url + $scope.config.api_base + 'Deactivate/?Id=' + m.Id,
                    resp: function (response) { $scope.Load(); }
                });
        }
        else {
            _appget($http, {url: api_url + $scope.config.api_base + 'Activate/?Id=' + m.Id,
                resp:function (response) { $scope.Load(); }}
            );
        }
    };
};

var PaginationScope = function ($scope,  $sce, $rootScope, $location, $http, defaultService, authService, $compile) {
    $scope.PageSizeList = [10, 25, 50];
    $scope.filter = { PageSize: 10, PageIndex: 1 };
    $scope.GetPageIndex = function () {
        if ($scope.UIData.PageIndex) {
            return $scope.UIData.PageIndex;
        }
        else {
            return 1;
        }
    };

    $scope.GetPageSize = function () {
        if ($scope.UIData.PageSize) {
            return $scope.UIData.PageSize;
        }
        else {
            return 10;
        }
    };

    $scope.setPage = function () {
        $scope.filter.PageIndex = this.n + 1;
        $scope.UIData.PageIndex = $scope.filter.PageIndex;
        $scope.defaultService.SetUIData($scope.UIData);
        $scope.FilterAll();
    };

    $scope.setUrl = function (url, model) {
        var _url = url.replace('{Id}', model.Id);
        return _url;
    };

    $scope.ChangePageSize = function () {
        $scope.filter.PageIndex = 1;
        $scope.UIData.PageIndex = $scope.filter.PageIndex;
        $scope.UIData.PageSize = $scope.filter.PageSize;
        $scope.defaultService.SetUIData($scope.UIData);
        $scope.FilterAll();
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

    $scope.filter = { PageSize: $scope.GetPageSize(), PageIndex: $scope.GetPageIndex() };
};


var commonListSetup = function (app, main_config, tag, parent) {

    app.component(tag, {
        controller: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService, $compile, $window) {

            setupHistory(config, $scope, $window, $location);

            $scope.panel_ip = { show_panel: false, callback:false };
            $scope.Entity = {};
            $scope.FilterList = [];
            $scope.Filter = {};
            $scope.list = {};
            $scope._filterFieldList = [];
            $scope.drop_toggle_class = [];
            $scope.toggle_index = -1;

            $scope.toggleDrop = function (index) {
                if (index == -1) {
                    $scope.toggle_index = -1;
                    $scope.drop_toggle_class = [];
                }
                else {

                    if (index != $scope.toggle_index) {
                        $scope.drop_toggle_class[$scope.toggle_index] = '';
                    }
                    if ($scope.drop_toggle_class[index] == 'show') {
                        $scope.drop_toggle_class[index] = '';
                    }
                    else {
                        $scope.drop_toggle_class[index] = 'show';
                    }
                    $scope.toggle_index = index;

                }
            };

            $scope.mainClick = function ($event) {
                if ($event.target.className != 'fas fa-edit') {
                    $scope.toggleDrop(-1);
                }
            };


            $scope.showPanel = function (m, fieldindex) {
                $scope.imodel = m;
                $scope.panel_ip.show_panel = true;
                $scope.panel_ip.callback = false;
                $scope.panel_ip.fieldindex = fieldindex;
                $scope.panel_ip.parent_entity = $scope.Entity;
                $scope.$watch('panel_ip.callback', function () {
                    if ($scope.panel_ip.callback) {
                        $scope.GetInitUIData();  
                    }
                });
            };

            $scope.ResetMessages = function () {
                $scope.DefaultMessage = new _message();
            };

            $scope.GetList = function () {
                _appget($http, { url:api_url + $scope.config.api_base + 'getall',
                    resp: function (response) { $scope.MainList = response.data.Result; }
                });
            };

            $scope.selectRow = function (Id) {
                $scope.action_success = [];
                $scope.action_success[Id] = 'table-primary';
            };

            $scope.GetEntity = function () {
                _appget($http, {
                    url: api_url + $scope.config.api_base + 'getentity',
                    resp: function (response) {
                        $scope.Entity = response.data.Result;
                        $scope.config.EntityName = ($scope.Entity.DisplayName == null) ? $scope.config.EntityName : $scope.Entity.DisplayName;
                        $scope.GetFilters();
                    }
                });
            };


            $scope.GetInitUIData = function () {
                _appget($http, { url:api_url + $scope.config.api_base + 'GetUIDataForList/?use_filter=' + $scope.config.use_filter + '&use_local_list=' + $scope.config.use_local_list+'&Id=0&s=' + $scope.filter.PageSize + '&n=' + $scope.filter.PageIndex,
                    resp:function (response) {
                        $scope.Entity = response.data.Result.entity;
                        $scope.config.EntityName = ($scope.Entity.DisplayName == null) ? $scope.config.EntityName : $scope.Entity.DisplayName;

                        if ($scope.config.use_filter) {
                            $scope.FilterList = response.data.Result.filters;
                            $scope.FilterId = response.data.Result.filters[0].Id;
                            $scope.Filter = response.data.Result.filters[0];
                            $scope.config.filterFieldList = [];
                            $scope._filterFieldList = response.data.Result.filterFields;


                            $scope._filterFieldList.forEach(function (element, i) {
                                if (!$scope._filterFieldList[i].Inactive) {
                                    if (!($scope._filterFieldList[i].LockValue)) {
                                        show = true;
                                        $scope.config.filterFieldList.push(SetFilterField($scope._filterFieldList[i], i, $scope, show));

                                    }
                                    if ($scope._filterFieldList[i].Field.FieldType.Name == "FilterList") {

                                        $scope._filterListOptionList[$scope._filterFieldList[i].Id] = [];
                                    }
                                }  
                            });

                            $scope.SetupFields($scope.config.filterFieldList);

                            if ($scope._filterListOptionList) {
                                for (var key in $scope._filterListOptionList) {
                                }
                            }
                        }
                        if (!$scope.config.use_local_list) {
                            $scope.MainList = response.data.Result.filterResult.Result;
                            $scope.Count = response.data.Result.filterResult.Count;
                        }
                        else {
                            $scope.GetList();
                        }

                    }}
                );
            };

            $scope.PerformAction = function (action) {
                $scope[action]();
            };

            $scope.LoadActions = function () {

            };

            $scope.ShowContextMenu = function (index) {
                $scope.SelectedIndex = index;
            };

            $scope.GetFilters = function () {
                _appget($http, {
                    url: api_url + '/api/Filter/GetForEntity/?Id=' + $scope.Entity.Id,
                    resp: function (response) {
                        $scope.FilterList = response.data.Result;
                        $scope.FilterId = $scope.FilterList[0].Id; $scope.GetFilter($scope.FilterList[0].Id);

                    }
                });
            };

            $scope.GetFilter = function (Id) {
                _appget($http, {
                    url: api_url + '/api/Filter/Get/?Id=' + Id,
                    resp: function (response) {
                        $scope.Filter = response.data.Result;
                        $scope.GetFilterField($scope.Filter.Id);
                        if (config.use_server_result) {
                            $scope.GetResultFilterField($scope.Filter.Id);
                        }
                    }
                }
                );
            };

            $scope._filterListOptionList = {};

            $scope.GetFilterField = function (Id) {
                _appget($http, {
                    url: api_url + '/api/FilterField/GetForFilter/?Id=' + Id,
                    resp: function (response) {
                        $scope.config.filterFieldList = [];
                        $scope._filterFieldList = response.data.Result;

                        $scope._filterFieldList.forEach(function (element, i) {
                            if (!element.Inactive) {
                                if (!(element.LockValue)) {
                                    show = true;
                                    $scope.config.filterFieldList.push(SetFilterField(element, i, $scope, show));

                                }
                                if (element.Field.FieldType.Name == "FilterList") {
                                    $scope._filterListOptionList[element.Id] = [];
                                }
                            }                           
                        });

                        $scope.SetupFields($scope.config.filterFieldList);

                        if ($scope._filterListOptionList) {
                            for (var key in $scope._filterListOptionList) {
                            }
                        }
                    }
                });
            };

            $scope.GetResultFilterField = function (Id) {
                _appget($http, {
                    url: api_url + '/api/FilterResultField/GetForFilter/?Id=' + Id,
                    resp: function (response) {
                        $scope.config.tdList = [];
                        $scope.config.thList = [];

                        var _list = response.data.Result;
                        _list.forEach(function (element, i) {
                            $scope.config.thList.push({ view: '' + element.Name + '' });
                            $scope.config.tdList.push({ view: '' + element.ViewTransformExpression + '' });
                        });   

                        if (typeof $scope.config.thList == 'undefined') {
                            $scope.config.thList.forEach(function (element,i) {
                                $scope.config.thList[i].view = $sce.trustAsHtml($scope.config.thList[i].view);
                                $scope.config.tdList[i].view = $sce.trustAsHtml($scope.config.tdList[i].view);
                            });                            
                        }
                    }
                });
            };

            $scope.FilterAll = function () {

                var url = $scope.config.api_base + '_postGetFiltered';

                if (config.use_server_result) {
                    url = '/api/filter/_postFilter/';
                }

                _apppost($http, { url:api_url + url,
                    model:{
                        Id: $scope.Filter.Id,
                        s: $scope.filter.PageSize,
                        n: $scope.filter.PageIndex,
                        filterFields: $scope._filterFieldList
                    },
                    resp:function (response) {
                        $scope.MainList = response.data.Result.Result;
                        $scope.Count = response.data.Result.Count;
                    }}
                );
            };

            $scope.launch_toast = function launch_toast() {
                var x = document.getElementById('toast');
                x.className = 'show';
                setTimeout(function () { x.className = x.className.replace('show', ''); }, 5000);
            };

            $scope.Edit = function (m) {
                if (m == null) {
                    $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
                }
                else {
                    _apppost($http, {
                        url: api_url + $scope.config.api_base + 'Edit',
                        model: m,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.action_success = [];
                            $scope.action_success[m.Id] = "table-success";
                            $scope.launch_toast();
                            $scope.FilterAll();
                        },
                        eresp: function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                            $scope.action_success = [];
                            $scope.action_success[m.Id] = 'table-danger';
                        },
                        fail: function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                            $scope.action_success = [];
                            $scope.action_success[m.Id] = 'table-danger';
                        }
                    });
                }
            };

            $scope.Delete = function (Id) {

                if (!confirm('Are you sure you want to delet this record?')) {
                    return;
                }

                _appget($http, {
                    url: api_url + $scope.config.api_base + 'Delete/?Id=' + Id,
                    resp: function (response) {
                        $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                        $scope.launch_toast();
                        $scope.Load();
                    }, eresp: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        $scope.action_success = [];
                        $scope.action_success[Id] = 'table-danger';
                    },
                    fail: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        $scope.action_success = [];
                        $scope.action_success[Id] = 'table-danger';
                    }
                }
                );
            };

            $scope.GetFilterOptions = function (Id, name) {
                _appget($http, {
                    url: api_url + '/api/Field/GetOptions/?Id=' + Id,
                    resp: function (response) {
                        $scope._filterOptionList[name] = response.data.Result;
                    }
                }
                );
            };

            $scope.GetFilterList = function (Id) {
                _appget($http, { url:api_url + '/api/FilterList/LoadForFilterField/?Id=' + Id + '&s=10&n=1',
                    resp:function (response) {
                        $scope._filterListOptionList[Id] = response.data.Result;
                    }});
            };

            $scope.Load = function () {
                $scope.GetInitUIData();               
            };

            $scope.openPopup = function (m) {
                window.open($scope.config.editUrl + m.Id, 'popup', 'width=600,height:600');
            };

            $scope.setFilterValue = function (index, value) {
                $scope._filterFieldList[index].FilterValue = value;

            };

            $scope.Reload = function () {
                if ($scope.config.use_filter) {
                    $scope.FilterAll();
                }
                else {
                    $scope.GetList();
                }
            };

            $scope.SetupFields = function (fieldList) {
                if (fieldList) {
                    fieldList.forEach(function (element) {
                        element.view = $sce.trustAsHtml(element.view);
                    });
                }
            };

            $scope.parentModel = {};
            $scope.GetParentEntity = function () {
                _appget($http, {
                    url: api_url + $scope.config.parent_api_base + 'Get/?Id=' + $location.search().Id,
                    before: $scope.ResetMessages,
                    resp: function (response) {
                        $scope.parentModel = response.data.Result;
                    },
                    eresp: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }
                });
            };


            $scope.Reorder = function (i1,i2,i3,i4) {
                _appget($http, {
                    url: api_url + $scope.config.api_base + 'reorder/?id1='
                        + i1 + '&id2=' + i2 + '&i1=' + i3 + '&i2=' + i4,
                    before: $scope.ResetMessages,
                    resp: function (response) {
                        $scope.GetList();
                    },
                    eresp: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }
                });
            };

            $scope.cutRow = function () {
                $scope.selectedrow = $scope.MainList[$scope.SelectedIndex];
                $scope.row_insert_process = true;
                $scope.selectedrow_index = $scope.SelectedIndex;
                $scope.selectedrow_order = $scope.selectedrow.Index;
            };

            $scope.pasteRowAfter = function () {
                var i1 = $scope.selectedrow.Id;
                var i2 = $scope.MainList[$scope.SelectedIndex + 1].Id;
                var i3 = $scope.MainList[$scope.SelectedIndex + 1].Index;
                var i4 = $scope.selectedrow.Index;
                $scope.row_insert_process = false;
                $scope.Reorder(i1,i2,i3,i4);
            };

            $scope.pasteRowBefore = function () {

            };

            $scope.init = function (main_config) {
                $scope.config = main_config;
                $scope.base_url = $rootScope.base_url = base_url;
                $scope.dateOpts = appSettings.dateOpts;
                $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
                $scope.timeOnlyOpts = appSettings.timeOnlyOpts;
                $scope.ResetMessages();

                $scope.defaultService = $rootScope.defaultService = defaultService;

                if (typeof $scope.config.vcent == 'undefined') {
                    $scope.config.vcent = '';
                }
                var vcent = window.sessionStorage.getItem(_subdomain + '_vcent');
                if (vcent != $scope.config.vcent) {
                    window.sessionStorage.removeItem(_subdomain + '_vcentdata');
                    $scope.defaultService.SetAllMenu();
                }
                window.sessionStorage.setItem(_subdomain + '_vcent', $scope.config.vcent);


                $scope.authService = $rootScope.authService = authService;
                $scope.defaultService.SetUserData($rootScope);
                $scope.UIData = defaultService.GetUIData();

                ActivatableScope($scope, $sce, $rootScope, $location, $http, defaultService, authService, $compile);
                PaginationScope($scope, $sce, $rootScope, $location, $http, defaultService, authService, $compile);
             //   EditDialogScope($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile);

                $scope.SetupFields($scope.config.thList);
                $scope.SetupFields($scope.config.tdList);
                $scope.SetupFields($scope.config.filterFieldList);

                if (typeof config.Mainctrl !== 'undefined') {
                    config.Mainctrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
                }

                if ($scope.config.showParent) {
                    $scope.GetParentEntity();
                }

                $scope.Load();

            };

            this.$onInit = () => {
                if (main_config.use_server_config) {
                    _appget($http, { url:api_url + main_config.api_base + '/GetUIConfig/?type=_list_',
                        before:$scope.ResetMessages,
                        resp:function (response) {

                            var _serverConfig = JSON.parse(response.data.Result.Config);

                            if (_serverConfig.Mainctrl) {
                                if (_serverConfig.Mainctrl.use_server_config) {

                                    _appget($http,
                                        { url:api_url + '/api/UIConfigScript/GetForUIConfig/?Id=' + response.data.Result.Id,
                                            resp: function (response) {
                                                response.data.Result.forEach(function (element, i) {
                                                    _serverConfig[response.data.Result[i].Tag] = new Function('$scope, $sce, $rootScope, $location, $http, defaultService, authService', response.data.Result[i].Script.Text);
                                                });
                                            $scope.init(_serverConfig);
                                        }}
                                    );

                                }
                                else {
                                    $scope.init(_serverConfig);
                                }
                            }
                            else {
                                $scope.init(_serverConfig);
                            }

                        }});
                }
                else {
                    $scope.init(main_config);
                }
            };
        },
        templateUrl: base_url + config.template_url
    });
};