

var config =
{
    View:
    {
        Entity: "Dashoard"
    },
    onscreenAdd: true,
    addbutton: {
        url: '/Dashoard/Add'
    },
    actionlist: [{ url: '/Home/DashboardView/?Id={Id}', Text: 'View' }, { url: '/Home/setup/?Id={Id}', Text: 'Setup' }],
    thList: [{ view: 'Name' }, { view: 'Inactive' }],
    tdList: [{
        view: '<input class="form-control input-sm" ng-model="m.Name">'
    },
    {
        view: `<input type="checkbox" class="form-check-input" ng-model="model.Inactive" />`

    }
    ],
    fieldList: [{
        view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }) 
    },
    {
        view: setUIFields('model', 'checkbox', { label: 'Inactive', value: 'Inactive' })          
    }
    ],
    api_base: '/api/Dashboard/',
    inlineEdit: true,
    template_url: _sfconstant.default_list_template_path
};


var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
};