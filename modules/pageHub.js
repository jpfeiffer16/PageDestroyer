module.exports = (function () {
  let self = this;
  
  // let players = [];
  let pages = [];
  let bullets = [];

  let addPlayer = function(data) {
    let {url, player} = data;
    pages[url][player.id] = player;
  };

  let playerChange = function(data) {
    let {url, player} = data;
    pages[url][player.id] = player;
    console.dir(pages);
  };

  let addBullet = function(data) {
    let {url, bullet} = data;
    //TODO: Add bullet here
  };

  //Exports
  return {
    addPlayer,
    playerChange,
    addBullet
  }
})();