/** 
 * declare 'clip-two' module with dependencies
 */
'use strict';
var mod = angular.module("clip-two", ['ngAnimate', 'ngCookies', 'ngStorage', 'ngSanitize', 'ngTouch', 'ui.router', 'ui.bootstrap', 'oc.lazyLoad', 'cfp.loadingBar', 'ncy-angular-breadcrumb', 'duScroll', 'pascalprecht.translate', 'ngTagsInput','angular-jwt','LocalStorageModule']);

mod.service('AuthenticationService', function (jwtHelper) {
	this.validateToken = function(token){
		return !jwtHelper.isTokenExpired(token);
	}
});