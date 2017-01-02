angular.module('MyApp')
  .controller('LoginCtrl', function($scope,$state, $location, $auth, toastr) {
$scope.emailFormat = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
$scope.passwordFormat= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                
    var config = {method: 'POST',url: 'http://192.168.0.171:3000/login'};
    $scope.login = function() {
      $auth.login($scope.user,  config)
        .then(function(data) {
          console.log("login");
        $state.go("home");
        })
        .catch(function(error) {
          $scope.error=error.data.message;
        });
    };
 
  });
