app.controller('loginInterceptCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, $http, localStorageService) {
    $scope.testFunc = function() {
        console.log($stateParams.onwardsState);
        console.log($scope.engUser);
        if($localStorage.user) {
            $localStorage.$reset({
                user: ''
            });
        }
        $http.post('/auth', $scope.engUser).success(function(data, status, headers, config) {
            console.log('Success:', data);
			$localStorage.user ={};
            
			localStorageService.set('user.token',data.token);
			$localStorage.user.token = data.token;

			localStorageService.set('user.name',data.user);
            $localStorage.user.name = data.user;
            $localStorage.user.job = data.job;
            $localStorage.user.picture = data.picture;
            $state.go($stateParams.onwardsState);
        }).error(function(data, status, headers, config) {
            console.log('Error', state, data);
        });
    }
});