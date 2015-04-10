var example = angular.module('example', ['ng-embedly']);

example.config(['ngEmbedlyServiceProvider', function(ngEmbedlyServiceProvider) {
    ngEmbedlyServiceProvider.setKey('');
}]);

example.controller('ExampleCtrl', function($scope) {
    $scope.url_to_oembed = '';
});