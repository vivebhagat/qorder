
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {




    $scope.GetEventList = function () {
        _appget($http,
            {
                url: api_url + '/api/Event/GetAll',
                resp: function (response) { $scope.ProductList = response.data.Result; }
            });
    };
    $scope.GetEventList();

    $scope.GetBusinessUserList = function () {
        _appget($http,
            {
                url: api_url + '/api/BusinessUser/GetAll',
                resp: function (response) { $scope.BusinessUserList = response.data.Result; }
            });
    };
    $scope.GetBusinessUserList();


};



var config =
{
    EntityName: 'Event To BusinessUser Maps',
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
        { view: 'Event' },
        { view: 'BusinessUser' },
    ],
    tdList: [
        {
            view: '{{m.Event.Name}}'
        },
        {
            view: '{{m.BusinessUser.Name}}'
        },

    ],
    fieldList: [[
        {
            view:
                '<div><br><label><b>EVENT</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.EventId">' +
                '<option ng-value="model.EventId" >' +
                '{{ model.Event.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.EventId", apply: 'model.Event' },
            filter: { field: "EventId", url: '/api/Event/_postGetUIFiltered/', apply: 'Event', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view:
                '<div><br><label><b>BUSINESS USER</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.BusinessUserId">' +
                '<option ng-value="model.BusinessUserId" >' +
                '{{ model.BusinessUser.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.BusinessUserId", apply: 'model.BusinessUser' },
            filter: { field: "BusinessUserId", url: '/api/BusinessUser/_postGetUIFiltered/', apply: 'BusinessUser', name: 'Name' },
            btnLikeDisable: false, weight: 2
        }]
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/EventToBusinessUserMap/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
