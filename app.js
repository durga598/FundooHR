angular.module('MyApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer', 'ngMaterial','ngMdIcons'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {

    /**
     * Helper auth functions
     */
    var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }];

    /**
     * App routes
     */
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'partials/login.html',
        resolve:{
          skipIfLoggedIn:skipIfLoggedIn
        }
      })
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('home.dashboard', {
        url: 'dash',
        templateUrl: 'partials/dashboard.html',
        controller: 'homeCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('home.engineers', {
        url: 'engineers',
        templateUrl: 'partials/engineers.html',
        controller: 'enggCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      // .state('signup', {
      //   url: '/signup',
      //   templateUrl: 'partials/signup.html',
      //   controller: 'SignupCtrl',
      //   resolve: {
      //     skipIfLoggedIn: skipIfLoggedIn
      //   }
      // })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      // .state('profile', {
      //   url: '/profile',
      //   templateUrl: 'partials/profile.html',
      //   controller: 'ProfileCtrl',
      //   resolve: {
      //     loginRequired: loginRequired
      //   }
      // });
    $urlRouterProvider.otherwise('/');
});
