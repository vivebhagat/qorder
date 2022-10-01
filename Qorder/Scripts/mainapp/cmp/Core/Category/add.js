
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.GetOrganizationList = function () {
        _appget($http,
            {
                url: api_url + '/api/Organization/GetAll',
                resp: function (response) {
                    $scope.OrganizationList = response.data.Result;

                }
            });
    };
    $scope.GetOrganizationList();


};

var config =
{
   
    EntityName: 'Categories',
    Mainctrl: Mainctrl,
    cols: 3,
    backbutton: {
        url: '/Category/Index'
    },
    editurl: '/Category/edit/?Id=',
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
                label: 'ORGANIZATION', value: 'OrganizationId',
                list: 'OrganizationList', optid: 'Id', optlabel: ['Name']
            }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: ` <br><label><b> IMAGE </b> </label><br/>
                     <img src="{{model.Url}}" style="Height:150px;Width:150px"></img>`, weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Url', value: 'Url' }), weight: 11
        },
        {
            view: setUIFields('model', 'textarea', { label: 'Description', value: 'Description' }), weight: 11
        }],
    api_base: '/api/Category/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');