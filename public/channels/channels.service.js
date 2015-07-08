angular.module("angularfireSlackApp")
		/*
			Injects $firebaseArray service from firebase
			Injects FirebaseUrl constant(defined at main app)
		*/
	.factory("Channels",function($firebaseArray,FirebaseUrl){
		//get a firebase instance that points to channels data
		var ref=new Firebase(FirebaseUrl+'channels');
		//get an array using $firebaseArray service passin in a firebase's ref to channels
		return $firebaseArray(ref);
	})