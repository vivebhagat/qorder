
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.$on('getEvent', function (event, data) {
        $scope.Get();
    });

    $scope.GetOrganizationList = function () {
        _appget($http,
            {
                url: api_url + '/api/Organization/GetAll',
                resp: function (response) { $scope.OrganizationList = response.data.Result; }
            });
    };
    $scope.GetOrganizationList();


    $scope.showQR = function () {
        var qr;
        qr = new QRious({
            element: document.getElementById('qr-code'),
            size: 200,
            value: $scope.model.Url + $scope.model.Id,

        });
        $scope.GetPrint = function () {
            var canvas = $("#qr-code")[0];
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




var Addctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
    $scope.dateOpts = appSettings.dateOpts;

    $scope.Add = function (m) {
        if (m == null) {
            $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
        }
        else {
            m.CounterId = $location.search().Id;
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
            m.CounterId = $location.search().Id;
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


    $scope.GetProductList = function () {
        _appget($http,
            {
                url: api_url + '/api/Product/GetAll',
                resp: function (response) { $scope.ProductList = response.data.Result; }
            });
    };
    $scope.GetProductList();
}



var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetList = function () {
        _appget($http,
            {
                url: api_url + '/api/CounterProduct/GetCounterProductForCounter/?Id='  + $location.search().Id,
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

    EntityName: 'Products',
    Mainctrl: Mainctrl,
    AddCtrl: Addctrl,
    onscreenAdd: true,
    onscreenEdit: true,
    use_filter: false,
    popupEdit: false,
    enableDelete: true,
    filterFieldList: [],
    actionlist: [],
    thList: [
        { view: 'Product' },
        { view: 'Amount' },
        { view: 'Discount' },
        { view: 'Tax Code' },
        { view: 'Sku' }
    ],
    tdList: [
        {
            view: '{{m.Product.Name}}'
        },
        {
            view: '{{m.Product.Amount}}'
        },
        {
            view: '{{m.Product.Discount}}'
        },
        {
            view: '{{m.Product.TaxCode.Name}}'
        },
        {
            view: '{{m.Product.Sku}}'
        },

    ],
    fieldList: [[
        {
            view:
                '<div><br><label>PRODUCT</label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.ProductId">' +
                '<option ng-value="model.ProductId" >' +
                '{{ model.Product.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.ProductId", apply: 'model.Product' },
            filter: { field: "ProductId", url: '/api/Product/_postGetUIFiltered/', apply: 'Product', name: 'Name' },
            btnLikeDisable: false, weight: 2
        }]

    ],
    api_base: '/api/CounterProduct/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};


var config =
{
    EntityName: 'Hotel Sections',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'counter_product' }],
    tabList: [
        { text: 'Products', id: 'counter_product' }
    ],
    onscreenAdd: false,
    cols: 2,
    backbutton: {
        url: '/Counter/index'
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
            view: setUIFields('model', 'dropdown', {
                label: 'Organization', value: 'OrganizationId',
                list: 'OrganizationList', optid: 'Id',
                optlabel: ['Name']
            }), weight: 2
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
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'text', { label: 'Url', value: 'Url' }), weight: 11
        },

    ],
    api_base: '/api/Counter/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');

