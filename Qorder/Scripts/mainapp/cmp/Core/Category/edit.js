
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

    $scope.Add = function (m) {
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
    };


    $scope.GetProductList = function () {
        _appget($http,
            {
                url: api_url + '/api/Product/GetAll',
                resp: function (response) {
                    $scope.ProductList = response.data.Result;

                }
            });
    };
    $scope.GetProductList();

    $scope.GetCategoryList = function () {
        _appget($http,
            {
                url: api_url + '/api/Category/GetAll',
                resp: function (response) {
                    $scope.CategoryList = response.data.Result;

                }
            });
    };
    $scope.GetCategoryList();




}



var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetList = function () {
        _appget($http,
            {
                url: api_url + '/api/Product/GetProductForCategory/?Id=' + $location.search().Id,
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
        { view: 'Sku' },
      //{ view: 'Is Mapped' },
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
            view: '{{mProduct.Sku}}'
        },
        /*{
            view: `<input type="checkbox"  onclick="return false" ng-model="m.IsMapped">`
        },*/

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
        },
        {
            view: setUIFields('model', 'checkbox', { label: 'Is Mapped', value: 'IsMapped' }), weight: 2
        }]
    ],
    api_base: '/api/ProductCategory/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};


var config =
{
    EntityName: 'Categories',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'product_category' }],
    tabList: [
        { text: 'Products', id: 'product_category' }
    ],
    onscreenAdd: false,
    cols: 3,
    backbutton: {
        url: '/Category/index'
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
                label: 'ORGANIZATION', value: 'OrganizationId',
                list: 'OrganizationList', optid: 'Id', optlabel: ['Name']
            }), weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: ` <br><label><b> IMAGE </b> </label><br/>
                     <img src="{{model.Url}}" style="Height:150px;Width:150px"></img>`, weight: 2
        },
        {
            view: '', weight: 6
        },
        {
            view: setUIFields('model', 'text', { label: 'Url', value: 'Url' }), weight: 11
        },
        {
            view: setUIFields('model', 'textarea', { label: 'Description', value: 'Description' }), weight: 11
        }
    ],
    api_base: '/api/Category/',
    inlineEdit: true,
    template_url: '/scripts/app/cmp/edit.html'
};



commonEditConfig(app, config, 'edit');

