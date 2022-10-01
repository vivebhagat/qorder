﻿
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

var config =
{
    EntityName: 'Staffs',
    Editctrl: Editctrl,
    backbutton: {
        url: '/Staff/Index'
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
    api_base: '/api/Staff/',
    template_url: "/Scripts/app/cmp/edit.html"
};

commonEditConfig(app, config, 'edit');
