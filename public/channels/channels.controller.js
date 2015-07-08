/*
	Injects channels promise(defined into profile state)
	Injects profile dependency(defined at profile state)
	Injects Users Service(defined at users module)
	Injects Auth Service(defined at auth module)
	Injects $state service from ui-router
*/
angular.module('angularfireSlackApp')
	.controller('channelCtrl',function(channels,profile,Users,Auth,$state){
		var self=this;
		//set the channels resolved from profile state
		self.channels=channels;
		//set profile resolved from profile state
		self.profile=profile;

		//inherit some methods from Users service
		self.getDisplayName=Users.getDisplayName;
		self.getGravatar=Users.getGravatar;

		self.logout=function(){
			Auth.$unauth();
			$state.go("home");
		}

		console.log("initializing channels controller, profile=",profile);

	});