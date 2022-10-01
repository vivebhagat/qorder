
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


};




var Addctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
    $scope.dateOpts = appSettings.dateOpts;

   /* $scope.Add = function (m) {
        if (m == null) {
            $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
        }
        else {
            m.CategoryId = $location.search().Id;
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
            m.CategoryId = $location.search().Id;
            _apppost($http, {
                url: api_url + $scope.config.api_base + 'Edit', model: m,
                before: $scope.ResetMessages,
                resp: function (response) {
                    $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                },
                eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
            });
        }
    };*/
}



var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



  /*  $scope.GetList = function () {
        _appget($http,
            {
                url: api_url + '/api/CounterProduct/GetCounterProductForCounter/?Id='  + $location.search().Id,
                resp: function (response) {
                    $scope.MainList = response.data.Result;
                }
            });
    };*/

  
    $scope.sendEvent = function () {
        $scope.$emit('getEvent', []);
    };
};

/*var _config1 =
{
    View:
    {
        Entity: "Product"
    },
    Mainctrl: Mainctrl,
    AddCtrl: Addctrl,
    onscreenAdd: true,
    onscreenEdit: true,
    use_filter: false,
    popupEdit: false,
    filterFieldList: [],
    actionlist: [],
    thList: [
        { view: 'Auto Id' },
        { view: 'Product' },
        { view: 'Amount' },
        { view: 'Discount' },
        { view: 'Sku' }
    ],
    tdList: [
        {
            view: '{{m.ApplicationNumber}}'
        },
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
            view: '{{m.Product.Sku}}'
        },

    ],
    fieldList: [
        {
            view:
                '<div><br><label>Product</label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.ProductId">' +
                '<option ng-value="model.ProductId" >' +
                '{{ model.Product.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.ProductId", apply: 'model.Product' },
            filter: { field: "ProductId", url: '/api/Product/_postGetUIFiltered/', apply: 'Product', name: 'Name' },
            btnLikeDisable: false
        },

    ],
    api_base: '/api/CounterProduct/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};*/


var config =
{
    EntityName: 'Kitchen Items',
    Editctrl: Editctrl,
    onscreenAdd: false,
    cols: 2,
    backbutton: {
        url: '/KitchenProduct/index'
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
            view: setUIFields('model', 'number', { label: 'Time To Process', value: 'TimeToProcess' }), weight: 2
        },
        {
            view: setUIFields('model', 'textarea', { label: 'Description', value: 'Description' }), weight: 11
        },
     
    ],
    api_base: '/api/KitchenProduct/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');

