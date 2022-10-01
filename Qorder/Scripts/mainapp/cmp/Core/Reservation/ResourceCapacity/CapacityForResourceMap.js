
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
    $scope.sendEvent = function () {
        $scope.$emit('getEvent', []);
    };

    $scope.GetList = function () {
        _appget($http,
            {
                url: api_url + '/api/ResourceCapacity/GetResourceCapacitiesForAllocationResourceMap/?Id=' + $location.search().Id,
                resp: function (response) {
                    $scope.MainList = response.data.Result;
                }
            });
    };


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetAllocationResourceMapList = function () {
        _appget($http,
            {
                url: api_url + '/api/AllocationResourceMap/GetAll',
                resp: function (response) { $scope.AllocationResourceMapList = response.data.Result; }
            });
    };
    $scope.GetAllocationResourceMapList();

    $scope.GetResourceCapacityTypeList = function () {
        _appget($http,
            {
                url: api_url + '/api/ResourceCapacityType/GetAll',
                resp: function (response) { $scope.ResourceCapacityTypeList = response.data.Result; }
            });
    };
    $scope.GetResourceCapacityTypeList();


    $scope.Add = function (m) {
        if (m == null) {
            $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
        }
        else {
            m.AllocationResourceMapId = $location.search().Id;
            _apppost($http, {
                url: api_url + $scope.config.api_base + 'Add', model: m,
                before: $scope.ResetMessages,
                resp: function (response) {
                    $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                    $scope.model = {};
                    $scope.model_id = response.data.Result;
                    $scope.Get();
                },
                eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
            });
        }
    };
    $scope.Edit = function (m) {

        if (m == null) {
            $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
        }
        else {
            if (typeof m.ExtraData != 'undefined') {
                m.LegacyNumber = JSON.stringify(m.ExtraData);
            }
            m.AllocationResourceMapId = $location.search().Id;
            _apppost($http, {
                url: api_url + $scope.config.api_base + 'Edit', model: m,
                before: $scope.ResetMessages,
                resp: function (response) {
                    $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                },
                eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
            });
        }
    };
};



var config =
{
    EntityName: 'Resource Capacities',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: true,
    activable: true,
    showParent: true,
    parent_api_base: '/api/AllocationResourceMap/',
    parentFieldList: [
        {
            view: '<b> Id :</b> {{ parentModel.Id }}'
        },
        {
            view: '<b> Group Name :</b>{{ parentModel.AllocationGroup.Name }}'
        },
        {
            view: '<b> Start Time :</b>{{ parentModel.StartTime }}'
        },
        {
            view: '<b> End Time :</b>{{ parentModel.EndTime }}'
        }
    ],
    addbutton: {
        url: '/Category/Add'
    },
    actionlist: [],
    filterFieldList: [],
    thList: [
        { view: 'Type' },
        { view: 'Capacity' },
        
    ],
    tdList: [
        {
            view: '{{m.ResourceCapacityType.Name}}'
        },
        {
            view: '{{m.Capacity}}'
        },
    ],
    fieldList: [[
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Type', value: 'ResourceCapacityTypeId',
                list: 'ResourceCapacityTypeList', optid: 'Id', optlabel: ['Name']
            })
        },
        {
            view: setUIFields('model', 'number', { label: 'Capacity', value: 'Capacity' }), weight: 2
        }]

    ],
    use_filter: false,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/ResourceCapacity/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
