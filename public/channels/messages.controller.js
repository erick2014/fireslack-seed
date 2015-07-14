/*
  Injects profile dependency(defined at channels state)
  Injects channelName dependency(defined at channels.messages state)
  Injects messages dependency( defined at channels.messages state)
*/
angular.module('angularfireSlackApp')
  .controller('MessagesCtrl',function(profile,channelName,messages){
    var self=this;
    self.messages=messages;
    self.message="";
    self.channelName=channelName;
    
    self.sendMessage=function(){
      if( self.messages.length > 0 ){
        self.messages
        .$add({
          uid:profile.$id,
          body:self.message,
          timestamp:Firebase.ServerValue.TIMESTAMP
        })
        .then(function(){
          self.message="";
        })
      }
    }
    console.log("initializing messages controller, messages",messages);

  });