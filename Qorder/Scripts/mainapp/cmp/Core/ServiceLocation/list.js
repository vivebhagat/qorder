
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.GetCounterList = function () {
        _appget($http,
            {
                url: api_url + '/api/Counter/GetAll',
                resp: function (response) { $scope.CounterList = response.data.Result; }
            });
    };
    $scope.GetCounterList();


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
    EntityName: 'Tables',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: false,
    onPageAdd: true,
    enableDelete: true,
    activable: true,
    addbutton: {
        url: '/ServiceLocation/Add'
    },
    actionlist: [
        { url: '/ServiceLocation/Edit/?Id={Id}', Text: 'Edit', },
    ],
    filterFieldList: [],
    thList: [
        { view: 'Name' },
        { view: 'Counter' },
        { view: 'Allocation Group' },
        { view: 'Start Time' },
        { view: 'End Time' },
        { view: 'Max No. Of Orders' },

    ],
    tdList: [
        {
            view: `{{m.Name}}`
        },
        {
            view: `{{m.Counter.Name}}`
        },
        {
            view: `{{m.AllocationGroup.Name}}`
        },
        {
            view: `{{m.StartTime}}`
        },
        {
            view: `{{m.EndTime}}`
        },
        {
            view: `{{m.MaxNoOfOrders}}`
        },
    ],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view:
                '<div><br><label><b>COUNTER</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.CounterId">' +
                '<option ng-value="model.CounterId" >' +
                '{{ model.Counter.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.CounterId", apply: 'model.Counter' },
            filter: { field: "CounterId", url: '/api/Counter/_postGetUIFiltered/', apply: 'Counter', name: 'Name' },
            btnLikeDisable: false, weight: 2
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
        },
        {
            view: setUIFields('model', 'timeonly', { label: 'Start Time', value: 'StartTime' }), weight: 2
        },
        {
            view: setUIFields('model', 'timeonly', { label: 'End Time', value: 'EndTime' }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Max Orders', value: 'MaxNoOfOrders' }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Url', value: 'Url' }), weight: 2
        },
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/ServiceLocation/',
    inlineEdit: false,
    template_url: "/scripts/mainapp/cmp/core/servicelocation/list.html"
};



commonListSetup(app, config, 'list');
