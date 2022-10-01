
(function () {
    "use strict";

    app.factory("defaultService", defaultService);

    defaultService.$inject = ["$http", "$rootScope", "$location", "localStorageService"];

    function defaultService($http, $rootScope, $location, localStorageService) {

        var OpenLink = function (link, is_abs) {
            if (is_abs) {
                window.location = link;
            }
            else {
                window.location = base_url + link;
            }
        };

        var OpenLinkNewWindow = function (link, is_abs) {
            if (is_abs) {

                window.open(link, '_blank');
            }
            else {

                window.open(base_url + link, '_blank');
            }
        };
        var checkUrlAccess = function () {
            _appget($http, { url: api_url + '/api/pageaccess/checklink' });
        };

        var getOrganization = function () {
            _appget($http, { url :api_url + '/api/Organization/GetDefualt/',
                resp:function (response) {
                    $rootScope.logoURL = response.data.Result.LogoImageUrl;
                }}
            );
        };

        var SetUserData = function () {
            var authData = localStorageService.get(_subdomain + authDataCacheKey);
            if (authData) {
                $rootScope.UserName = authData.userName;
                $rootScope.UserRole = authData.RoleName;
                $rootScope.RoleId = authData.role;
                $rootScope.IsAuth = true;
            }
            else {
                $rootScope.IsAuth = false;
            }
        };

        var SetMenu = function (menu, f) {
            var authData = localStorageService.get(_subdomain + authDataCacheKey);
            if (authData) {
                _appget($http, {url: api_url + '/api/PageAccess/GetLinksForPage/?PageName=' + menu, resp:f});
            }
        };


        var ListChecker = function (MenuList, url) {
            var flag = false;
            var checker = function (item, i) {
                if (item.Item2 == url) {
                    flag = true;
                    return;
                }
            };
            MenuList.forEach(checker);
            return flag;
        };

        var OnMenuClick = function (url) {
            var pageData = JSON.parse(window.sessionStorage.getItem('pageData'));
            var flag = true;
            var checker = function (item, i, m) {
                if (item.Item2 == url) {
                    flag = true;
                    event.show = true;
                    return true;
                }
            };
            if (pageData) {
                if (flag) 
                {
                    pageData.url = url;
                    window.sessionStorage.setItem('pageData', JSON.stringify(pageData));
                }
            }
            else {
                if (flag) 
                {
                    window.sessionStorage.setItem('pageData', JSON.stringify({
                        url: url
                    }));

                }
            }
            OpenLink(url);
        };


        var SetAllMenu = function () {

            var authData = localStorageService.get(_subdomain + authDataCacheKey);
            if (authData) {
                var vcentdata = window.sessionStorage.getItem(_subdomain + '_vcentdata');

                if (vcentdata == null || typeof vcentdata == 'undefined' || vcentdata == '') {
                    _appget($http, {
                        url: api_url + '/api/PageAccess/GetPageAccess/?WithInactive=false',
                        resp: function (response) {
                            var _all_menu = [];
                            var _res = response.data.Result;
                            _res.sort(function (a, b) {
                                return a.Index - b.Index;
                            });

                            for (var i = 0; i < _res.length; i++) {
                                if (_res[i].Link.pageName != '_') {
                                    var matched = false;
                                    for (var j = 0; j < _all_menu.length; j++) {
                                        if (_all_menu[j].pageName == _res[i].Link.pageName.toUpperCase()) {

                                            _all_menu[j].List.push(_res[i].Link);
                                            _all_menu[j].urlList.push((_res[i].Link.url + '').toLowerCase());
                                            matched = true;
                                            break;
                                        }
                                    }
                                    if (!matched) {
                                        var new_menu = { pageName: _res[i].Link.pageName.toUpperCase(), List: [], urlList: [] };
                                        new_menu.List.push(_res[i].Link);
                                        new_menu.urlList.push((_res[i].Link.url + '').toLowerCase());
                                        _all_menu.push(new_menu);
                                    }
                                }
                            }
                            window.sessionStorage.setItem(_subdomain + '_vcentdata', JSON.stringify(_all_menu));
                            $rootScope.AllMenu = _all_menu;
                        }
                    }
                    );
                }
                else {
                    $rootScope.AllMenu = JSON.parse(vcentdata);
                }
            }
        };


        var ShowMenuList = function (MenuList) {
            var flag = false;
            var checker = function (item, i, m) {
                if (item.Item2 == $rootScope.currentUrl) {
                    flag = true;
                    return true;
                }
            };
            MenuList.forEach(checker);
            MenuList.show = flag;
        };


        var uiDataDbKey = 'UIDataDb';
        var GetUIData = function () {
            
            var UIDataDb = localStorageService.get(uiDataDbKey);
            var current_page = $location.path().toLowerCase();
            var new_page_data = {};
            if (UIDataDb) {
                if (UIDataDb[current_page] !== null & typeof UIDataDb[current_page] !== 'undefined') {

                    return UIDataDb[current_page.toLowerCase()];
                }

                UIDataDb[current_page] = new_page_data;
                localStorageService.set(uiDataDbKey, UIDataDb);
                return new_page_data;
            }
            else {
                UIDataDb = {};
              
                UIDataDb[current_page] = new_page_data;
                localStorageService.set(uiDataDbKey, UIDataDb);
                return new_page_data;
            }
        };


        var SetUIData = function (UIData) {
            var UIDataDb = localStorageService.get(uiDataDbKey);
            var current_page = $location.path().toLowerCase();
            if (UIDataDb[current_page] !== null) {
                UIDataDb[current_page] = UIData;
                localStorageService.set(uiDataDbKey, UIDataDb);
                return;
            }

            UIDataDb[current_page] = UIData;
            localStorageService.set(uiDataDbKey, UIDataDb);
        };


        var GetUserData = function () {
            var authData = localStorageService.get(_subdomain + authDataCacheKey);
            if (authData) {
                var au = {
                    UserName: authData.userName,
                    UserRole: authData.RoleName,
                    RoleId: authData.role
                };

                return au;
            }
        };



        var pageData = JSON.parse(window.sessionStorage.getItem('pageData'));

        if (pageData) {
            $rootScope.currentUrl = pageData.url;
        }


        if (typeof _anonymous_page != 'undefined') {
            if (!_anonymous_page) {
                SetAllMenu();
                checkUrlAccess();
                getOrganization();
                SetUserData();
            }
        }
        else {
            SetAllMenu();
            checkUrlAccess();
            getOrganization();
            SetUserData();
        }


        var SetVcent = function (vcent) {
            console.log(vcent);
            if (vcent == null) {
                vcent = '';
            }
            window.sessionStorage.setItem(_subdomain + '_vcent', vcent);
            window.sessionStorage.removeItem(_subdomain + '_vcentdata');
        };


        return {
            OpenLink: OpenLink,
            OpenLinkNewWindow: OpenLinkNewWindow,
            GetUserData: GetUserData,
            SetUserData: SetUserData,
            OnMenuClick: OnMenuClick,
            ListChecker: ListChecker,
            checkUrlAccess: checkUrlAccess,
            getOrganization: getOrganization,
            GetUIData: GetUIData,
            SetUIData: SetUIData,
            SetAllMenu: SetAllMenu,
            SetVcent: SetVcent
        };


    }

    app.directive('ngFiles', ['$parse', function ($parse) {

        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            });
        }

        return {
            link: fn_link
        };
    }]);
})();
