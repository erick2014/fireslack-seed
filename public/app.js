'use strict';
angular
  .module('angularfireSlackApp', 
    //load dependencies for main app
    ['firebase','angular-md5','ui.router'])
    //set routing  
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      })
      .state('login',{
        url: '/login',
        controller:'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth()
            .then(
              function(auth){
                console.log("already logged in!",auth);
                $state.go('home');
              }, 
              function(error){
                return;
              }
            );
          }
        }
      })
      .state('register',{
        //check if user is logged in before to controller instantiation
        url: '/register',
        controller:'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth()
            .then(
              function(auth){
                $state.go('home');
              }, 
              function(error){
                return;
              }
            );
          }
        }
      })

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://amber-torch-1816.firebaseio.com/');
