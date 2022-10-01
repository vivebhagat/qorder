
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


};




var AddCtrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {


    $scope.showQR = function () {
        var qr;
        qr = new QRious({
            element: document.getElementById('qr-code'),
            size: 200,
            value: $scope.model.Name
        });

        console.log(qr);
    };

    $scope.Get = function () {
        _get($http, api_url + $scope.config.api_base + 'Get/?Id=' + $scope._model.Id,
            $scope.ResetMessages,
            function (response) {
                $scope.model = response.data.Result;
                // $scope.applyDateFilter();
                $scope.showQR();

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
    EntityName: 'Coupons',
    Mainctrl: Mainctrl,
    AddCtrl: AddCtrl,
    onscreenAdd: false,
    onPageAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {
        url: '/Coupon/Add'
    },
    actionlist: [

 
        { url: '/Coupon/Edit/?Id={Id}', Text: 'Edit' }

    ],
    filterFieldList: [],
    thList: [
        { view: 'Name' },
        { view: 'Value' },
        { view: 'Customer' },
        { view: 'Coupon Time Validity' },
        { view: 'Distributer Time Validity' },

    ],
    tdList: [
        {
            view:
                `{{m.Name}}`
        },
        {
            view:
                `{{m.Value}}`
        },
        {
            view: '{{m.Customer.Name}}'
        },
        {
            view:
                `{{m.CouponTimeValidity}}`
        },
        {
            view:
                `{{m.DistributerTimeValidity}}`
        },
   
      

    ],
    fieldList: [],
    use_filter: true,
    onscreenEdit: false,
    use_local_list: false,
    api_base: '/api/Coupon/',
    inlineEdit: false,
    template_url: "/Scripts/app/cmp/list.html"
};



commonListSetup(app, config, 'list');
