module.exports = {
  name: 'WebsocketsManager',
  service: function(CanvasManager) {
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

    socket.on('playerChange', function(player) {
      if (player.id != CanvasManager.player.id)
        return;
      CanvasManager.otherPlayers[player.id] = player;
    });

    function sendEvent(eventName, data) {
      socket.emit(eventName, {
        url: location.url,
        data: player
      });
    }

    function registerPlayer (player) {
      sendEvent('addPlayer', player);
    }

    function playerChange (player) {
      sendEvent('playerChange', player);
    }

    return {
      registerPlayer: registerPlayer
    }

  }
}