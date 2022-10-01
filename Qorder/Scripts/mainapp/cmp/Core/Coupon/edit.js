
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
    $scope.dateOpts = appSettings.dateOpts;
    console.log($scope.dateOpts);

};

var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.dateOpts = appSettings.dateOpts;
    console.log($scope.dateOpts);

    $scope.showQR = function () {
        var qr;
        qr = new QRious({
            element: document.getElementById('qr-code'),
            size: 200,
            value: $scope.model.Name
        });
        $scope.GetPrint = function () {
            var canvas = $("#qr-code")[0];
            var voucher = canvas.toDataURL();
            $("#qr-code-image").attr("src", voucher);
        }
        console.log(qr);
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


/*var _config1 =
{
    View:
    {
        Entity: "Mapped Merchants"
    },
    onscreenAdd: true,
    activable: false,
    addbutton: {
        url: '/Category/Add'
    },
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
        $scope.GetList = $scope.MerchantList = function () {
            _get($http, api_url + '/api/CouponToMerchantMapping/GetMappedMerchantForCoupon/?Id=' + $location.search().Id,
                function () { },
                function (response) { $scope.MainList = response.data.Result; },
                function (response) { },
                function (response) { }
            );
        };
    },
    AddCtrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


        $scope.GetCouponList = function () {
            _get($http, api_url + '/api/Coupon/GetAll',
                function () { },
                function (response) { $scope.CouponList = response.data.Result; },
                function (response) { },
                function (response) { }
            );
        };
        $scope.GetCouponList();

        $scope.GetMerchant = function (Id) {

            var selectedCoupon;
            for (i = 0; i < $scope.CouponList.length; i++) {
                if ($scope.CouponList[i].Id == Id) {
                    selectedCoupon = $scope.CouponList[i];
                }
            }

            _get($http, api_url + '/api/Merchant/GetMappableMerchantForMerchant/?Id=' + selectedCoupon.MerchantId,
                function () { },
                function (response) { $scope.MerchantList = response.data.Result; },
                function (response) { },
                function (response) { }
            );
        };

  
    },
    actionlist: [],
    thList: [
        { view: 'Auto Id' },
        { view: 'Coupon' },
        { view: 'Merchant' },
        { view: 'Total Volume' },
        { view: 'Assigned Volume' },
   

    ],
    tdList: [
        {
            view: '{{m.ApplicationNumber}}'
        },
        {
            view: '{{m.Coupon.Name}}'
        },
        {
            view: '{{m.AssignedTo.LocalName}}'
        },
        {
            view:
                `{{m.TotalVolume}}`
        },
        {
            view:
                `{{m.AssignedVolume}}`
        },
     
    ],
    fieldList: [
        {
            view: `<label> Coupon </label>
            <select class= "form-select" ng-readonly="all" ng-change="GetMerchant(model.CouponId)" ng-model="model.CouponId"> 
                <option ng-repeat="o in CouponList" ng-value="o.Id" >
                {{ o.Name}}
                </option>
                </select>`
        },
        {
            view: `<label> Merchant </label>
            <select class= "form-select" ng-model="model.AssignedToId"> 
                <option ng-repeat="o in MerchantList" ng-value="o.Id" >
                {{ o.LocalName}}
                </option>
                </select>`
        },

        {
            view: `<label> Total Volume </label>
            <input class="form-control" ng-model="model.TotalVolume">`
        },
        {
            view: `<label> Assigned Volume </label>
            <input class="form-control" ng-model="model.AssignedVolume">`
        },
    
    ],
    use_filter: false,
    api_base: '/api/CouponToMerchantMapping/',
    inlineEdit: false,
    onscreenEdit: true,
    popupEdit: false,
    template_url: '/Scripts/app/cmp/list.html'
};*/
var config =
{
    EntityName: 'Coupons',
    Editctrl: Editctrl,
    cols: 3,
    backbutton: {
        url: '/Coupon/Index'
    },
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'text', { label: 'Value', value: 'Value' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view:
                '<div><br><label><b>CUSTOMER</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.CustomerId">' +
                '<option ng-value="model.CustomerId" >' +
                '{{ model.Customer.FirstName +" "+ model.Customer.LastName}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.CustomerId", apply: 'model.Customer' },
            filter: { field: "CustomerId", url: '/api/BusinessUser/_postGetUIFiltered/', apply: 'Customer', name: 'FirstName' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'dateonly', { label: 'DISTRIBUTER TIME VALIDITY', value: 'DistributerTimeValidity' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'dateonly', { label: 'COUPON TIME VALIDITY', value: 'CouponTimeValidity' }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {

            view: ` <br><label><b> QR-CODE </b></label></br>
                     <img id="qr-code-image" style="Height:150px;Width:150px"/>
                     <div style="display:none;"><canvas id="qr-code"> </canvas></div>`, weight: 2

        },

        {
            view: setUIFields('model', 'textarea', { label: 'Description', value: 'Description' }), weight: 11
        },
        {
            view: '', weight: 6
        },

    ],
    api_base: '/api/Coupon/',
    inlineEdit: true,
    template_url: "/Scripts/app/cmp/edit.html"
};




commonEditConfig(app, config, 'edit');