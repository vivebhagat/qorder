    
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetAllocationGroupList = function () {
        _appget($http,
            {
                url: api_url + '/api/AllocationGroup/GetAll',
                resp: function (response) { $scope.AllocationGroupList = response.data.Result; }
            });
    };
    $scope.GetAllocationGroupList();


};



var config =
{
    EntityName: 'Allocation Resource Maps',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Category/Add'
    },
    actionlist: [],
    filterFieldList: [],
    thList: [
        { view: 'Start Time' },
        { view: 'End Time' },
        { view: 'Allocation Group' },
    ],
    tdList: [
        {
            view: '{{m.StartTime}}'
        },
        {
            view: '{{m.EndTime}}'
        },
        {
            view: '{{m.AllocationGroup.Name}}'
        },

    ],
    fieldList: [[
        {
            view: setUIFields('model', 'timeonly', { label: 'Start Time', value: 'StartTime' }), weight: 2
        },
        {
            view: setUIFields('model', 'timeonly', { label: 'End Time', value: 'EndTime' }), weight: 2
        },
        {
            view:
                '<div><br><label><b>ALLOCATION GROUP</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.AllocationGroupId">' +
                '<option ng-value="model.AllocationGroupId" >' +
                '{{ model.AllocationGroup.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.AllocationGroupId", apply: 'model.AllocationGroup' },
            filter: { field: "AllocationGroupId", url: '/api/AllocationGroup/_postGetUIFiltered/', apply: 'AllocationGroup', name: 'Name' },
            btnLikeDisable: false, weight: 2
        }]

    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/AllocationResourceMap/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
