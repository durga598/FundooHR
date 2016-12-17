angular.module('MyApp')
  .controller('LoginCtrl', function($scope,$state, $location, $auth, toastr) {
$scope.emailFormat = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
$scope.passwordFormat= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                
      
      var config = {method: 'POST',url: 'http://192.168.0.171:3000/auth/login'};
    $scope.login = function() {
      $auth.login($scope.user,  config)
        .then(function(data) {
          console.log("login");
        //  $location.path('/');
        $state.go("home");
        //  $state.transitionTo('/')
        })
        .catch(function(error) {
          $scope.error=error.data.message;
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/home');
        })
        .catch(function(error) {
          if (error.message) {
            // Satellizer promise reject error.
            toastr.error(error.message);
          } else if (error.data) {
            // HTTP response error from server
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };
  });
