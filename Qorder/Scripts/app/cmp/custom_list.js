
var config = {
    template_url: '/Scripts/app/cmp/custom_list.html',
    onscreenAdd: true
};

(function (app, config) {

    app.component('list', {
        controller: function ($scope, $sce, $rootScope, $location, $http, defaultService, authService) {

            $scope.FormName = '';

            $scope.ResetMessages = function () {
                $scope.DefaultMessage = new _message();
            };

            $scope.GetList = function () {
                _appget($http, { url: api_url + '/api/ApplicationEntity/' + 'GetAllE/?FormName=' + $scope.FormName,
                    resp: function (response) { $scope.MainList = response.data.Result; }
                });
            };

            $scope.Add = function (m) {
                if (m == null) {
                    $scope.DefaultMessage.ErrorMessage = "No details recieved";
                }
                else {
                    m.OrganisationId = $scope.param;
                    _appput($http,
                        {
                            url: api_url + '/api/ApplicationEntity/' + 'AddE/?FormName=' + $scope.FormName, m,
                            before: $scope.ResetMessages,
                            resp: function (response) {
                                $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                                $scope.model = {};
                                $scope.GetList();
                            },
                            eresp: function (response) { $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage; }
                        }
                    );
                }
            };

            $scope.Edit = function (m) {
                if (m == null) {
                    $scope.DefaultMessage.ErrorMessage = _sfconstant.no_details_message;
                }
                else {
                    m.OrganisationId = $scope.param;
                    _apppost($http, { url:api_url + $scope.config.api_base + 'Edit',model: m,
                        before:$scope.ResetMessages,
                        resp:function (response) {
                            $scope.DefaultMessage.SuccessMessage = response.data.SuccessMessage;
                            $scope.GetList();
                        },
                        eresp:function (response) {
                            $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                        }}
                    );
                }
            };

            $scope.GetForm = function () {
                _appget($http, { url: api_url + '/api/ApplicationEntity/GetForm/?Id=' + $scope.param,
                    before:$scope.ResetMessages,
                    resp:function (response) {
                        $scope.FormName = response.data.Result.Name;
                        $scope.config.View = {};
                        $scope.config.EntityName = response.data.Result.Name;
                        $scope.GetFields(response.data.Result.Id);
                       
                    },
                    eresp:function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }
                });
            };

            $scope.GetFields = function (Id) {
                _appget($http, {
                    url:api_url + '/api/FormFieldMap/GetAllForProperty1/?Id=' + Id,
                    before:$scope.ResetMessages,
                    resp:function (response) {
                        $scope.config.fieldList = [];
                        $scope.config.thList = [];
                        $scope.config.thList.push('Object Id');
                        $scope.config.tdList = [];
                        $scope.config.tdList.push('{{m.}}');
                        var fields = response.data.Result;

                        for (i = 0; i < fields.length; i++) {
                            if (!fields[i].Inactive) {
                                $scope.config.fieldList.push({ view: SetField(fields[i].Field) });
                                $scope.config.thList.push({ view: fields[i].Field.Name });
                                $scope.config.tdList.push({ view: SetListField(fields[i].Field) });
                            }

                        }
                        $scope.SetupConfig();
                        $scope.GetList();
                    },
                    eresp:function (response) {
                        $scope.DefaultMessage.ErrorMessage = response.data.ErrorMessage;
                    }
                });
            };

            $scope.setUrl = function (url, model)
            {
                var _url = url.replace('{Id}', model.Id);
                return _url;
            };


            $scope.SetupConfig = function () {
                if ($scope.config.fieldList) {
                    for (i = 0; i < $scope.config.fieldList.length; i++) {
                        $scope.config.fieldList[i].view = $sce.trustAsHtml($scope.config.fieldList[i].view);
                    }
                }
                
                if ($scope.config.thList) {
                    for (i = 0; i < $scope.config.thList.length; i++) {
                        $scope.config.thList[i].view = $sce.trustAsHtml($scope.config.thList[i].view);
                    }
                }

                if ($scope.config.tdList) {
                    for (i = 0; i < $scope.config.tdList.length; i++) {
                        $scope.config.tdList[i].view = $sce.trustAsHtml($scope.config.tdList[i].view);
                    }
                }
            };

            this.$onInit = () => {
                $scope.config = config;
                $scope.base_url = $rootScope.base_url= base_url;
                $scope.param = $location.search().Id;

                $scope.ResetMessages();
                $scope.GetForm();
                $scope.defaultService = defaultService;
                $rootScope.authService = authService;

                $scope.model = {};
            };

        },
        templateUrl: base_url + config.template_url
    });
})(app, config);