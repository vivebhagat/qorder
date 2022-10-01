
var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {



    $scope.GetOrganizationList = function () {
        _appget($http,
            {
                url: api_url + '/api/Organization/GetAll',
                resp: function (response) {
                    $scope.OrganizationList = response.data.Result;
                }
            });
    };
    $scope.GetOrganizationList();

    $scope.CreateLogin = function () {
        _apppost($http,
            {
                url: api_url + '/api/IntUser/CreateLoginFor',
                model: $scope.model
            });
    };

};

var _config1 =
{

    EntityName: 'Inventory Items',
    onscreenAdd: true,
    onscreenEdit: true,
    use_filter: false,
    popupEdit: false,
    addbutton: {
        url: '/Category/Add'
    },
    filterFieldList: [],
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.GetList = function () {
            _appget($http,
                {
                    url: api_url + '/api/VendorToInventoryItemMap/GetInventoryItemForVendor/?Id=' + $location.search().Id,
                    resp: function (response) {
                        $scope.MainList = response.data.Result;
                    }
                });
        };


        $scope.sendEvent = function () {
            $scope.$emit('getEvent', []);
        };
    },
    AddCtrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

        $scope.dateOpts = appSettings.dateOpts;

        $scope.Add = function (m) {

            if (m == null) {
                $scope.DefaultMessage.ErrorMessage = 'No details recieved.';
            }
            else {
                m.InventoryItemId = $location.search().Id;
                _apppost($http,
                    {
                        url: api_url + $scope.config.api_base + 'Add',
                        model: m,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.model = {};
                            $scope.cancel();
                        },
                        eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                    });
            }
        };

        $scope.Edit = function (m) {
            if (m == null) {
                $scope.DefaultMessage.ErrorMessage = 'No details recieved.';
            }
            else {
                m.InventoryItemId = $location.search().Id;
                _apppost($http,
                    {
                        url: api_url + $scope.config.api_base + 'Edit',
                        model: m,
                        before: $scope.ResetMessages,
                        resp: function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.model = {};
                            $scope.cancel();
                            $scope.parent.sendEvent();
                            console.log($scope);
                        },
                        eresp: function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        }
                    });
            }
        };

        $scope.GetVendorList = function () {
            _appget($http,
                {
                    url: api_url + '/api/Vendor/GetAll',
                    resp: function (response) { $scope.VendorList = response.data.Result; }
                });
        };
        $scope.GetVendorList();


    },
    actionlist: [],
    thList: [
        { view: 'Inventory Item' },
        { view: 'Price' },
    ],
    tdList: [

        {
            view:
                `{{m.InventoryItem.Name}}`
        },
        {
            view:
                `{{m.Price}}`
        },

    ],
    fieldList: [
        {
            view:
                '<div><br><label><b>INVENTORY ITEM</b></label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.InventoryItemId">' +
                '<option ng-value="model.InventoryItemId" >' +
                '{{ model.InventoryItem.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.InventoryItemId", apply: 'model.InventoryItem' },
            filter: { field: "InventoryItemId", url: '/api/InventoryItem/_postGetUIFiltered/', apply: 'InventoryItem', name: 'Name' },
            btnLikeDisable: false, weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: 'Price', value: 'Price' }), weight: 2
        },

    ],
    api_base: '/api/VendorToInventoryItemMap/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};

var config =
{
    EntityName: 'Vendors',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'vendor_to_inventory_item_map' },],
    tabList: [
        { text: 'Inventory Items ', id: 'vendor_to_inventory_item_map' },
    ],
    backbutton: {
        url: '/Vendor/Index'
    },
    btnList: [{name:'Create Login', action:'CreateLogin'}],
    actionlist: [],
    fieldList: [{
        view: setUIFields('model', 'text', { label: 'First Name', value: 'FirstName' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Last Name', value: 'LastName' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'User Name', value: 'Name' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Email', value: 'Email' }), weight: 2
    },
    {
        view: setUIFields('model', 'dateonly', { label: 'DOB', value: 'DOB' }), weight: 2

    },
    {
        view: setUIFields('model', 'textarea', { label: 'Address1', value: 'Address1' }), weight: 2
    },
    {
        view: setUIFields('model', 'textarea', { label: 'Address2', value: 'Address2' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Country', value: 'Country' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Postcode', value: 'PostCode' }), weight: 2
    },
    ],
    api_base: '/api/Vendor/',
    template_url: "/Scripts/app/cmp/edit.html"
};

commonEditConfig(app, config, 'edit');
