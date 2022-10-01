
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {




};





var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {








};



var config =
{
    EntityName: 'Events',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: false,
    onPageAdd:true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Event/Add'
    },
    actionlist: [
        { url: '/Event/Edit/?Id={Id}', Text: 'Edit' },
    ],
    filterFieldList: [],
    thList: [
        { view: 'Name' },
        { view: 'Event Date' },
        { view: 'Agenda' },
    ],
    tdList: [
        {
            view: `{{m.Name}}`
        },

        {
            view: `{{m.EventDate}}`
        },
        {
            view: `{{m.Agenda}}`
        },
      

    ],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: setUIFields('model', 'timeonly', { label: 'Event Date', value: 'EventDate' }), weight: 2
        },

        {
            view: setUIFields('model', 'textarea', { label: 'Agenda', value: 'Agenda' }), weight: 2
        },
    
        {
            view: setUIFields('model', 'number', { label: '_lat', value: '_lat' }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: '_long', value: '_long' }), weight: 2
        },

    ],
    use_filter: true,
    onscreenEdit: false,
    use_local_list: false,
    api_base: '/api/Event/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
