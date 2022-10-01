

(function () {
    "use strict";

    app.factory("signalRservice", signalRservice);

    signalRservice.$inject = ["$rootScope", "appSettings"];

    /* @ngInject */
    function signalRservice($rootScope, appSettings) {
        var switchHubProxy = null;

        var initialize = function () {

            $.connection.hub.url = api_url + '/signalr';
            switchHubProxy = $.connection.meterHub;

            $.connection.hub.logging = true;

            switchHubProxy.client.RefreshDigSwitch = function (Id) {
                console.log($rootScope);
                $rootScope.$emit("RefreshDigSwitch", Id);
            };

            //$.connection.hub.url = appSettings.serverPath + 'signalr';

            switchHubProxy.client.RefreshAnlSwitch = function (Id) {
                console.log('Client switch refress');
                console.log($rootScope);
                $rootScope.$emit("RefreshAnlSwitch", Id);
            };

            switchHubProxy.client.RefreshReading = function (Id) {
                console.log($rootScope);
                console.log(data);
                $rootScope.$emit("RefreshReading", Id);
            };

            /*            myHubProxy.client.newCpuValue = function (data) {
                            $rootScope.$emit("newCpuValue", data);
                        };*/

            //Starting connection
            $.connection.hub.start({ withCredentials: false, jsonp: true })
                .done(function () {
                    console.log('Now connected, connection ID=' + $.connection.hub.id);
                })
                .fail(function () {
                    console.log('Could not connect');
                });
        };

        var sendMessage = function (message) {
            console.log(switchHubProxy);
            switchHubProxy.server.send("", message, "");
        };

        initialize();
        //        sendMessage();
        return {
            initialize: initialize,
            sendMessage: sendMessage
        };
    }
})();

