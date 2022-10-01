
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



};



var config =
{

    EntityName: 'Kitchen Items',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/KitchenProduct/Add'
    },
    actionlist: [
        { url: '/KitchenProduct/Edit/?Id={Id}', Text: 'Edit', },
    ],
    filterFieldList: [],
    thList: [
        { view: 'Name' },
        { view: 'Time To Process' },



    ],
    tdList: [
        {
            view: '{{m.Name }}'
        },
        {
            view: '{{m.TimeToProcess }}'
        },


    ],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Time To Process', value: 'TimeToProcess' }), weight: 2
        },
    
    ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/KitchenProduct/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
