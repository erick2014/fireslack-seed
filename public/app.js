'use strict';
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      })
      .state('login', {
        url: '/login',
        controller:'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html'
      })
      .state('register', {
        url: '/register',
        controller:'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://amber-torch-1816.firebaseio.com/');
