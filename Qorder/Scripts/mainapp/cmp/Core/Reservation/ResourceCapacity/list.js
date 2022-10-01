
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


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


};



var config =
{
    EntityName: 'Resource Capacities',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: true,
    activable: true,
    addbutton: {
        url: '/Category/Add'
    },
    actionlist: [],
    filterFieldList: [],
    thList: [
        { view: 'Capacity' },
        { view: 'Type' },
        { view: 'Allocation Resource Map' },
    ],
    tdList: [
        {
            view: '{{m.Capacity}}'
        },
        {
            view: '{{m.ResourceCapacityType.Name}}'
        },
        {
            view: '{{m.AllocationResourceMap.Id}}'
        },
      

    ],
    fieldList: [[
        {
            view: setUIFields('model', 'number', { label: 'Capacity', value: 'Capacity' }), weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Capacity Type', value: 'ResourceCapacityTypeId',
                list: 'ResourceCapacityTypeList', optid: 'Id', optlabel: ['Name']
            })
        },
        {
            view:
                '<div><br><label><b>ALLOCATIO RESOURCE MAP</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.AllocationResourceMapId">' +
                '<option ng-value="model.AllocationResourceMapId" >' +
                '{{ model.AllocationResourceMap.Id}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.AllocationResourceMapId", apply: 'model.AllocationResourceMap' },
            filter: { field: "AllocationResourceMapId", url: '/api/AllocationResourceMap/_postGetUIFiltered/', apply: 'AllocationResourceMap', name: 'Name' },
            btnLikeDisable: false, weight: 2
        }]

    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/ResourceCapacity/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
