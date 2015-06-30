angular.module('angularfireSlackApp')
	//injects Auth controller, it uses firebase module. Iject $state service from ui-router
	.controller('AuthCtrl',function(Auth,$state){
		var self=this;

		self.user={email:"egarcia@estudiointeractivo.co",password:"123456"};
		self.error="";

		self.login=function(){
			Auth.$authWithPassword(self.user)
			//succcess cb
			.then(function(authData){
				alert("usuario autenticado");
				console.log(authData);
				//$state.go('home');
			},
			//err callback
			function(error){
				console.log("usuario no autenticado!");
				self.error=error;
			})
		}

		self.register=function(){
			Auth.$createUser(self.user)
				//success callback
				.then(function(user){
					alert("usuario creado");
					console.log(user)
					//self.login();
				},
				//failure callback
				function(error){
					self.error=error;
				})
		}
	})