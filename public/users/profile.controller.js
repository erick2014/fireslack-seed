/*
	Ijects $state service from ui-router
	Injects md5 service( angular library )
  Injects auth service(defined at profile state into main app). 
	Injects profile service(defined at profile state into main app). 
*/
angular.module('angularfireSlackApp')
	.controller('profileCtrl',function($state,md5,auth,profile){

		console.log("initializing controller, profile=",profile);
		var self=this;
		
		self.profile=profile;
		
		self.updateProfile=function(){
			//set emailHash property into profile object returned from profile state
			//also change the displayName suing profile.html view
			self.profile.emailHash=md5.createHash(auth.password.email)
			//if profile is updated successfully then go channels state
			self.profile.$save()
				.then(function(){
					$state.go("channels");
				});
		}

	});