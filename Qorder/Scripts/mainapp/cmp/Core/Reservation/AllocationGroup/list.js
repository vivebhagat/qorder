
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};



var config =
{
    EntityName: 'Allocation Groups',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: false,
    onPageAdd:true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/AllocationGroup/Add'
    },
    actionlist: [
        { url: '/AllocationGroup/Edit/?Id={Id}', Text: 'Edit'},
    ],
    filterFieldList: [],
    thList: [
        { view: 'Name' },

    ],
    tdList: [
        {
            view: '{{m.Name}}'
        },

    ],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/AllocationGroup/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
