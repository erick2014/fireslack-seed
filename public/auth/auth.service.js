angular.module('angularfireSlackApp')
	.factory('Auth',function($firebaseAuth,FirebaseUrl){
		var ref=new Firebase(FirebaseUrl);
		return $firebaseAuth(ref);
	})