
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.$on('getEvent', function (event, data) {
        $scope.Get();
    });
    $scope.GetCounterList = function () {
        _appget($http,
            {
                url: api_url + '/api/Counter/GetAll',
                resp: function (response) { $scope.CounterList = response.data.Result; }
            });
    };
    $scope.GetCounterList();

    $scope.GetAllocationGroupList = function () {
        _appget($http,
            {
                url: api_url + '/api/AllocationGroup/GetAll',
                resp: function (response) { $scope.AllocationGroupList = response.data.Result; }
            });
    };
    $scope.GetAllocationGroupList();



    $scope.showQR = function () {
        var qr;
        qr = new QRious({
            element: document.getElementById('qr-code'),
            size: 300,
            value: $scope.model.Url,

        });
        var qr = document.getElementById('qr-code');
        var ctxqr = qr.getContext('2d');

        var can = document.getElementById('canvas1');
        var ctx = can.getContext('2d');
        const image = new Image();
        image.onload = () => {

            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, can.width, can.height);
            ctx.drawImage(image, 0, 0, 300, 150);

            ctx.drawImage(qr, 0, 150);
            var voucher = can.toDataURL();
            $("#qr-code-image").attr("src", voucher);
        };

        image.src = '/statics/logo.png';



        $scope.GetPrint = function () {
            var canvas = $("#canvas1")[0];
            var voucher = canvas.toDataURL();
            $("#qr-code-image").attr("src", voucher);
        }
        console.log(qr);
    };
    $scope.Get = function () {
        _appget($http, {
            url: api_url + $scope.config.api_base + 'Get/?Id=' + $scope.param,
            before: $scope.ResetMessages,
            resp: function (response) {
                $scope.model = response.data.Result;
                $scope.showQR();
                $scope.GetPrint();
            },
            eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
        });
    };

};

var Addctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
    $scope.dateOpts = appSettings.dateOpts;




    $scope.Add = function (m) {
        if (m == null) {
            $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
        }
        else {
            m.ServiceLocationId = $location.search().Id;
            _apppost($http, {
                url: api_url + $scope.config.api_base + 'Add', model: m,
                before: $scope.ResetMessages,
                resp: function (response) {
                    $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                    $scope.model = {};
                    $scope.model_id = response.data.Result;
                    $scope.Get();
                },
                eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
            });
        }
    };

    $scope.Edit = function (m) {

        if (m == null) {
            $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
        }
        else {
            if (typeof m.ExtraData != 'undefined') {
                m.LegacyNumber = JSON.stringify(m.ExtraData);
            }
            m.ServiceLocationId = $location.search().Id;
            _apppost($http, {
                url: api_url + $scope.config.api_base + 'Edit', model: m,
                before: $scope.ResetMessages,
                resp: function (response) {
                    $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                },
                eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
            });
        }
    };


    $scope.GetCounterList = function () {
        _appget($http,
            {
                url: api_url + '/api/Counter/GetAll',
                resp: function (response) { $scope.CounterList = response.data.Result; }
            });
    };
    $scope.GetCounterList();

    $scope.GetOrderedByList = function () {
        _appget($http,
            {
                url: api_url + '/api/BusinessUser/GetAll',
                resp: function (response) { $scope.OrderedByList = response.data.Result; }
            });
    };
    $scope.GetOrderedByList();


    $scope.GetOrderStatusList = function () {
        _appget($http,
            {
                url: api_url + '/api/OrderStatus/GetAll',
                resp: function (response) { $scope.OrderStatusList = response.data.Result; }
            });
    };
    $scope.GetOrderStatusList();

    $scope.GetBookingList = function () {
        _appget($http,
            {
                url: api_url + '/api/Booking/GetAll',
                resp: function (response) { $scope.BookingList = response.data.Result; }
            });
    };
    $scope.GetBookingList();





}



var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


    $scope.GetList = function () {
        _appget($http,
            {
                url: api_url + '/api/Order/GetActiveOrder/?Id=' + $location.search().Id,
                resp: function (response) {
                    $scope.MainList = response.data.Result;
                }
            });
    };

    $scope.sendEvent = function () {
        $scope.$emit('getEvent', []);
    };
};

var _config1 =
{

    EntityName: 'Active Orders',
    Mainctrl: Mainctrl,
    AddCtrl: Addctrl,
    onscreenAdd: false,
    onscreenEdit: false,
    enableDelete: true,
    use_filter: false,
    filterFieldList: [],
    extactionlist: [{ url: '/Order/OrderDetail/?Id={Id}', Text: 'Order Detail', },],
    thList: [
        { view: 'Name' },
        { view: 'Contact' },
        { view: 'Email' },
        { view: 'Date' },
        { view: 'Order Status' },
        { view: 'Counter' },
        { view: 'Booking' },
        { view: 'Table' },
        //{ view: 'Ordered By' },
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
       /* {
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
    fieldList: [[
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'AltName' }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Contact', value: 'AltContact' }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Email', value: 'AltEmail' }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Date', value: 'Date' }), weight: 2
        },
        {
            view: setUIFields('model', 'dropdown', {
                label: 'Order Status', value: 'OrderStatusId',
                list: 'OrderStatusList', optid: 'Id', optlabel: ['Name']
            }), weight: 2

        },
        {
            view:
                '<div><br><label><b>COUNTER</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.CounterId">' +
                '<option ng-value="model.CounterId" >' +
                '{{ model.Counter.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.CounterId", apply: 'model.Counter' },
            filter: { field: "CounterId", url: '/api/Counter/_postGetUIFiltered/', apply: 'Counter', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view:
                '<div><br><label><b>ORDERED BY</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.OrderedById">' +
                '<option ng-value="model.OrderedById" >' +
                '{{ model.OrderedBy.FirstName +" "+ model.OrderedBy.LastName}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.OrderedById", apply: 'model.OrderedBy' },
            filter: { field: "OrderedById", url: '/api/BusinessUser/_postGetUIFiltered/', apply: 'OrderedBy', name: 'FirstName' },
            btnLikeDisable: false, weight: 2
        },
        {
            view:
                '<div><br><label><b>BOOKING</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.BookingId">' +
                '<option ng-value="model.BookingId" >' +
                '{{ model.Booking.Id}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.BookingId", apply: 'model.Booking' },
            filter: { field: "BookingId", url: '/api/Booking/_postGetUIFiltered/', apply: 'BookingId', name: 'Id' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Tax', value: 'Tax' }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Total Without Tax', value: 'TotalWithoutTax' }), weight: 2
        },

        {
            view: setUIFields('model', 'text', { label: 'Total With Tax', value: 'TotalWithTax' }), weight: 2
        }]

    ],
    api_base: '/api/Order/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};



var config =
{
    EntityName: 'Tables',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'active_order' }],
    tabList: [
        { text: 'Active Orders', id: 'active_order' }
    ],
    onscreenAdd: false,
    cols: 3,
    backbutton: {
        url: '/ServiceLocation/index'
    },
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: '' ,weight: 6
        },
        {
            view:
                '<div><br><label><b>COUNTER</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.CounterId">' +
                '<option ng-value="model.CounterId" >' +
                '{{ model.Counter.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.CounterId", apply: 'model.Product' },
            filter: { field: "CounterId", url: '/api/Counter/_postGetUIFiltered/', apply: 'Counter', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view:
                '<div><br><label><b>ALLOCATION GROUP</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.AllocationGroupId">' +
                '<option ng-value="model.AllocationGroupId" >' +
                '{{ model.AllocationGroup.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.AllocationGroupId", apply: 'model.AllocationGroup' },
            filter: { field: "AllocationGroupId", url: '/api/AllocationGroup/_postGetUIFiltered/', apply: 'AllocationGroup', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'timeonly', { label: 'Start Time', value: 'StartTime' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'timeonly', { label: 'End Time', value: 'EndTime' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'number', { label: 'Max Orders', value: 'MaxNoOfOrders' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {

            view: ` <br><label><b> QR-CODE </b></label></br>
                     <img id="qr-code-image" style="Height:450px;Width:300px"/>
                     <div style="display:none;"><canvas  width="300" height="300" id="qr-code"> </canvas><canvas id="canvas1" width="300" height="450" style="border: 1px solid black"></canvas></div>`, weight: 2

        },
       /* {
            view: setUIFields('model', 'text', { label: 'Url', value: 'Url' }), weight: 11
        },*/

    ],
    api_base: '/api/ServiceLocation/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');

