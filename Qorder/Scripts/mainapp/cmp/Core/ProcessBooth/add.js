
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {




};

var config =
{

    EntityName: 'Process Booths',
    Mainctrl: Mainctrl,
    cols: 2,
    backbutton: {
        url: '/ProcessBooth/Index'
    },
    editurl: '/ProcessBooth/edit/?Id=',
    actionlist: [],
    fieldList: [

        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'checkbox', { label: 'Is Kitchen', value: 'IsKitchen' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'checkbox', { label: 'Is Packing', value: 'IsPacking' }), weight: 2
        },

    ],
    api_base: '/api/ProcessBooth/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');