'use strict';
/** 
 * controllers that generate the list of pipelines
 */
app.controller('PipelineCtrl', function($scope, $http) {
    $scope.aI = 0;
    $scope.myModel = {};
    $scope.initPipelines = function() {
        $scope.pipelines = [];
        
        $http.get('/api/pipelines').
        success(function(data, status, headers, config) {			
           $scope.pipelines.push(data);
        }).
        error(function(data, status, headers, config) {
           console.log('Error ',status, data)
        });
    }
    $scope.addPipeline = function(newPipe) {
        newPipe.members = [];
        newPipe.id = newPipe.name.toLowerCase().replace(/ /g, '-');
        $scope.pipelines.push(newPipe);
        $scope.$apply();
    }
});