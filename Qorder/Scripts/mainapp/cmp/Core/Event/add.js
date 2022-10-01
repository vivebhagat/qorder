


var Mainctrl = function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

    $scope.ResetMessage = function () {
        $scope.DefaultMessage = new _message();
    };
    $scope.Add = function () {
        _post($http, api_url + '/api/Event/Add',
            $scope.model,
            $scope.ResetMessage,
            function (response) {

                window.location = base_url + '/Event/Edit/?Id=' + response.data.Result;
            },
            function (response) {
                $scope.DefaultMessage = response.data.ErrorMessage;
            },
            function (response) {
            });
    };

};

var config =
{
    EntityName: 'Events',
    Mainctrl: Mainctrl,
    cols: 2,
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
            view: setUIFields('model', 'textarea', { label: 'Desciption', value: 'Desciption', }), weight: 11
        },
    ],
    api_base: '/api/Event/',
    template_url: "/Scripts/app/cmp/add.html"
};


commonAddConfig(app, config, 'add');