// This file is a part of ng-embedly
// https://github.com/Paulloz/ng-embedly/
// Copyright (C) 2014 Paul Joannon <hello@pauljoannon.com>

// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

var ngEmbedly = angular.module('ng-embedly', []);

// Service
(function(module) {
    module.provider('ngEmbedlyService', function() {
        // API key management
        var api_key;
        var base_url = "//api.embed.ly/1/oembed";

        var template;

        this.setKey = function(_api_key) { api_key = _api_key; return api_key; };
        this.getKey = function() { return api_key; };

        this.setTemplate = function(_template) { template = _template; return template; };
        this.getTemplate = function() { return template; }

        this.$get = ['$http', '$q', function($http, $q) {
            return {
                embed : function(url, params) {
                    var deferred = $q.defer();

                    url = encodeURI(url);
                    request_params = {
                        key : api_key,
                        url : url,
                        callback : "JSON_CALLBACK"
                    };
                    if ('width' in params) {
                        request_params.maxwidth = params.width;
                    }

                    $http.jsonp(base_url, {
                        params : request_params
                    }).then(function(response) {
                        var data = response.data;
                        var _template = params.template || template;
                        if (_template != null) {
                            data.template = _template;
                        }

                        deferred.resolve(data);
                    }, function() { deferred.reject(); });

                    return deferred.promise;
                }
            };
        }];
    });
})(ngEmbedly);

// Directive
(function(module) {
    module.directive('ngEmbedly', ['ngEmbedlyService', '$sce', '$compile', function(ngEmbedlyService, $sce, $compile) {
        return {
            restrict : 'AE',
            template : '<div></div>',
            replace : true,
            scope : {
                href : '=',
                template : '=?',
            },
            link : function(scope, element, attr) {
                scope.$watch('href', function(new_value, old_value) {
                    var params = {
                        template : scope.template,
                        width : element[0].getBoundingClientRect().width
                    };

                    ngEmbedlyService.embed(scope.href, params).then(function(data) {
                        if (data.type === 'error') { }
                        else {
                            element.empty();
                            if (data.type === 'photo') {
                                var img = angular.element("<img>");
                                img.attr('src', data.url);
                                data.html = img[0].outerHTML;
                            }
                            if ('html' in data) {
                                data.html = $sce.trustAsHtml(data.html);
                                if (!('template' in data)) {
                                    data.template = '<div ng-bind-html="html"></div>'
                                }
                                var _scope = scope.$new();
                                for (var i in data) if (data.hasOwnProperty(i)) {
                                    if (["template", "version"].indexOf(i) < 0) {
                                        _scope[i] = data[i];
                                    }
                                }
                                element.append($compile(data.template)(_scope));
                            }
                        }
                    });
                });
            }
        };
    }]);
})(ngEmbedly);