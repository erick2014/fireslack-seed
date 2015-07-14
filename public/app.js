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
        templateUrl: 'home/home.html',
        resolve:{
          //if user is authenticated then redirect to channels state
          requireNoAuth:function(Auth,$state){
            return Auth.$requireAuth()
              .then(
                function(){
                  $state.go("channels");
                },function(){
                  //return nothing to allow loading home view.
                  return;
                }
              )
          }
        } 
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
      
      .state('profile', {
        url: '/profile',
        controller:'profileCtrl as profCtrl',
        templateUrl:'users/profile.html',
        //load some data before profileCtrl instantiation
        resolve: {
          //this will be  injected as a service into profileCtrl
          auth: function($state, Users, Auth){
            return Auth.$requireAuth()
            //if user is not authenticated redirect him to home page
            .catch(function(){
              $state.go('home');
            });
          },
          //this will be  injected as a service into profileCtrl
          profile: function(Users, Auth){
            return Auth.$requireAuth()
            //if the user is authenticated then get profile data(authData)
            //from firebase
            .then(function(authData){
              return Users.getProfile(authData.uid).$loaded();
            });
          }
        }
      })

      .state('channels', {
        url: '/channels',
        controller:"channelCtrl as chCtrl",
        templateUrl:"channels/index.html",
        /*
          load channels(promise) and profile(dependency) data to later inject them
          into channelCtrl
        */
        resolve: {
          channels:function(Channels){
            /*
              here we return the channels using Channels service
              once data is ready
            */
            return Channels.$loaded();
          },
          //Inject Users and Auth services(personal services)
          profile:function($state,Auth,Users){
            /*check if user is logged in*/
            return Auth.$requireAuth()
              /*get the auth data if the user is logged in*/
              .then(function(authData){
                //return profile data once is loaded from firebase
                return Users.getProfile(authData.uid).$loaded()
                  //if any profile was found, then return its data
                  .then(function(profileData){
                    if(profileData.displayName){
                      return profileData;
                    }
                    else{ $state.go("home") }
                  })
              },
              //user is not logged in, then redirect him to home state
              function(){
                $state.go("home")
              })
          }
        }
      })
      //this state is a child of channels state
      .state('channels.create',{
        url:'/create',
        templateUrl:'channels/create.html',
        controller:'channelCtrl as chCtrl'
      })
      //child of channels state
      .state('channels.messages',{
        url:'/{channelId}/messages',
        templateUrl:'channels/messages.html'
        controller:"MessagesCtrl msgCtrl",
        resolve:{
          /*Inject $stateParams from ui-router
            Inject Messages service(defined on channels module)
          */
          messages:function( $stateParams,Messages ){
            //get a channel message using a parameter from url
            return Messages.forChannel( $stateParams.channelId ).$loaded();
          },
          /*Inject $stateParams from ui-router
            Inject channels dependecy(defined on channels state)
          */
          channelName:function($stateParams,channels){
            //use getRecord method from firebaseArray object
            return '#'+channels.$getRecord( $stateParams.channelId ).name;
          }
        }
      })
    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://amber-torch-1816.firebaseio.com/');
