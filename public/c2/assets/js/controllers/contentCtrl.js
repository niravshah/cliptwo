'use strict';
/** 
 * controllers that generate the list of pipelines
 */
app.controller('contentCtrl', function($scope) {
    $scope.init = function(){
		$scope.resolvedUrls = [];
	}
    $scope.inputUrl = "http://www.marketplace.org/topics/education/learning-curve/american-students-head-germany-free-college";
    $scope.embget = function(inputUrl) {
        var defered = $.embedly.extract(inputUrl, {
            key: '69d083f719b04f51bb776864183ad5a2'
        })
        defered.done(function(results) {
            $scope.resolvedUrls.push(results[0]);      
			console.log(results[0]);
			$scope.$apply();
        })
    }
});