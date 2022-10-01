
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.GetOrganizationList = function () {        
        _appget($http,
            {
                url: api_url + '/api/Organization/GetAll',
                resp: function (response) { $scope.OrganizationList = response.data.Result; }
            });
    };
    $scope.GetOrganizationList();


};

var config =
{
 
    EntityName: 'Kitchen Items',
    Mainctrl: Mainctrl,
    cols: 2,
    backbutton: {
        url: '/KitchenProduct/Index'
    },
    editurl: '/KitchenProduct/edit/?Id=',
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: '', weight: 6
        },
      
        {
            view: setUIFields('model', 'number', { label: 'Time To Process', value: 'TimeToProcess' }), weight: 2
        },
        {
            view: setUIFields('model', 'textarea', { label: 'Description', value: 'Description' }), weight: 11
        },
    ],
    api_base: '/api/Counter/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');