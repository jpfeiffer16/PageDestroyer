module.exports = (function () {
  let self = this;
  
  let players = [];
  let bullets = [];

  let playerMove = function(data) {
    let {playerId, info} = data;
  }

  let playerShoot = function(data) {
    let {playerId, info} = data;
  }

  //Exports
  return {
    playerMove,
    playerShoot
  }
})();