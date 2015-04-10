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