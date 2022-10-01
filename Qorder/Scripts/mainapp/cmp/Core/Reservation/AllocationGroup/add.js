
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};

var config =
{

    EntityName: 'Allocation Group',
    Mainctrl: Mainctrl,
    cols: 2,
    backbutton: {
        url: '/AllocationGroup/Index'
    },
    editurl: '/AllocationGroup/edit/?Id=',
    actionlist: [],
    fieldList: [

        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },

    ],
    api_base: '/api/AllocationGroup/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'add');