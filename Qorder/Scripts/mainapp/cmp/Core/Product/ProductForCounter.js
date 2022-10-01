
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
    $scope.GetList = $scope.ProductList = function () {
        _get($http, api_url + '/api/Product/GetProductForCounter/?Id=' + $location.search().Id,
            function () { },
            function (response) { $scope.MainList = response.data.Result; },
            function (response) { },
            function (response) { }
        );
    };


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


    $scope.OrganizationList = function () {
        _get($http, api_url + '/api/Organization/GetAll',
            function () { },
            function (response) { $scope.OrganizationList = response.data.Result; },
            function (response) { },
            function (response) { }
        );
    };
    $scope.OrganizationList();


};



var config =
{
    View:
    {
        Entity: "Product"
    },
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    showParent: true,
    enable_history: true,
    history_text: 'Product',
    history_node: false,
    onscreenAdd: true,
    activable: true,
    backbutton: { show: true, url: "/Counter/Index" },
    parent_api_base: '/api/Counter/',
    parentFieldList: [
        {
            view: '<b>Id</b> : {{ parentModel.Id }}'
        },
        {
            view: '<b>Counter</b> : {{ parentModel.Name }}'
        }],
    addbutton: {
        url: '/Category/Add'
    },
    actionlist: [],
    filterFieldList: [],
    thList: [
        { view: 'Auto Id' },
        { view: 'Name' },
        { view: 'Organization' },
        { view: 'Amount' },
        { view: 'Discount' },
        { view: 'Sku' },

    ],
    tdList: [
        {
            view: '{{m.ApplicationNumber}}'
        },
        {
            view: `{{m.Name}}`
        },
        {
            view: `{{m.Organization.Name}}`
        },
        {
            view: `{{m.Amount}}`
        },
        {
            view: `{{m.Discount}}`
        },
        {
            view: `{{m.Sku}}`
        },

    ],
    fieldList: [

        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' })
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Organization', value: 'OrganizationId',
                list: 'OrganizationList', optid: 'Id',
                optlabel: ['Name']
            })
        },
        {
            view: setUIFields('model', 'number', { label: 'Amount', value: 'Amount' })
        },
        {
            view: setUIFields('model', 'number', { label: 'Discount', value: 'Discount' })
        },
        {
            view: setUIFields('model', 'text', { label: 'Sku', value: 'Sku' })
        },

    ],
    use_filter: false,
    use_local_list: true,
    onscreenEdit: true,
    api_base: '/api/Product/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
