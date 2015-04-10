'use strict';
/** 
 * controllers that generate the list of pipelines
 */
app.controller('pipelineDetailsCtrl', function($scope, $filter, ngTableParams) {
	
	 $scope.addProspect = function(pipe, newProp) {
        for(var pip in $scope.pipelines) {
            if($scope.pipelines[pip].id == pipe) {
                $scope.pipelines[pip].members.push(newProp)
            }
        }
        $scope.tableParams.reload();
    }
	
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 5, // count per page
        sorting: {
            name: 'asc' // initial sorting
        },
        filter: {
            name: '' // initial filter
        }
    }, {
        total: $scope.pipe.members.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.filter() ? $filter('filter')($scope.pipe.members, params.filter()) : $scope.pipe.members;
            orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
});