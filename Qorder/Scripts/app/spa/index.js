app.value('$routerRootComponent', 'mainPanel');
var list_config = [];
list_config['applicationentity'] =
    {
        View: { Entity: "Application Entities" },
        enable_history: true, history_text: 'Entity List',history_node: true,
        activable: true, onscreenAdd: false, onscreenEdit: true,inlineEdit: false, use_filter: true,
        addbutton: {url: '/api/ApplicationEntity/Add'},
        btnActionList: [{ action: 'LoadEntities', Text: 'Load Local Entities' }],
        actionlist: [
            { url: '/ApplicationEntity/edit/?Id={Id}', Text: 'Edit' },
            { url: '/ApplicationEntity/fields/?Id={Id}', Text: 'Fields' },
            { url: '/ApplicationEntity/properties/?Id={Id}', Text: 'Properties' },
            { url: '/ApplicationEntity/scripts/?Id={Id}', Text: 'Scripts' },
            { url: '/ApplicationEntity/actions/?Id={Id}', Text: 'Actions' },
            { url: '/ApplicationEntity/accessSetup/?Id={Id}', Text: 'Access Setup' },
            { url: '/ApplicationEntity/childentityrelation/?Id={Id}', Text: 'Child Entity Relation' },
            { url: '/ApplicationEntity/forms/?Id={Id}', Text: 'Forms' },
            { url: '/ApplicationEntity/import/?Id={Id}', Text: 'Import' }
        ],
        thList: [{ view: '' }, { view: 'Name' }, { view: 'Display Name' },
        { view: 'Prefix' }, { view: 'Postfix' },
        { view: 'Number Format' }, { view: 'Ownership Entity' }, { view: 'Global Searchable' }, { view: 'Server UI' }],
        tdList: [
            {   view: ` <a href='/home/spa/edit/:applicationentity/:{{m.Id}}'>edit</a>`},
            {   view: '{{ m.Name }}' },
            {   view: '{{ m.DisplayName }}'},
            {   view: '{{ m.Prefix }}'},
            {   view: '{{ m.Postfix }}'},
            {   view: '{{ m.NumberFormat }}'},
            {   view: '<input type="checkbox" class="form-check-input" ng-model="m.IsOwnershipEntity"/>'},
            {   view: '<input type="checkbox" class="form-check-input" ng-model="m.IsGlobalSearchble"/>'},
            {   view: '<input type="checkbox" class="form-check-input" ng-model="m.use_server_ui"/>'}
        ],
        fieldList: [
            { view: setUIFields('model', 'text', { label: 'Name', value: 'Name' })},
            { view: setUIFields('model', 'text', { label: 'Display Name ', value: 'DisplayName' }) },
            { view: setUIFields('model', 'text', { label: 'Default Processor class', value: 'DefaultRepository' })},
            { view: setUIFields('model', 'text', { label: 'Prefix', value: 'Prefix' }) },
            { view: setUIFields('model', 'text', { label: 'Postfix', value: 'Postfix' }) },
            { view: setUIFields('model', 'text', { label: 'Number Format', value: 'NumberFormat' }) },
            { view: setUIFields('model', 'checkbox', { label: 'Ownership Entity', value: 'IsOwnershipEntity' }) },
            { view: setUIFields('model', 'checkbox', { label: 'Global Searchble', value: 'IsGlobalSearchble' })},
            { view: setUIFields('model', 'checkbox', { label: 'Use Server UI', value: 'use_server_ui' })}
        ],
        api_base: '/api/ApplicationEntity/',
        use_local_list: false,
        template_url: _sfconstant.default_list_template_path
    };
list_config['country'] = {
    View: { Entity: 'Country' },
    onscreenAdd: true, onscreenEdit: true, activable: true,
    cols: 2, actionlist: [], thList: [{ view: 'Name' }],
    tdList: [
        { view: '{{ m.Name }}' }
    ],
    fieldList: [
        {   view: setUIFields('model', 'text', { label: 'Name', value: 'Name' })}
    ],
    api_base: '/api/country/',
    use_filter: false, inlineEdit: false, use_local_list: false,
    template_url: _sfconstant.default_list_template_path
};


var edit_config = [];

edit_config['applicationentity'] =
    {
        View:
        {   Entity: 'Entity' },
        //        Editctrl: Editctrl,
        showPrint: true, cols: 3,
        backbutton: { url: '/applicationentity/index'},
        actionlist: [],
        fieldList: [
        { view: setUIFields('model', 'text', { label: 'Name', value: 'Name' })},
        { view: setUIFields('model', 'text', { label: 'Display Name ', value: 'DisplayName' }) },
        { view: setUIFields('model', 'text', { label: 'Prefix', value: 'Prefix' })},
        { view: setUIFields('model', 'text', { label: 'Default Processing class', value: 'DefaultRepository' }) },
        { view: setUIFields('model', 'text', { label: 'Postfix', value: 'Postfix' })},
        { view: setUIFields('model', 'text', { label: 'Number Format', value: 'NumberFormat' })},
        { view: setUIFields('model', 'checkbox', { label: 'Ownership Entity', value: 'IsOwnershipEntity' })},
        { view: setUIFields('model', 'checkbox', { label: 'Global Searchable', value: 'IsGlobalSearchble' })},
        { view: setUIFields('model', 'checkbox', { label: 'Use Server UI', value: 'use_server_ui' }) }
        ],
        api_base: '/api/applicationentity/',
        template_url: _sfconstant.default_edit_template_path
    };

var routes = [
    { path: '/home/spa/crisis-center', component: 'crisisCenter', useAsDefault: true, as: 'CrisisCenter', config: {} },
    { path: '/home/spa/heroes', component: 'heroes', as: 'Heroes', config: {} },
    { path: '/home/spa/heroes1', component: 'heroes', as: 'Heroes 1', config: {} },
    { path: '/home/spa/list/type:applicationentity/action:list', component: 'applicationentityList', as: 'List 1', config: {} },
    { path: '/home/spa/list/type:country/action:list', component: 'countryList', as: 'List 2', config: {} },
    { path: '/home/spa/edit/:type/:id', component: 'applicationentityEdit', as: 'Edit', config: {} },
];

var mainpanel = app.component('mainPanel', {
    bindings: {
        showflag: '=',
        modelid: '=',
        iconfig: '='
    },
    controller: function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile, $window) {
        $scope.ResetMessages = function () {
            $scope.DefaultMessage = new _message();
        };

        $scope.ResetMessages();
        $scope.cancel = function () {
            $scope.showflag = false;

        };
        this.$onInit = () => {
            $scope.init({ Editctrl: undefined, cols: 2 });
        };
        $scope._routes = routes;
        $scope.Get = function () { };
        $scope.GetUIData = function () { };
        $scope.GetEntity = function () { };

        $scope.init = function (main_config) {
            defaultService.SetVcent(undefined);
            $scope.config = main_config;
            $scope.base_url = base_url;
            $scope.api_url = api_url;
            $scope.dateOpts = appSettings.dateOpts;
            $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
            $scope.timeOnlyOpts = appSettings.timeOnlyOpts;

            $rootScope.base_url = base_url;
            $scope.server_storage = server_storage;
            $scope.ResetMessages();

            $scope.defaultService = defaultService;
            $rootScope.defaultService = defaultService;
            $scope.defaultService.SetUserData($rootScope);
            $rootScope.authService = authService;
            console.log($scope);
            console.log($rootScope);
            $scope.AllMenu = $rootScope.AllMenu;

            if ($scope.config.componentList) {

                for (i = 0; i < $scope.config.componentList.length; i++) {
                    $scope.config.componentList[i].view = $sce.trustAsHtml($scope.config.componentList[i].view);
                }
            }

            if ($scope.config.fieldList) {
                for (i = 0; i < $scope.config.fieldList.length; i++) {
                    $scope.config.fieldList[i].view = $sce.trustAsHtml($scope.config.fieldList[i].view);
                }
            }

            if ($scope.config.Editctrl) {
                $scope.config.Editctrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
            }

            if (typeof $scope.config.cols == undefined) {
                $scope.config.cols = 1;
            }

            $scope.Get();
            $scope.GetUIData();
            $scope.GetEntity();
        };

    },
    $routeConfig: routes,
    template:
        `<nav>
            <a href='/home/spa/edit/:applicationentity/:1'>Ok</a>
            <a ng-repeat="link in _routes" href="{{link.path}}">{{link.as}} </a>
        </nav>
   <div class="wrapper" ng-cloak>
        <nav id="sidebar" class="sidebar">
            <div class="sidebar-content js-simplebar">
                <a class="sidebar-brand" href="#">
                    <span class="align-middle">RECHORD 1.0</span>
                </a>

         <ul class="sidebar-nav">
                    <li class="sidebar-header">
                        Home
                    </li>
                    <li class="sidebar-item" ng-repeat="menu in $root.AllMenu">
                        <a data-target="#ui{{$index}}" data-toggle="collapse" class="sidebar-link collapsed" aria-expanded="{{menu.urlList.includes(currentUrl.toLowerCase())}}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu align-middle"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            <span class="align-middle">{{menu.pageName}} </span>
                        </a>
                        <ul id="ui{{$index}}" class="sidebar-dropdown list-unstyled collapse {{menu.urlList.includes(currentUrl.toLowerCase())?'in show':''}}" data-parent="#sidebar">
                            <li class="sidebar-item {{(o.url == currentUrl)? 'active':''}}" ng-repeat="o in menu.List" >
                                <a class="sidebar-link {{( o.url == currentUrl)? 'active':''}}" href="{{o.url}}">  <span class="align-middle"> {{o.linkName}} </span></a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
<div class="main">
            <nav class="navbar navbar-expand navbar-light navbar-bg">
                <a class="sidebar-toggle d-flex">
                    <i class="hamburger align-self-center"></i>
                </a>
                <form class="d-none d-sm-inline-block">
                    <div class="input-group input-group-navbar">
                        <input type="text" class="form-control" placeholder="Search…" ng-model="query_text" aria-label="Search">
                        <button class="btn" type="button" ng-click="Search()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search align-middle"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </div>
                    <ul class="card dropdown-menu" style="z-index:10;position:absolute;box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;margin-left:20px;">
                        <li class="dropdown-item" ng-repeat="s in ResultList"><a target="_blank" href="{{base_url}}/{{s.type}}/Edit/?Id={{s.Id}}">{{s.ApplicationNumber}} {{s.ApplicationNumber?":":""}} {{s.Name}}</a></li>
                    </ul>
                </form>
                <img src="{{logoURL}}" ng-show="logoURL !=''" style="height:50px;" />
                <div class="navbar-collapse collapse">
                    <ul class="navbar-nav navbar-align">
                        <li class="nav-item dropdown">
                            <a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-toggle="dropdown">
                                <i class="align-middle" data-feather="settings"></i>
                            </a>
                            <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-toggle="dropdown">
                                <span class="text-dark">Hello {{UserName}}, &nbsp; Role : {{UserRole}}  &nbsp;</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" ng-show="UserName != undefined" target="_self" href="{{base_url}}/account/AssignRole">Change Role</a>
                                <a class="dropdown-item" ng-show="UserName != undefined" href="#" ng-click="authService.logOut();"><i class="fa fa-sign-out pull-right"></i> Log Out</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <main class="content">
                <div class="container-fluid p-0">
                    <div id="processing1" style="display: none"><img src="~/Content/images/spinner.gif" class="ajax-loader" /></div>
                    <div id="loginModal" ng-show="!$root.IsAuth">
                        <div class="login-modal" ng-if="!IsAuth">
                            <div class="x_panel bg-default" style="opacity:1.0;">
                                <div class="x_header">
                                    Unauthorized Access
                                </div>
                                <div class="x_content">
                                    <div class="row bg-dark">
                                        <div class="col-md-12">
                                            <a class="btn btn-sm btn-primary" target="_blank" href="~/account/login">Please login again.</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><ng-outlet></ng-outlet></div>
            </main>
            <footer class="footer">
                <div class="container-fluid">
                    <div class="row text-muted">
                        <div class="col-6 text-left">
                            <p class="mb-0">
                                <a href="#" class="text-muted"><strong>RECHORD 1.0</strong></a> &copy;
                            </p>
                        </div>
                        <div class="col-6 text-right">
                            <ul class="list-inline">
                                <li class="list-inline-item">
                                    <a class="text-muted" href="http://www.ecsatech.com" target="_blank">Product by ECSATECH</a>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>`

});

mainpanel.component('crisisCenter', {

    controller: function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile, $window, localStorageService) {
        defaultService.SetVcent('spa');
        defaultService.SetAllMenu();
    },
    template: `<b>Changing the vcent</b>`
});

mainpanel.component('heroes', {

    controller: function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile, $window, localStorageService) {
        defaultService.SetVcent(undefined);
        defaultService.SetAllMenu();
    },
    template: `<b>Reseting the vcent</b>`
});


var ActivatableScope = function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile) {
    $scope.Activation = function (m) {
        if (!m.Inactive) {
            _get($http, api_url + $scope.config.api_base + 'Deactivate/?Id=' + m.Id,
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
};

var PaginationScope = function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile) {
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

var EditDialogScope = function ($parentscope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile) {

    $parentscope.showAdvanced = function (ev, _model) {
        $parentscope.customFullscreen = false;

        var _fieldList = $parentscope.config.fieldList;
        var add_scope = $parentscope;
        $mdDialog.show({
            controller: function ($scope, $mdDialog) {
                $scope.parent = add_scope;
                $scope.ResetMessages = function () {
                    $scope.DefaultMessage = new _message();
                };

                $scope.ResetMessages();
                $scope.config = add_scope.config;
                $scope.config.fieldList = _fieldList;
                $scope.dateOpts = $parentscope.dateOpts;
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                    add_scope.Reload();
                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };

                $scope.Add = function (m) {

                    if (m == null) {
                        $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
                    }
                    else {
                        _apppost($http, {
                            url: api_url + $scope.config.api_base + 'Add', model: m,
                            before: $scope.ResetMessages,
                            resp: function (response) {
                                $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                                $scope.model = {};
                                $scope.cancel();
                            },
                            eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                        });
                    }
                };

                $scope.Get = function () {
                    $scope.parent.action_success = [];
                    $scope.parent.action_success[$scope._model.Id] = 'table-primary';
                    _get($http, api_url + $scope.config.api_base + 'Get/?Id=' + $scope._model.Id,
                        $scope.ResetMessages,
                        function (response) {
                            $scope.model = response.data.Result;
                        },
                        function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; },
                        function (response) { }
                    );
                };

                $scope.GetUIData = function () {

                    var Id = $scope._model ? $scope._model.Id : 0;
                    _get($http, api_url + $scope.config.api_base + 'getuidataforedit/?Id=' + Id,
                        $scope.ResetMessages,
                        function (response) {
                            $scope.uidata = response.data.Result;

                            if ($scope.uidata.entity.use_server_ui) {
                                $scope.config.addfieldList = [];

                                if ($scope.uidata.fields) {
                                    $scope.uidata.fields.sort(function (a, b) { return a.Index - b.Index; });
                                    $scope.selectedFormId = $scope.uidata.preferredForm.Id;
                                    for (var i = 0; i < $scope.uidata.fields.length; i++) {
                                        var _form_field = $scope.uidata.fields[i];
                                        var _field =
                                        {
                                            show: i % 2,
                                            islike: i % 2,
                                            view: $sce.trustAsHtml(FieldToString(_form_field.Field)),
                                            load: {
                                                apply: _form_field.Field.ApplicationEntityProperty.Name,
                                                field: _form_field.Field.field
                                            },
                                            filter: {
                                                field: _form_field.Field.ApplicationEntityProperty.Name,
                                                apply: _form_field.Field.field,
                                                name: _form_field.Field.searchname,
                                                url: _form_field.Field.filterurl
                                            }
                                        };
                                        $scope.config.addfieldList.push(_field);
                                    }
                                }
                            }

                        },
                        function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; },
                        function (response) { }
                    );
                };


                $scope.ChangeForm = function () {
                    _get($http, api_url + '/api/form/getfieldsforform/?Id=' + $scope.selectedFormId,
                        $scope.ResetMessages,
                        function (response) {
                            $scope.uidata.fields = response.data.Result;
                            $scope.model.UIFormId = $scope.selectedFormId;
                            if ($scope.uidata.entity.use_server_ui) {
                                $scope.config.addfieldList = [];

                                if ($scope.uidata.fields) {
                                    $scope.uidata.fields.sort(function (a, b) { return a.Index - b.Index; });

                                    for (var i = 0; i < $scope.uidata.fields.length; i++) {
                                        var _form_field = $scope.uidata.fields[i];
                                        var _field =
                                        {
                                            show: i % 2,
                                            islike: i % 2,
                                            view: $sce.trustAsHtml(FieldToString(_form_field.Field)),
                                            load: {
                                                apply: _form_field.Field.ApplicationEntityProperty.Name,
                                                field: _form_field.Field.field
                                            },
                                            filter: {
                                                field: _form_field.Field.ApplicationEntityProperty.Name,
                                                apply: _form_field.Field.field,
                                                name: _form_field.Field.searchname,
                                                url: _form_field.Field.filterurl
                                            }
                                        };
                                        $scope.config.addfieldList.push(_field);
                                    }
                                }
                            }
                        },
                        function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; },
                        function (response) { }
                    );
                };

                $scope.Edit = function (m) {

                    if (m == null) {
                        $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
                    }
                    else {
                        if (typeof m.ExtraData != 'undefined') {
                            m.LegacyNumber = JSON.stringify(m.ExtraData);
                        }

                        _apppost($http, {
                            url: api_url + $scope.config.api_base + 'Edit', model: m,
                            before: $scope.ResetMessages,
                            resp: function (response) {
                                $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                                $parentscope.action_success = [];
                                $parentscope.action_success[_model.Id] = "table-success";
                                $scope.model = {};
                                $scope.cancel();
                            },
                            eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                        });
                    }
                };



                $scope.changeLikeState = function (event, itemid, index) {
                    $scope.config.addfieldList[index].btnLikeDisable = true;

                };


                this.$onInit = () => {
                    $scope._model = _model;
                    $scope.config.addfieldList = [];

                    $scope.dateOpts = appSettings.dateOpts;
                    $scope.dateOnlyOpts = appSettings.dateOnlyOpts;

                    if ($scope.config.fieldList) {
                        for (i = 0; i < $scope.config.fieldList.length; i++) {
                            var _field =
                            {
                                show: i % 2,
                                islike: i % 2,
                                view: $sce.trustAsHtml($scope.config.fieldList[i].view),
                                load: $scope.config.fieldList[i].load,
                                filter: $scope.config.fieldList[i].filter
                            };
                            $scope.config.addfieldList.push(_field);
                        }
                    }

                    if (typeof $scope.config.AddCtrl !== 'undefined') {
                        $scope.config.AddCtrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
                    }
                    $scope.GetUIData();
                    if (_model != null) {

                        $scope.Get();
                    }
                    else {
                        $scope.model = {};
                    }

                };

            },

            templateUrl: $parentscope.base_url + '/scripts/app/cmp/subcomponents/editdialog/dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $parentscope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function (answer) {
        }, function () {
        });

    };
};

var commonListSetup = function (main, tag) {
    main.component(tag, {

        controller: function ($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile, $window) {


            $scope.Entity = {};
            $scope.FilterList = [];
            $scope.Filter = {};
            $scope.list = {};
            $scope._filterFieldList = [];


            $scope.showPanel = function (m) {
                $scope.imodel = m;
                $scope.show_panel = true;
            };
            $scope.ResetMessages = function () {
                $scope.DefaultMessage = new _message();
            };

            $scope.GetList = function () {
                _get($http, api_url + $scope.config.api_base + 'GetAll',
                    function () { },
                    function (response) { $scope.MainList = response.data.Result; },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.selectRow = function (Id) {
                $scope.action_success = [];
                $scope.action_success[Id] = 'table-primary';
            };

            $scope.GetEntity = function () {
                _get($http, api_url + $scope.config.api_base + 'GetEntity',
                    function () { },
                    function (response) {
                        $scope.Entity = response.data.Result;
                        $scope.config.EntityName = ($scope.Entity.DisplayName == null) ? $scope.config.EntityName : $scope.Entity.DisplayName;
                        $scope.GetFilters();
                    },
                    function (response) { },
                    function (response) { }
                );
            };


            $scope.GetInitUIData = function () {
                _get($http, api_url + $scope.config.api_base + 'GetUIDataForList/?use_filter=' + $scope.config.use_filter + '&use_local_list=' + $scope.config.use_local_list + '&Id=0&s=' + $scope.filter.PageSize + '&n=' + $scope.filter.PageIndex,
                    function () { },
                    function (response) {
                        $scope.Entity = response.data.Result.entity;
                        $scope.config.EntityName = ($scope.Entity.DisplayName == null) ? $scope.config.EntityName : $scope.Entity.DisplayName;

                        if ($scope.config.use_filter) {
                            $scope.FilterList = response.data.Result.filters;
                            $scope.FilterId = response.data.Result.filters[0].Id;
                            $scope.Filter = response.data.Result.filters[0];
                            $scope.config.filterFieldList = [];
                            $scope._filterFieldList = response.data.Result.filterFields;

                            for (i = 0; i < $scope._filterFieldList.length; i++) {
                                if (!$scope._filterFieldList[i].Inactive) {
                                    if (!($scope._filterFieldList[i].LockValue)) {
                                        show = true;
                                        $scope.config.filterFieldList.push(SetFilterField($scope._filterFieldList[i], i, $scope, show));

                                    }
                                    if ($scope._filterFieldList[i].Field.FieldType.Name == "FilterList") {

                                        $scope._filterListOptionList[$scope._filterFieldList[i].Id] = [];
                                    }
                                }
                                else {

                                }
                            }

                            $scope.SetupFields($scope.config.filterFieldList);

                            if ($scope._filterListOptionList) {
                                for (var key in $scope._filterListOptionList) {
                                    //        $scope.GetFilterList(key);
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

                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.PerformAction = function (action) {
                $scope[action]();
            };

            $scope.LoadActions = function () {

                _get($http, api_url + '/api/Script/Get/?Id=1',
                    function () { },
                    function (response) {
                        $scope[response.data.Result.Name] = new Function(response.data.Result.Text);
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.ShowContextMenu = function (index) {
                $scope.SelectedIndex = index;
            };

            $scope.GetFilters = function () {
                _get($http, api_url + '/api/Filter/GetForEntity/?Id=' + $scope.Entity.Id,
                    function () { },
                    function (response) {
                        $scope.FilterList = response.data.Result;
                        $scope.FilterId = $scope.FilterList[0].Id; $scope.GetFilter($scope.FilterList[0].Id);

                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.GetFilter = function (Id) {
                _get($http, api_url + '/api/Filter/Get/?Id=' + Id,
                    function () { },
                    function (response) {
                        $scope.Filter = response.data.Result;
                        $scope.GetFilterField($scope.Filter.Id);
                        if ($scope.config.use_server_result) {
                            $scope.GetResultFilterField($scope.Filter.Id);
                        }
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope._filterListOptionList = {};

            $scope.GetFilterField = function (Id) {
                _get($http, api_url + '/api/FilterField/GetForFilter/?Id=' + Id,
                    function () { },
                    function (response) {
                        $scope.config.filterFieldList = [];
                        $scope._filterFieldList = response.data.Result;

                        for (i = 0; i < $scope._filterFieldList.length; i++) {
                            if (!$scope._filterFieldList[i].Inactive) {
                                if (!($scope._filterFieldList[i].LockValue)) {
                                    show = true;
                                    $scope.config.filterFieldList.push(SetFilterField($scope._filterFieldList[i], i, $scope, show));

                                }
                                if ($scope._filterFieldList[i].Field.FieldType.Name == "FilterList") {

                                    $scope._filterListOptionList[$scope._filterFieldList[i].Id] = [];
                                }
                            }
                            else {

                            }
                        }

                        $scope.SetupFields($scope.config.filterFieldList);

                        if ($scope._filterListOptionList) {
                            for (var key in $scope._filterListOptionList) {
                                //        $scope.GetFilterList(key);
                            }
                        }
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
                            }
                        }
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.FilterAll = function () {

                var url = $scope.config.api_base + '_postGetFiltered';

                if ($scope.config.use_server_result) {
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
                    }});
            };

            $scope.Edit = function (m) {
                if (m == null) {
                    $scope.DefaultMessage.ErrorMessage = "No details recieved.";
                }
                else {
                    _apppost($http, {
                        url: api_url + $scope.config.api_base + 'Edit', model: m,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.action_success = [];
                            $scope.action_success[_model.Id] = "table-success";
                            $scope.FilterAll();
                        },
                        eresp: function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        }
                    });
                }
            };

            $scope.GetFilterOptions = function (Id, name) {
                _get($http, api_url + '/api/Field/GetOptions/?Id=' + Id,
                    function () { },
                    function (response) {
                        $scope._filterOptionList[name] = response.data.Result;
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.GetFilterList = function (Id) {
                _get($http, api_url + '/api/FilterList/LoadForFilterField/?Id=' + Id + '&s=10&n=1',
                    function () { },
                    function (response) {
                        $scope._filterListOptionList[Id] = response.data.Result;
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.Load = function () {
                $scope.GetInitUIData();
                /*if ($scope.config.use_filter) {
                    $scope.GetEntity();
                }
                else {
                    $scope.GetList();
                }*/
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
                    for (i = 0; i < fieldList.length; i++) {
                        fieldList[i].view = $sce.trustAsHtml(fieldList[i].view);
                    }
                }
            };

            $scope.parentModel = {};
            $scope.GetParentEntity = function () {
                _get($http, api_url + $scope.config.parent_api_base + 'Get/?Id=' + $scope.param,
                    $scope.ResetMessages,
                    function (response) {
                        $scope.parentModel = response.data.Result;
                    },
                    function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    },
                    function (response) {
                    });
            };


            $scope.Reorder = function (i1, i2, i3, i4) {
                _get($http, api_url + $scope.config.api_base + 'reorder/?id1='
                    + i1 + '&id2=' + i2 + '&i1=' + i3 + '&i2=' + i4,
                    $scope.ResetMessages,
                    function (response) {
                        $scope.GetList();
                    },
                    function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    },
                    function (response) {
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
                $scope.Reorder(i1, i2, i3, i4);
            };

            $scope.pasteRowBefore = function () {

            };

            $scope.init = function () {
                setupHistory($scope.config, $scope, $window, $location);
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

                ActivatableScope($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile);
                PaginationScope($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile);
                EditDialogScope($scope, $mdDialog, $sce, $rootScope, $location, $http, defaultService, authService, $compile);

                $scope.SetupFields($scope.config.thList);
                $scope.SetupFields($scope.config.tdList);
                $scope.SetupFields($scope.config.filterFieldList);

                if (typeof $scope.config.Mainctrl !== 'undefined') {
                    $scope.config.Mainctrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
                }

                if ($scope.config.showParent) {
                    $scope.GetParentEntity();
                }

                $scope.Load();
                //                $scope.LoadActions();

            };

            this.$onInit = () => {

                var _url = $location.url();
                console.log(list_config);
                var x1 = _url.replace('/home/spa/list/type:', '');
                var x = x1.replace('/action:list', '');
                console.log(x);
                var origianl = JSON.stringify(list_config[x]);
                $scope.config = JSON.parse(origianl);
                if ($scope.config.use_server_config) {
                    _get($http, api_url + main_config.api_base + '/GetUIConfig/?type=_list_',
                        $scope.ResetMessages,
                        function (response) {

                            var _serverConfig = JSON.parse(response.data.Result.Config);

                            if (_serverConfig.Mainctrl) {
                                if (_serverConfig.Mainctrl.use_server_config) {

                                    _get($http,
                                        api_url + '/api/UIConfigScript/GetForUIConfig/?Id=' + response.data.Result.Id,
                                        function () { },
                                        function (response) {
                                            for (i = 0; i < response.data.Result.length; i++) {
                                                _serverConfig[response.data.Result[i].Tag] = new Function('$scope, $sce, $rootScope, $location, $http, defaultService, authService', response.data.Result[i].Script.Text);

                                            }
                                            $scope.init(_serverConfig);
                                        },
                                        function (response) { },
                                        function (response) { }
                                    );

                                }
                                else {
                                    $scope.init(_serverConfig);
                                }
                            }
                            else {
                                $scope.init(_serverConfig);
                            }

                        },
                        function (response) {

                        },
                        function (response) {
                        });

                }
                else {
                    $scope.init();
                }
            };

        },
        templateUrl: base_url + _sfconstant.default_list_template_path
    });
};



var commonEditConfig = function (app, tag) {

    app.component(tag, {
        controller: function ($scope, $mdDialog, $sce, $rootScope, $http, $location, defaultService, authService, $window) {




            $scope.Form = {};
            $scope.Fields = [];


            $scope.ResetMessages = function () {
                $scope.DefaultMessage = new _message();
            };


            $scope.launch_toast = function launch_toast() {

                var x = document.getElementById("toast");
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
            };


            $scope.DateFilters = [];
            $scope.datePostSetup = function (fpItem) {
                $scope.DateFilters.push(fpItem.value);
            };

            $scope.applyDateFilter = function () {
                for (i = 0; i < $scope.DateFilters.length; i++) {
                    $scope.model[$scope.DateFilters[i]] = moment($scope.model[$scope.DateFilters[i]], 'DD/MM/YYYY hh:mm A').format('DD/MM/YYYY');
                }
            };

            $scope.GetOptions = function (Id, name) {
                _get($http, api_url + '/api/Field/GetOptions/?Id=' + Id,
                    function () { },
                    function (response) {
                        $scope.options[name] = response.data.Result;
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.changeLikeState = function (event, x) {
                $scope.showFilter(event);
            };

            $scope.SetupConfig = function () {
                if ($scope.config.fieldList) {
                    for (i = 0; i < $scope.config.fieldList.length; i++) {
                        $scope.config.fieldList[i].view = $sce.trustAsHtml($scope.config.fieldList[i].view);
                        $scope.config.fieldList[i].optons = [];
                    }
                }



                if ($scope.Fields) {
                    for (i = 0; i < $scope.Fields.length; i++) {
                        if ($scope.Fields[i].Field.FieldType.Name == "DROPDOWN") {
                            $scope.GetOptions($scope.Fields[i].Field.Id, $scope.Fields[i].Field.Name);
                        }
                    }
                }
            };


            $scope.GetForm = function () {
                _get($http, api_url + '/api/Asset/GetForm',
                    function () { },
                    function (response) {
                        $scope.Form = response.data.Result;
                        $scope.GetFields(response.data.Result.Id);
                    },
                    function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; },
                    function (response) { }
                );
            };

            $scope.GetPrint = function (Id) {

                $http({
                    method: 'GET',
                    cache: false,
                    url: api_url + $scope.config.api_base + '/Print/?templateId=' + Id + '&Id=' + $scope.param,
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
                _get($http, api_url + $scope.config.api_base + 'Communicate/?templateId=' + Id + '&Id=' + $scope.param,
                    $scope.ResetMessages,
                    function (response) {
                    },
                    function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    },
                    function (response) {
                    });
            };

            $scope.options = [];

            $scope.GetFields = function (Id) {
                _get($http, api_url + '/api/FormFieldMap/GetAllForProperty1/?Id=' + Id,
                    $scope.ResetMessages,
                    function (response) {
                        $scope.Fields = response.data.Result;
                        $scope.config.fieldList = [];
                        var fields = response.data.Result;

                        for (i = 0; i < fields.length; i++) {
                            if (!fields[i].Inactive) {
                            }

                        }

                        $scope.SetupConfig();
                    },
                    function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    },
                    function (response) { }
                );
            };

            $scope.Get = function () {
                _get($http, api_url + $scope.config.api_base + 'Get/?Id=' + $scope.param,
                    $scope.ResetMessages,
                    function (response) {
                        $scope.model = response.data.Result;
                        $scope.applyDateFilter();
                        $scope.GetStateActionStatements();
                        $scope.GetTemplates();

                    },
                    function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    },
                    function (response) {
                    });
            };

            $scope.GetTemplates = function () {
                _get($http, api_url + $scope.config.api_base + 'GetTemplates/?Id=' + $scope.param,
                    function (response) { },
                    function (response) {
                        var templateList = response.data.Result;
                        $scope.printTemplateList = [];
                        $scope.emailTemplateList = [];

                        for (var i = 0; i < templateList.length; i++) {
                            if (templateList[i].CommunicationType.Name == 'Print') {
                                $scope.printTemplateList.push(templateList[i]);
                            }
                            if (templateList[i].CommunicationType.Name == 'Email') {
                                $scope.emailTemplateList.push(templateList[i]);
                            }
                        }

                    },
                    function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    },
                    function (response) {
                    });
            };

            $scope.GetStateActionStatements = function () {
                _get($http, api_url + $scope.config.api_base + 'GetStateActionStatements/?Id=' + $scope.param,
                    function () { },
                    function (response) {
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
                    function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    },
                    function (response) {
                    });
            };

            $scope.Edit = function () {
                if (typeof $scope.model.ExtraData != 'undefined') {
                    $scope.model.LegacyNumber = JSON.stringify($scope.model.ExtraData);
                }

                _apppost($http, { url:api_url + $scope.config.api_base + 'edit', model:$scope.model,
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
                _appput($http, {
                    url: api_url + $scope.config.api_base + 'EditAction/?Id=' + Id,
                    model: $scope.model,
                    before: $scope.ResetMessages,
                    resp: function (response) {
                        $scope.Get();
                        $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                    },
                    eresp: function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }
                });
            };

            this.$onInit = () => {
                var _url = $location.url();
                var x1 = _url.replace('/home/spa/edit/:', '');
                var x = x1.substring(x1.indexOf('/:'), x1.length);
                $scope.param = x.replace('/:', '');

                var entity = x1.substring(0, x1.indexOf('/:'));
                var origianl = JSON.stringify(edit_config[entity]);
                $scope.config = JSON.parse(origianl);

                if ($scope.config.use_server_config) {
                    _get($http, api_url + main_config.api_base + '/GetUIConfig/?type=_edit_',
                        $scope.ResetMessages,
                        function (response) {
                            var _serverConfig = JSON.parse(response.data.Result.Config);
                            $scope.init(_serverConfig);
                        },
                        function (response) {

                        },
                        function (response) {
                        });
                }
                else {
                    $scope.init($scope.config);
                }
            };

            $scope.GetEntity = function () {
                _get($http, api_url + $scope.config.api_base + 'GetEntity',
                    function () { },
                    function (response) {
                        $scope.Entity = response.data.Result;
                        $scope.config.Entity = response.data.Result;
                    },
                    function (response) { },
                    function (response) { }
                );
            };

            $scope.GetUIData = function () {

                _get($http, api_url + $scope.config.api_base + 'getuidataforedit/?Id=' + $scope.param,
                    $scope.ResetMessages,
                    function (response) {
                        $scope.uidata = response.data.Result;
                        $scope.model.UIFormId = $scope.selectedFormId;
                        if ($scope.uidata.entity.use_server_ui) {
                            $scope.config.fieldList = [];
                            $scope.config.cols = ($scope.uidata.preferredForm.cols == 0) ? 1 : $scope.uidata.preferredForm.cols;
                            if ($scope.uidata.fields) {
                                //  $scope.selectedFormId = $scope.uidata.preferredForm.Id;
                                for (i = 0; i < $scope.uidata.fields.length; i++) {
                                    var _field =
                                    {
                                        show: i % 2,
                                        islike: i % 2,
                                        view: $sce.trustAsHtml(FieldToString($scope.uidata.fields[i])),
                                        load: false,
                                        filter: false
                                    };
                                    $scope.config.fieldList.push(_field);
                                }
                            }
                        }
                        //                            $scope.model = response.data.Result;
                    },
                    function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; },
                    function (response) { }
                );
            };


            $scope.ChangeForm = function () {
                $scope.uidata.forms.forEach(form => { if ($scope.selectedFormId) { $scope.uidata.preferredForm = form; } });
                _get($http, api_url + '/api/form/getfieldsforform/?Id=' + $scope.selectedFormId,
                    $scope.ResetMessages,
                    function (response) {
                        $scope.uidata.fields = response.data.Result;
                        $scope.model.UIFormId = $scope.selectedFormId;
                        if ($scope.uidata.entity.use_server_ui) {
                            $scope.config.fieldList = [];
                            $scope.config.cols = ($scope.uidata.preferredForm.cols == 0) ? 1 : $scope.uidata.preferredForm.cols;
                            if ($scope.uidata.fields) {
                                for (var i = 0; i < $scope.uidata.fields.length; i++) {
                                    var _field =
                                    {
                                        show: i % 2,
                                        islike: i % 2,
                                        view: $sce.trustAsHtml(FieldToString($scope.uidata.fields[i])),
                                        load: false,
                                        filter: false
                                    };
                                    $scope.config.fieldList.push(_field);
                                }
                            }
                        }
                    },
                    function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; },
                    function (response) { }
                );
            };

            $scope.init = function () {

                setupHistory($scope.config, $scope, $window, $location);
                $scope.base_url = base_url;
                $scope.api_url = api_url;
                $scope.dateOpts = appSettings.dateOpts;
                $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
                $scope.timeOnlyOpts = appSettings.timeOnlyOpts;

                $rootScope.base_url = base_url;
                $scope.server_storage = server_storage;

                $scope.ResetMessages();

                //   $scope.param = $location.search().Id;


                $scope.defaultService = defaultService;
                $rootScope.defaultService = defaultService;
                $scope.defaultService.SetUserData($rootScope);
                $rootScope.authService = authService;


                if ($scope.config.componentList) {

                    for (i = 0; i < $scope.config.componentList.length; i++) {
                        $scope.config.componentList[i].view = $sce.trustAsHtml($scope.config.componentList[i].view);
                    }
                }

                if ($scope.config.fieldList) {
                    for (i = 0; i < $scope.config.fieldList.length; i++) {
                        $scope.config.fieldList[i].view = $sce.trustAsHtml($scope.config.fieldList[i].view);
                    }
                }

                if ($scope.config.Editctrl) {
                    $scope.config.Editctrl($scope, $sce, $rootScope, $location, $http, defaultService, authService);
                }

                if (typeof $scope.config.cols == undefined) {
                    $scope.config.cols = 1;
                }

                $scope.Get();
                $scope.GetUIData();
                $scope.GetEntity();
            };

        },
        templateUrl: base_url + _sfconstant.default_edit_template_path
    });
    //commonChildListSetup(app, 'subList');
};

Object.keys(list_config).forEach(function (ele, index) {
    commonListSetup(mainpanel, ele + 'List');
});

Object.keys(edit_config).forEach(function (ele, index) {
    commonEditConfig(mainpanel, ele + 'Edit');
});
