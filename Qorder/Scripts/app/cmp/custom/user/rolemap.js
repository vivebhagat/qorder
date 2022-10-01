﻿

var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.param = $location.search().Id;

    $scope.GetList = function () {
        _appget($http, {
            url :api_url + '/api/UserDefinedRoleToUserMap/GetForUser/?Id=' + $scope.param,
            resp: function (response)
            {
                 $scope.MainList = response.data.Result;                 
            }}
        );
    };
    $scope.GetList();
};

var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.Add = function (m) {
        if (m == null) {
            $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
        }
        else {
            m.IntUserId = $location.search().Id;
            _apppost($http,
                {
                    url: api_url + '/api/UserDefinedRoleToUserMap/Add',
                    model: m,
                    resp: function (response) {
                        $scope.GetAll();
                    }
                }
            );
        }
    };

    $scope.Edit = function (m) {
        if (m == null) {
            $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
        }
        else {
            m.IntUserId = $scope.parent.param;
            _apppost($http,
                {
                    url: api_url + '/api/UserDefinedRoleToUserMap/Edit',
                    model :m,
                    resp: function (response) {
                        $scope.GetAll();
                    }
                });
        }
    };

    $scope.GetRoleList = function () {
        _appget($http,
            {
                url :api_url + '/api/UserDefinedRole/GetAll',
                resp: function (response) {
                    $scope.RoleList = response.data.Result;
                }
            });

    };
    $scope.GetRoleList();
};

var config =
{
    EntityName: 'User Role',
    backbutton: { url:'/IntUsers/Index', show : true},
    activable: true,
    onscreenEdit : true,
    Mainctrl: Mainctrl,
    AddCtrl : AddCtrl,
    onscreenAdd: true,
    inlineEdit: false,
    showParent: true,
    parent_api_base: '/api/intuser/',
    cols: 3,
    parentFieldList: [
    {
        view: '<b>User Id :</b> {{ parentModel.Id }}'
    },
    {
        view: '<b>First Name :</b>{{ parentModel.FirstName }}'
    },
    {
        view: '<b>Last Name :</b>{{ parentModel.LastName }}'
    }
    ],
    actionlist: [],
    thList: [{ view: 'User' }, { view: 'Role' }],
    tdList: [{
        view: '{{m.IntUser.FirstName +" "+ m.IntUser.LastName}}'
    },
    {
        view: '{{m.Role.Name}}'
    }
    ],
    fieldList: [[
        {
            view: setUIFields('model', 'dropdown', {
                    label: 'Role', value: 'RoleId',
                    list: 'RoleList', optid: 'Id', optlabel: ['Name']
                })
        }]],
    use_local_list: true,
    api_base: '/api/UserDefinedRoleToUserMap/',
    template_url: _sfconstant.default_list_template_path
};


commonListSetup(app, config, 'list');
