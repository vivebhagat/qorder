
var commonChildListSetup = function (app, tag) {

    app.component(tag, {
        bindings: {
            input: '='
        },
        controller: function ($scope,  $sce, $rootScope, $location, $http, defaultService, authService, $compile) {

            $scope.panel_ip = { show_panel: false, callback: false };
            $scope.PageSizeList = [10, 25, 50];
            $scope.Entity = {};
            $scope.FilterList = [];
            $scope.Filter = {};
            $scope.filter = { PageSize: 10, PageIndex: 1 };
            var table;
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


            $scope.setPage = function () {
                $scope.filter.PageIndex = this.n + 1;
                $scope.FilterAll();
            };


            $scope.Activation = function (m) {
                if (!m.Inactive) {
                    _appget($http, {
                        url: api_url + $scope.config.api_base + 'Deactivate/?Id=' + m.Id,
                        resp: function (response) { $scope.Load(); }
                    });
                }
                else {
                    _appget($http,
                        {
                            url: api_url + $scope.config.api_base + 'Activate/?Id=' + m.Id,
                            resp: function (response) { $scope.Load(); }
                        });
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
                        $scope.Load();
                    }
                });
            };
      

            $scope.ResetMessages = function () {
                $scope.DefaultMessage = new _message();
            };

            $scope.GetList = function () {
                _appget($http, 
                    {
                        url: api_url + $scope.config.api_base + 'getall',
                        resp: function (response) { $scope.MainList = response.data.Result; }
                    });
            };

            $scope.GetEntity = function () {
                _appget($http,
                    {
                        url: api_url + $scope.config.api_base + 'GetEntity',
                        resp: function (response) {
                            $scope.Entity = response.data.Result;
                            $scope.GetFilters();
                        }
                    });
            };

            $scope.PerformAction = function (action) {
                $scope[action]();
            };

            $scope.LoadActions = function () {
                _appget($http,
                    {
                        url: api_url + '/api/script/get/?Id=1',
                        resp: function (response) {
                            $scope[response.data.Result.Name] = new Function(response.data.Result.Text);
                        }
                    });
            };

            $scope.GetFilters = function () {
                _appget($http,
                    {
                        url: api_url + '/api/Filter/GetForEntity/?Id=' + $scope.Entity.Id,
                        resp: function (response) {
                            $scope.FilterList = response.data.Result;
                            $scope.FilterId = $scope.FilterList[0].Id; $scope.GetFilter($scope.FilterList[0].Id);
                        }
                    });
            };

            $scope.GetFilter = function (Id) {
                _appget($http,
                    {
                        url :api_url + '/api/Filter/Get/?Id=' + Id,
                        resp : function (response) {
                            $scope.Filter = response.data.Result;
                            $scope.GetFilterField($scope.Filter.Id);
                        }
                    });
            };

            $scope._filterListOptionList = {};
            $scope.GetFilterField = function (Id) {
                _appget($http,
                    {
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

                            if ($scope.config.filterFieldList) {
                                $scope.config.filterFieldList.forEach(function (element, i) {
                                    element.view = $sce.trustAsHtml(element.view);
                                });
                            }
                        }
                    });
            };

            $scope.FilterAll = function () {

                _appput($http, 
                    {
                        url: api_url + $scope.config.api_base + 'GetFiltered/?Id=' + $scope.Filter.Id + "&s=" + $scope.filter.PageSize + "&n=" + $scope.filter.PageIndex,
                        model: $scope._filterFieldList,
                        resp: function (response) {
                            $scope.MainList = response.data.Result.Result;
                            $scope.Count = response.data.Result.Count;
                        }
                    });
            };

            $scope.Edit = function (m) {
                if (m == null) {
                    $scope.DefaultMessage.ErrorMessage = "No details recieved";
                }
                else {
                    if (typeof m.ExtraData != 'undefined') {
                        m.LegacyNumber = JSON.stringify(m.ExtraData);
                    }

                    _apppost($http, {
                        url: api_url + $scope.config.api_base + 'Edit',
                        model: m,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.FilterAll();
                        },
                        eresp: function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        }
                    }
                    );
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
                        $scope.Load();
                    }, eresp: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    },
                    fail: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }
                }
                );
            };


            $scope.setUrl = function (url, model) {
                var _url = url.replace('{Id}', model.Id);
                return _url;
            };

            $scope.ChangePageSize = function () {
                $scope.filter.PageIndex = 1;
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

            $scope.GetFilterOptions = function (Id, name) {
                _appget($http, {
                    url: api_url + '/api/Field/GetOptions/?Id=' + Id,
                    before: function (response) {
                        $scope._filterOptionList[name] = response.data.Result;
                    }
                });
            };

            $scope.GetFilterList = function (Id) {
                _appget($http, { url: api_url + '/api/FilterList/LoadForFilterField/?Id=' + Id + '&s=10&n=1',
                    resp: function (response) {
                        $scope._filterListOptionList[Id] = response.data.Result;
                    }}
                );
            };

            $scope.Load = function () {
                if ($scope.config.use_filter) {
                    $scope.GetEntity();
                }
                else {
                    $scope.GetList();
                }
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

            $scope.GetEntity = function () {
                _appget($http, {
                    url: api_url + $scope.config.api_base + 'GetEntity',
                    resp: function (response) {
                        $scope.Entity = response.data.Result;
                    }
                }
                );
            };

            $scope.init = function (main_config) {
                $scope.config = main_config;
                $scope.base_url = $rootScope.base_url = base_url;
                $scope.ResetMessages();
                $scope.defaultService = $rootScope.defaultService = defaultService;
                $scope.authService = $rootScope.authService = authService;
                $scope.defaultService.SetUserData($rootScope);
                $scope.dateOpts = appSettings.dateOpts;
                $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
                $scope.timeOnlyOpts = appSettings.timeOnlyOpts;

                if ($scope.config.thList) {
                    $scope.config.thList.forEach(function (element, i) {
                        element.view = $sce.trustAsHtml(element.view);
                    });
                }

                if ($scope.config.tdList) {
                    $scope.config.tdList.forEach(function (element, i) {
                        element.view = $sce.trustAsHtml(element.view);
                    });
                }

                if ($scope.config.filterFieldList) {
                    $scope.config.filterFieldList.forEach(function (element, i) {
                        element.view = $sce.trustAsHtml(element.view);
                    });
                }

                if ((typeof $scope.config.Mainctrl !== 'undefined') && $scope.config.Mainctrl) {
                    $scope.config.Mainctrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
                }

                $scope.Load();
                $scope.GetEntity();
            };

            this.$onInit = () => {
                var self = this;
                $scope._parent = self.parent;
                if (self.input.config.use_server_config) {
                    _appget($http, 
                        {
                            url:api_url + self.input.config.api_base + 'GetUIConfig/?type=_child_list_',
                        before:$scope.ResetMessages,
                        resp:function (response) {
                            var _x_ = response.data.Result.Config;
                            var _serverConfig = JSON.parse(_x_);
                            if (_serverConfig.Mainctrl) {
                                if (_serverConfig.Mainctrl.use_server_config) {
                                    _appget($http,
                                        { url:api_url + '/api/UIConfigScript/GetForUIConfig/?Id=' + response.data.Result.Id,
                                        resp:function (response) {
                                            response.data.Result.forEach(function (element, i) {
                                                _serverConfig[element.Tag] = new Function('$scope, $sce, $rootScope, $location, $http, defaultService, authService', element.Script.Text);
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
                    $scope.init(self.input.config);
                }
            };
        },
        templateUrl: base_url + _sfconstant.default_list_template_path
    });
};


var commonEditConfig = function (app, _config_,tag) {

    app.component(tag, {
        controller: function ($scope,  $sce, $rootScope, $http, $location, defaultService, authService, $window) {

            $scope.Form = {};
            $scope.Fields = [];
            $scope.DateFilters = [];

            setupHistory(config, $scope, $window, $location);

            $scope.ResetMessages = function () {
                $scope.DefaultMessage = new _message();
            };

            $scope.launch_toast = function launch_toast()
            {
                var x = document.getElementById('toast');
                x.className = 'show';
                setTimeout(function () { x.className = x.className.replace('show', ''); }, 5000);
            };

            $scope.datePostSetup = function (fpItem)
            {
                $scope.DateFilters.push(fpItem.value);
            };

            $scope.applyDateFilter = function ()
            {
                $scope.DateFilters.forEach(function(element, i) {
                    $scope.model[element] = moment($scope.model[element], 'DD/MM/YYYY hh:mm A').format('DD/MM/YYYY');
                });
            };

            $scope.GetOptions = function (Id, name)
            {
                _appget($http, {
                    url: api_url + '/api/Field/GetOptions/?Id=' + Id,
                    resp: function (response) {
                        $scope.options[name] = response.data.Result;
                    }
                });
            };

            $scope.changeLikeState = function (event, o)
            {
                $scope.showFilter(event);
            };

            $scope.SetupConfig = function () {
                if ($scope.config.fieldList) {
                    $scope.config.fieldList.forEach(function (element, i) {
                        element.view = $sce.trustAsHtml(element.view);
                        element.optons = [];
                    });
                }

                if ($scope.Fields) {
                    $scope.Fields.forEach(function (element, i) {
                        if (element.Field.FieldType.Name == "DROPDOWN") {
                            $scope.GetOptions(element.Field.Id, element.Field.Name);
                        }
                    });
                }
            };


            $scope.GetForm = function () {
                _appget($http, {
                    url: api_url + '/api/Asset/GetForm',
                    resp: function (response) {
                        $scope.Form = response.data.Result;
                        $scope.GetFields(response.data.Result.Id);
                    },
                    eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                });
            };

            $scope.GetPrint = function (Id) {

                $http({
                    method: 'GET',
                    cache: false,
                    url: api_url + $scope.config.api_base + '/Print/?templateId='+Id+'&Id=' + $scope.param,
                    responseType: 'arraybuffer',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',

                    }
                }).then(function successCallback(response) {
                    _download(response.data);
                }, function errorCallback(response) {
                });                
            };


            $scope.Communicate = function (Id) {
                _appget($http, {
                    url: api_url + $scope.config.api_base + 'Communicate/?templateId=' + Id + '&Id=' + $scope.param,
                    before: $scope.ResetMessages,
                    eresp: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }
                });
            };

            $scope.options = [];

            $scope.GetFields = function (Id) {
                _appget($http,
                    {
                        url: api_url + '/api/FormFieldMap/GetAllForProperty1/?Id=' + Id,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.Fields = response.data.Result;
                            $scope.config.fieldList = [];
                            var fields = response.data.Result;

                            fields.forEach(function (element, i) {
                                if (!element.Inactive) {
                                }
                            });
                           
                            $scope.SetupConfig();
                        },
                        eresp: function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        }
                    }
                );
            };

            $scope.Get = function () {
                _appget($http, 
                    {
                        url: api_url + $scope.config.api_base + 'Get/?Id=' + $scope.param,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.model = response.data.Result;
                            $scope.applyDateFilter();
                            $scope.GetStateActionStatements();
                            $scope.GetTemplates();

                        },
                        eresp: function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        }
                    });
            };

            $scope.GetTemplates = function () {
                _appget($http, {
                    url: api_url + $scope.config.api_base + 'GetTemplates/?Id=' + $scope.param,
                    resp: function (response) {
                        var templateList = response.data.Result;
                        $scope.printTemplateList = [];
                        $scope.emailTemplateList = [];

                        templateList.forEach(function (element, i) {
                            if (element.CommunicationType.Name == 'Print') {
                                $scope.printTemplateList.push(element);
                            }
                            if (element.CommunicationType.Name == 'Email') {
                                $scope.emailTemplateList.push(element);
                            }
                        });

                    },
                    eresp: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }
                });
            };

            $scope.GetStateActionStatements = function () {
                _appget($http, {
                    url: api_url + $scope.config.api_base + 'GetStateActionStatements/?Id=' + $scope.param,
                    resp: function (response) {
                        $scope.actionList = [];
                        $scope.StateActionStatements = response.data.Result;

                        var toRemove = [];
                        for (var i = 0; i < $scope.StateActionStatements.length; i++) {
                            var id = '[ng-model="model.' + $scope.StateActionStatements[i].ApplicationEntityProperty.Name + '"]';
                            var element = angular.element(document.querySelector(id));

                            element.attr('disabled', 'disabled');

                            if (('${*}' == $scope.StateActionStatements[i].currentValue) |
                                ('${null}' == $scope.StateActionStatements[i].currentValue) |
                                $scope.StateActionStatements[i].currentValue == $scope.model[$scope.StateActionStatements[i].ApplicationEntityProperty.Name]
                            ) {
                                if (('${null}' == $scope.StateActionStatements[i].currentValue)) {
                                    if ($scope.model[$scope.StateActionStatements[i].ApplicationEntityProperty.Name] == null) {
                                        var included = false;
                                        for (k = 0; k < $scope.actionList.length; k++) {
                                            if ($scope.actionList[k].Id == $scope.StateActionStatements[i].StateAction.Id) {
                                                included = true;
                                            }
                                        }
                                        if (!included) {
                                            $scope.actionList.push({
                                                Id: $scope.StateActionStatements[i].StateAction.Id,
                                                Name: $scope.StateActionStatements[i].StateAction.Name
                                            });
                                        }
                                    }
                                    else {

                                        for (k = 0; k < $scope.actionList.length; k++) {
                                            if ($scope.actionList[k].Id == $scope.StateActionStatements[i].StateAction.Id) {
                                            }
                                        }
                                    }
                                }
                                else {
                                    var included = false;
                                    for (k = 0; k < $scope.actionList.length; k++) {
                                        if ($scope.actionList[k].Id == $scope.StateActionStatements[i].StateAction.Id) {
                                            included = true;
                                        }
                                    }
                                    if (!included) {
                                        $scope.actionList.push({
                                            Id: $scope.StateActionStatements[i].StateAction.Id,
                                            Name: $scope.StateActionStatements[i].StateAction.Name
                                        });
                                    }
                                }

                            }
                            else {

                                for (k = 0; k < $scope.actionList.length; k++) {
                                    if ($scope.actionList[k].Id == $scope.StateActionStatements[i].StateAction.Id) {

                                    }
                                }
                            }
                        }
                    },
                    eresp: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }
                });
            };

            $scope.Edit = function () {
                if (typeof $scope.model.ExtraData != 'undefined') {
                    $scope.model.LegacyNumber = JSON.stringify($scope.model.ExtraData);
                }

                _apppost($http, { url: api_url + $scope.config.api_base + 'Edit',model: $scope.model,
                    before:$scope.ResetMessages,
                    resp:function (response) {
                        $scope.Get();
                        $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                        $scope.launch_toast();
                    },
                    eresp:function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }});
            };

            $scope.ExecFunction = function (_function) {
                $scope[_function.action]();
            };

            $scope.EditAction = function (Id) {
                _apppost($http, {
                    url: api_url + $scope.config.api_base + '_postEditAction',
                    model: {
                        Data: $scope.model,
                        Id: Id
                    },
                    before:$scope.ResetMessages,
                    resp:function (response) {
                        $scope.Get();
                        $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                    },
                    eresp:function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }}
                    );
            };

            this.$onInit = () => {
                if (_config_.use_server_config)
                {
                    _appget($http, {
                        url:api_url + main_config.api_base + '/GetUIConfig/?type=_edit_',
                        before:$scope.ResetMessages,
                        resp:function (response) {
                            var _serverConfig = JSON.parse(response.data.Result.Config);
                            $scope.init(_serverConfig);
                        }});
                }
                else {
                    $scope.init(_config_);
                }
            };

            $scope.GetEntity = function () {
                _appget($http,
                    { url:api_url + $scope.config.api_base + 'getentity',
                    resp:function (response) {
                        $scope.Entity = response.data.Result;
                        $scope.config.Entity = response.data.Result;
                    } }
                );
            };

            $scope.GetUIData = function () {

                _appget($http, {
                    url: api_url + $scope.config.api_base + 'getuidataforedit/?Id=' + $location.search().Id,
                    before: $scope.ResetMessages,
                    resp: function (response) {
                        $scope.uidata = response.data.Result;
                        $scope.model.UIFormId = $scope.selectedFormId;
                        if ($scope.uidata.entity.use_server_ui) {
                            $scope.config.fieldList = [];
                            $scope.config.cols = ($scope.uidata.preferredForm.cols == 0) ? 1 : $scope.uidata.preferredForm.cols;
                            if ($scope.uidata.fields) {
                                $scope.uidata.fields.forEach(function (element, i) {
                                    var _field =
                                    {
                                        show: i % 2,
                                        islike: i % 2,
                                        view: $sce.trustAsHtml(FieldToString(element)),
                                        load: false,
                                        filter: false
                                    };
                                    $scope.config.fieldList.push(_field);
                                });
                            }
                        }
                    },
                    eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                });
            };


            $scope.ChangeForm = function () {
                $scope.uidata.forms.forEach(form => { if ($scope.selectedFormId) { $scope.uidata.preferredForm = form; } });
                _appget($http, {
                    url: api_url + '/api/form/getfieldsforform/?Id=' + $scope.selectedFormId,
                    before: $scope.ResetMessages,
                    resp: function (response) {
                        $scope.uidata.fields = response.data.Result;
                        $scope.model.UIFormId = $scope.selectedFormId;
                        if ($scope.uidata.entity.use_server_ui) {
                            $scope.config.fieldList = [];
                            $scope.config.cols = ($scope.uidata.preferredForm.cols == 0) ? 1 : $scope.uidata.preferredForm.cols;
                            if ($scope.uidata.fields) {
                                $scope.uidata.fields.forEach(function (element, i) {
                                    var _field =
                                    {
                                        show: i % 2,
                                        islike: i % 2,
                                        view: $sce.trustAsHtml(FieldToString(element)),
                                        load: false,
                                        filter: false
                                    };
                                    $scope.config.fieldList.push(_field);
                                });
                            }
                        }
                    },
                    eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                });
            };

            $scope.init = function (main_config) {

                $scope.config = main_config;
                $scope.base_url = $rootScope.base_url = base_url;
                $scope.api_url = api_url;
                $scope.dateOpts = appSettings.dateOpts;
                $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
                $scope.timeOnlyOpts = appSettings.timeOnlyOpts;
                $scope.server_storage = server_storage;
                $scope.ResetMessages();
                $scope.param = $location.search().Id;
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

                if ($scope.config.componentList) {
                    $scope.config.componentList.forEach(function (element, i) {
                        element.view = $sce.trustAsHtml(element.view);
                    });
                }

                if ($scope.config.fieldList) {
                    $scope.config.fieldList.forEach(function (element, i) {
                        element.view = $sce.trustAsHtml(element.view);
                    });                    
                }

                if ($scope.config.Editctrl) {
                    $scope.config.Editctrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
                }

                if (typeof main_config.cols == undefined) {
                    main_config.cols = 1;
                }

                $scope.Get();
                $scope.GetUIData();
                $scope.GetEntity();
            };
        },
        templateUrl: base_url + config.template_url
    });
    commonChildListSetup(app, 'subList');
};
