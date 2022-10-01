
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};



var config =
{
    EntityName: 'Process Booths',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    cols:3,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/ProcessBooth/Add'
    },
    actionlist: [{

        url: '/ProcessBooth/Edit/?Id={Id}', Text: 'Edit',
    } ],
    filterFieldList: [],
    thList: [
        { view: 'Name' },
        { view: 'Kicthen Booth' },
        { view: 'Packing Booth'},

    ],
    tdList: [
        {
            view: `{{m.Name}}`
        },
        {
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsKitchen">`
        },
        {
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsPacking">`
        },
   
    ],
    fieldList: [ ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/ProcessBooth/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
