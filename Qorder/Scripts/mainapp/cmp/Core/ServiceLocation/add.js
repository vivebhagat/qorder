
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
    $scope.dateOpts = appSettings.dateOpts;
    $scope.dateOnlyOpts = appSettings.dateOnlyOpts;
    $scope.timeOnlyOpts = appSettings.timeOnlyOpts;
    $scope.GetCounterList = function () {
        _appget($http,
            {
                url: api_url + '/api/Counter/GetAll',
                resp: function (response) {
                    $scope.CounterList = response.data.Result;

                }
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
        _get($http, api_url + $scope.config.api_base + 'Get/?Id=' + $scope.param,
            $scope.ResetMessages,
            function (response) {
                $scope.model = response.data.Result;
                // $scope.applyDateFilter();
                $scope.showQR();
                $scope.GetPrint();

            },
            function (response) {
                $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
            },
            function (response) {
            });
    };
    function GNQRCode() {
        var qrtext = document.getElementById("qr-text").value;
        document.getElementById("qr-result").innerHTML = "QR code for " + qrtext + ":";
        alert(qrtext);
        qr.set({
            foreground: 'black',
            size: 200,
            value: qrtext
        });
    }



};

var config =
{
   
    EntityName: 'Tables',
    Mainctrl: Mainctrl,
    cols: 3,
    backbutton: {
        url: '/ServiceLocation/Index'
    },
    editurl: '/ServiceLocation/edit/?Id=',
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: '', weight: 6
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
            view: '',weight: 6
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
    template_url: '/scripts/app/cmp/add.html'
};


commonAddConfig(app, config, 'create');