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
			//get the user's profile information, passin in the user's uid
			getProfile:function(uid){
				return $firebaseObject(usersRef.child(uid));
			},
			//get the display name using the uid of the current logged in user
			getDisplayName:function(uid){
				//first get the data from firebase
				return users.$loaded()
							//once data is ready, return the displayName
							.then(function(data){
								//get a specific user using its uid
								return users.$getRecord(uid).displayName;
							})
			},
			getGravatar:function(uid){
				//once data is ready, return a gravatar passin in an email hashed
				return users.$loaded()
							.then(function(){
								return '//www.gravatar.com/avatar/'+users.$getRecord(uid).emailHash;
							});
				
			},
			//return all records as array
			all:users
		}
		return Users;
	})