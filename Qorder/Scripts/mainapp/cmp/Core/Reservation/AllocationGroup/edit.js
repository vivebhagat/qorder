
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.$on('getEvent', function (event, data) {
        $scope.Get();
    });



};



var _config1 =
{
    EntityName: 'Time Slots',
    onscreenAdd: true,
    onscreenEdit: true,
    use_filter: false,
    popupEdit: false,
    enableDelete: true,
    activable:false,
    extactionlist: [
        { url: '/ResourceCapacity/ResourceCapacitiesForAllocationResourceMap/?Id={Id}', Text: 'Resource Capacity' },
    ],
    filterFieldList: [],
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.GetList = function () {
            _appget($http,
                {
                    url: api_url + '/api/AllocationResourceMap/GetAllocationResourceMapForAllocationGroup/?Id=' + $location.search().Id,
                    resp: function (response) {
                        $scope.MainList = response.data.Result;
                    }
                });
        };


        $scope.sendEvent = function () {
            $scope.$emit('getEvent', []);
        };
    },
    AddCtrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.dateOpts = appSettings.dateOpts;
        $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
        $scope.timeOnlyOpts = appSettings.timeOnlyOpts;

        $scope.Add = function (m) {
            if (m == null) {
                $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
            }
            else {
                m.AllocationGroupId = $location.search().Id;
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
                m.AllocationGroupId = $location.search().Id;
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

        $scope.GetAllocationGroupList = function () {
            _appget($http,
                {
                    url: api_url + '/api/AllocationGroup/GetAll',
                    resp: function (response) { $scope.AllocationGroupList = response.data.Result; }
                });
        };
        $scope.GetAllocationGroupList();



    },
    thList: [
        { view: 'Start Time' },
        { view: 'End Time' },
    ],
    tdList: [
        {
            view: '{{m.StartTime}}'
        },
        {
            view: '{{m.EndTime}}'
        },

    ],
    fieldList: [[
        {
            view: setUIFields('model', 'timeonly', { label: 'Start Time', value: 'StartTime' }), weight: 2
        },
        {
            view: setUIFields('model', 'timeonly', { label: 'End Time', value: 'EndTime' }), weight: 2
        }]
    ],
    api_base: '/api/AllocationResourceMap/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var config =
{

    EntityName: 'Allocation Group',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'allocation_resource_map' },],
    tabList: [
        { text: 'Time Slots', id: 'allocation_resource_map' },
    ],
    onscreenAdd: false,
    cols: 3,
    backbutton: {
        url: '/AllocationGroup/index'
    },
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
    ],
    api_base: '/api/AllocationGroup/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');

