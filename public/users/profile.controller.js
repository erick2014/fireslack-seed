/*
  Injects Auth service it uses firebase module(personal). 
	Ijects $state service from ui-router
	Injects md5 service( angular library )
*/
angular.module('angularfireSlackApp')
	.controller('profileCtrl',function($state,md5,auth,profile){

		console.log("initializing controller, profileCtrl");
		var self=this;
		
		self.profile=profile;
		
		self.updateProfile=function(){
			self.profile.emailHash=md5.createHash(auth.password.email)
			self.profile.$save();
		}

	});