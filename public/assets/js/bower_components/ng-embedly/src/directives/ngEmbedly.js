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