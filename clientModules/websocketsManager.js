module.exports = {
  name: 'WebsocketsManager',
  service: function() {
    console.log('WebsocketsManager ready!');
    //NOTE: Abstract other stuff like this into its own module if it becomes big
    var currentScriptSrc = document.currentScript.baseURI;


    //TODO: Logic here
    // console.log('Current Script:', currentScriptSrc);
    var socket = require('socket.io-client').connect(currentScriptSrc);
    // var socket = io.connect(currentScriptSrc);
    socket.on('connect', function() {
      console.log('Connected!');
    });
    socket.on('news', function(data) {
      console.log('data');
      socket.emit('my other event', { my: 'data' });
    });

  }
}