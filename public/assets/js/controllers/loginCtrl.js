app.controller('LoginModalCtrl', function ($scope) {

  this.cancel = $scope.$dismiss;

  this.submit = function (email, password) {
      $scope.$close('{}');
   
  };

});