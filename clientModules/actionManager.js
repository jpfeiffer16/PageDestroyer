var EventEmitter = require('events');
var Emitter = function() {
  //TODO: Constructor logic
};
Emitter.prototype = EventEmitter;
var emitter = new Emitter();

module.exports = {
  name: 'ActionManager',
  service: function () {
    var changePlayer = function(player) {
      emitter.emit('playerChange', player);
    };

    var changeLocalPlayer = function(player) {
      emitter.emit('localPlayerChange', player);
    };
    
    //Exports
    var exports = Object.create(emitter);
    exports.changeLocalPlayer = changeLocalPlayer;
    exports.changePlayer = changePlayer;
    return exports;
  }
}