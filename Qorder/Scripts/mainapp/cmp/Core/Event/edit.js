
var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
    $scope.dateOpts = appSettings.dateOnlyOpts;
    console.log($scope.dateOnlyOpts);

};

var Editctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.dateOpts = appSettings.dateOnlyOpts;
    console.log($scope.dateOnlyOpts);

    $scope.map_url_1 = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15080.724302905392!2d";// + 151.10050661398583 +
    $scope.map_url_2 = "!3d"; // + -33.9621937181618 +
    $scope.map_url_3 = "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1615368535204!5m2!1sen!2sin";

    $scope.map_url = "";
    $scope.showmap = function initMap() {
        $scope.location = { lat: -25.363, lng: 131.044 };
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: $scope.location
        });
        $scope.marker = new google.maps.Marker({
            position: $scope.location,
            animation: google.maps.Animation.DROP,
            map: $scope.map
        });
    }



    $scope.Get = function () {
        _appget($http, {
            url: api_url + $scope.config.api_base + 'Get/?Id=' + $scope.param,
            before: $scope.ResetMessages,
            resp: function (response) {
                $scope.model = response.data.Result;

                var map_url = $scope.map_url_1 + $scope.model._lat + $scope.map_url_2 + $scope.model._long + $scope.map_url_3;
                var map_frame = document.getElementById("map_frame");
                map_frame.innerHTML = `
                <iframe src="`+ map_url + `"
                    width="600" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
                // $scope.showmap();
            },
            eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
        });
    };
};

var _config1 =
{
    EntityName: 'usiness Users',
    onscreenAdd: true,
    activable: false,
    addbutton: {
        url: '/Category/Add'
    },
    Mainctrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
        $scope.GetList = $scope.MessageTemplateList = function () {
            _get($http, api_url + '/api/EventToBusinessUserMap/GetEventToBusinessUserMapForEvent/?Id=' + $location.search().Id,
                function () { },
                function (response) { $scope.MainList = response.data.Result; },
                function (response) { },
                function (response) { }
            );
        };
    },

    AddCtrl: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {
    },

    actionlist: [],
    thList: [
        { view: 'Auto Id' },
        { view: 'Event' },
        { view: 'Business User' },
    ],
    tdList: [
        {
            view: '{{m.ApplicationNumber}}'
        },
        {
            view: '{{m.BusinessUser.Name}}'
        },

    ],
    fieldList: [[
        {
            view:
                '<div><br><label>BusinessUser</label>' +
                '<div class="row"><div class="input-group"><searchbar input="f"></searchbar><select class="form-select" ng-model="model.BusinessUserId">' +
                '<option ng-value="model.BusinessUserId" >' +
                '{{ model.BusinessUser.Name}}' +
                '</option>' +
                '</select></div></div></div>',
            apply_filter_list: true,
            load: { field: "model.BusinessUserId", apply: 'model.BusinessUser' },
            filter: { field: "BusinessUserId", url: '/api/BusinessUser/_postGetUIFiltered/', apply: 'BusinessUser', name: 'Name' },
            btnLikeDisable: false, weight: 2
        }]
    ],
    use_filter: false,
    api_base: '/api/EventToBusinessUserMap/',
    inlineEdit: false,
    onscreenEdit: true,
    popupEdit: false,
    template_url: '/Scripts/app/cmp/list.html'
};
var config =
{
    EntityName: 'Events',
    Editctrl: Editctrl,
    childListConfigs: [
        { config: _config1, tab: 'event_to_business_user_map'},
    ],
    tabList: [
        { text: 'Business User', id: 'event_to_business_user_map' },
    ],
    cols: 3,
    backbutton: {
        url: '/Event/Index'
    },
    actionlist: [],
    fieldList: [
        {
            view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
        },
        {
            view: setUIFields('model', 'dateonly', { label: 'Event Date', value: 'EventDate' }), weight: 2
        },
        {
            view: setUIFields('model', 'textarea', { label: 'Agenda', value: 'Agenda', }), weight: 2
        },
        {
            view: '', weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: '_lat', value: '_lat' }), weight: 2
        },
        {
            view: setUIFields('model', 'number', { label: '_long', value: '_long' }), weight: 2
        },
        {
            view: setUIFields('model', 'text', { label: 'Image Url', value: 'Url' }), weight: 2
        },
        {
            view: '', weight: 2
        },
        {
            view: ` <br><label><b> IMAGE  </b> </label><br/>
                     <img src="{{model.Url}}" style="Height:150px;Width:150px"></img>`, weight: 2
        },
        {
            view: `<br><label><b> Location </b></label></br>
                    <div id="map_frame"></div>`, weight: 2
        },
        {
            view: setUIFields('model', 'textarea', { label: 'Desciption', value: 'Desciption', }), weight: 11
        },

    ],
    api_base: '/api/Event/',
    inlineEdit: true,
    template_url: "/Scripts/app/cmp/edit.html"
};

commonEditConfig(app, config, 'edit');