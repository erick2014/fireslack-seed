angular.module("angularfireSlackApp")
	/*
	here we inject $firebaseArray,$firebaseObject services
	available from firebase module
	also firebaseUrl constant defined at app.js
	*/
	.factory('Users',function($firebaseArray,$firebaseObject,FirebaseUrl){
		//get a firebase instance
		var usersRef=new Firebase(FirebaseUrl+"users");
		//get an array of users
		var users=$firebaseArray(usersRef);

		var Users={
			//allow us to get and object of a specific user's profile
			getProfile:function(uid){
				return $firebaseObject(usersRef.child(uid));
			},
			//allow us to get an array's element, given an uid
			getDisplayName:function(uid){
				return users.$getRecord(uid).displayName;
			},
			//return all records as array
			all:users
		}
		return Users;
	})