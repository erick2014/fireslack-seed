/*
  Injects profile dependency(defined at channels state)
  Injects channelName dependency(defined at channels.messages state)
  Injects messages dependency( defined at channels.messages state)
*/
angular.module('angularfireSlackApp')
  .controller('MessagesCtrl',function(profile,channelName,messages){
    var self=this;
    console.log("initializing messages controller, messages",messages);

  });