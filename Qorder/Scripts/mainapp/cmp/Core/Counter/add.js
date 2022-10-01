
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
  
    EntityName: 'Hotel Sections',
    Mainctrl: Mainctrl,
    cols: 1,
    backbutton: {
        url: '/Counter/Index'
    },
    editurl: '/Counter/edit/?Id=',
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },

        {
            view: '', weight: 6
        },

        {
            view: setUIFields('model', 'dropdown', {
                label: 'Organization', value: 'OrganizationId',
                list: 'OrganizationList', optid: 'Id',
                optlabel: ['Name']
            }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'text', { label: 'Url', value: 'Url' }), weight: 11
        },
    ],
    api_base: '/api/Counter/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');