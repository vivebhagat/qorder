
(function () {
    'use strict';
    app.factory('authService', ['$http', '$q', 'localStorageService', '$cookies', function ($http, $q, localStorageService, $cookies) {

        var serviceBase = auth_api; 
        var authServiceFactory = {};
        var subdomain_authkey = _subdomain + '_authorizationData';
        var _authentication = {
            isAuth: false,
            userName: ''
        };


        var _saveRegistration = function (registration) {
            _logOut();

            return $http.post(serviceBase + '/api/account/register', registration).then(function (response) {
                return response;
            });

        };

        var _getUserName = function () {
            var authData = localStorageService.get(subdomain_authkey);
            if (authData) {
                return authData.userName;
            }
        };

        var _setRole = function (role) {
            var authData = localStorageService.get(subdomain_authkey);
            if (authData) {
                authData.role = role.Id;
                authData.RoleName = role.Name;
                return localStorageService.set(subdomain_authkey, authData);
            }
        };

        var _refreshTokenWithURL = function (url, accessData, promise) {
            var deferred = $q.defer();

            var authData = localStorageService.get(subdomain_authkey);
            if (authData) {
                
                var data = 'grant_type=refresh_token&refresh_token=' + authData.refresh_token + '&Role=' + authData.role + '&client_id=ngAuthApp';
                var accessDataEncode = '';
                for (var key in accessData) {
                    if (accessData[key] != null | accessData[key] != '') {
                        accessDataEncode = '&Access.' + key + '=' + accessData[key];
                    }
                }
                data = data + accessDataEncode;
                $http.post(serviceBase + '/oauth2/token', data,
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .then(function (response) {
                        var authData = localStorageService.get(_subdomain+'_authorizationData');
                        authData.userName = response.data.userName;
                        authData.refresh_token = response.data.refresh_token;
                        authData.useRefreshTokens = true;
                        localStorageService.set(subdomain_authkey, authData);
                        var data_string = JSON.stringify(authData);
                        document.cookie = subdomain_authkey + "=" + data_string + ';domain=.' + base_host + ';path=/'; 
                        document.cookie = authData.subdomain + "_token=" + response.data.access_token + ';domain=.' + base_host + ';path=/'; 
                        if (url != '') {
                            window.location = url;

                        }
                        else {
                            promise();
                        }
                        deferred.resolve(response);
                    }, function (err, status) {
                        _logOut();
                        deferred.reject(err);
                    });
                
            }

            return deferred.promise;
        };

        var _login = function (loginData, _signinSettings) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + '&OrgRole=0&ContextId=1&client_id=ngAuthApp';

            var deferred = $q.defer();
            var domain = _signinSettings.domainfunction(loginData.userName);
            localStorageService.set(subdomain_authkey, {
                domain: domain
            });
            $cookies.put('dmn', domain);
            $http.post(serviceBase + '/directoauth/token', data,
                {
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'domain': domain 
                    }
                })
                .then(function (response) {
                    var _data_ =
                    {
                        userName: loginData.userName,
                        refresh_token: response.data.refresh_token,
                        subdomain : response.data.subdomain,
                        domain : domain,
                        domainkey: response.data.domainkey
                    }; 

                    localStorageService.set(response.data.subdomain+'_authorizationData', _data_);
                    $cookies.put('dmn', domain);
                    var data_string = JSON.stringify(_data_);
                    document.cookie = response.data.subdomain + '_authorizationData=' + data_string + ';domain=.' + base_host + ';path=/'; 
                    document.cookie = response.data.subdomain + '_token=' + response.data.access_token + ';domain=.' + base_host + ';path=/'; 
                    document.cookie = 'domainkey=' + response.data.domainkey + ';domain=.' + base_host + ';path=/'; 
                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;

                    deferred.resolve(response);

                },
                    function (err, status) {
                        // _logOut();
                        // deferred.reject(err);
                        //return deferred.promise;
                        deferred.resolve(err);
                    });


            return deferred.promise;

        };


        var _logOut = function () {

            localStorageService.remove(subdomain_authkey);
            window.sessionStorage.removeItem(_subdomain + '_vcentdata');
            $cookies.remove(_subdomain + '_token', { path: '/', domain: '.' + base_host });
            $cookies.remove(subdomain_authkey, { path: '/', domain: '.' + base_host });

            _authentication.isAuth = false;
            _authentication.userName = "";
            window.location = base_url + "/account/login";

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get(subdomain_authkey);
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
            }

        };

        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.setRole = _setRole;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.getUserName = _getUserName;
        authServiceFactory.refreshTokenWithURL = _refreshTokenWithURL;
        
        return authServiceFactory;
    }]);
})();