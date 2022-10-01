

var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.param = $location.search().Id;

    $scope.GetList = function () {
        _appget($http, {
            url: api_url + '/api/OwnershipEntityAccess/GetForUser/?Id=' + $scope.param,
            resp: function (response)
            {
                 $scope.MainList = response.data.Result;                 
            }
        });

    };
    $scope.GetList();
};

var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


    $scope.Add = function (m) {
        if (m == null) {
            $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
        }
        else {
            m.IntUserId = $scope.parent.param;
            _apppost($http,
                {
                    url: api_url + '/api/OwnershipEntityAccess/Add',
                    model :m,
                    resp:function (response) {
                    $scope.GetAll();
                    }
                });
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
                    url: api_url + '/api/OwnershipEntityAccess/Edit',
                    model: m
                });
        }

    };

    $scope.GetEntityList = function () {
        _appget($http, 
            {
                url: api_url + '/api/ApplicationEntity/GetAll',
                resp:function (response) {
                $scope.ApplicationEntityList = response.data.Result;
                }
            });

    };
    $scope.GetEntityList();

    $scope.loadValues = function () {
        _appget($http,
            {
                url :api_url + '/api/ApplicationEntity/GetAll',
                resp:function (response) {
                    $scope.ApplicationEntityList = response.data.Result;
                }
            });

    };
};

var config =
{
    EntityName: 'Entity Access',
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
    thList: [{ view: 'User' }, { view: 'Entity' }, { view: 'Entity Id' }],
    tdList: [{
        view: '{{m.IntUser.FirstName +" "+ m.IntUser.LastName}}'
    },
    {
        view: '{{m.ApplicationEntity.Name}}'
    },
    {
        view: '{{m.eId}}'
    }
    ],
    fieldList: [[
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Entity', value: 'ApplicationEntityId',
                list: 'ApplicationEntityList', optid: 'Id', optlabel: ['Name']
            })              
        },
        {
            view: setUIFields('model', 'text', { label: 'Value', value: 'eId' }) 
        }]],
    use_local_list: true,
    api_base: '/api/OwnershipEntityAccess/',
    template_url: _sfconstant.default_list_template_path
};


commonListSetup(app, config, 'list');

