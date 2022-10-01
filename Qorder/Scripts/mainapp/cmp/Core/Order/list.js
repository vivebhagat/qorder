
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



};



var config =
{
   
   
    EntityName: 'Orders',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    cols: 3,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete:true,
    addbutton: {
        url: '/Order/Add'
    },
    actionlist: [{
        url: '/Order/Edit/?Id={Id}', Text: 'Edit',

    },],
    filterFieldList: [],
    thList: [
        { view: 'Name' },
        { view: 'Contact' },
        { view: 'Email' },
        { view: 'Date' },
        { view: 'Order Status' },
        { view: 'Counter' },
        { view: 'Booking' },
        { view: 'Table' },
       // { view: 'Ordered By' },
        { view: 'Total Exc. Tax' },
        { view: 'Total Inc. Tax' },
        { view: 'Discount' },
       // { view: 'Is Complete' },
       // { view: 'Is Cancelled' },
    ],
    tdList: [
        {
            view: '{{m.AltName }}'
        },
        {
            view: '{{m.AltContact }}'
        },
        {
            view: '{{m.AltEmail }}'
        },
        {
            view: '<span style="white-space:nowrap !important;">{{m.Date}}</span>', weight: 2
        },
        {
            view:
                `{{m.OrderStatus.Name}}`
        },
        {
            view: '<span style="white-space:nowrap !important;">{{m.Counter.Name}}</span>', weight: 2
        },
        {
            view:
                `{{m.Booking.Id}}`
        },
        {
            view: '<span style="white-space:nowrap !important;">{{m.ServiceLocation.Name}}</span>', weight: 2
        },
      /*  {
            view:
                `{{m.OrderedBy.Name}}`
        },*/
        {
            view:
                `{{m.TotalWithoutTax}}`
        },
        {
            view:
                `{{m.TotalWithTax}}`
        },
        {
            view:
                `{{m.Discount}}`
        },
       /* {
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsComplete">`
        },
        {
           view: `<input type="checkbox"  onclick="return false" ng-model="m.IsCanclled">`
        },*/
    ],
    fieldList: [ ],
    use_filter: true,
    use_local_list: false,
    onscreenEdit: false,
    api_base: '/api/Order/',
    activable:false,
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
