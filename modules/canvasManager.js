module.exports = {
  name: 'CanvasManager',
  service: function(PageManager) {
    var self = this;
    var canvas = null;
    var ctx = null;
    var player = null;
    
    var init = function() {
      canvas = document.createElement('canvas');
      canvas.style['position'] = 'absolute';
      canvas.style['top'] = '0px';
      canvas.style['left'] = '0px';
      canvas.style['z-index'] = '10000';
      canvas.style['width'] = '100%';
      canvas.style['height'] = '100%';
      canvas.width = screen.width;
      canvas.height = screen.height;

      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');

      var playerClick = function(event) {
        addPlayer({
          x: event.x,
          y: event.y
        });
        canvas.removeEventListener('click', playerClick);
      }
      canvas.addEventListener('click', playerClick);
      requestAnimationFrame(loop);
    };

    var movePlayerLeft = function() {
      console.log('Moving left');
    };

    var movePlayerRight = function() {
      console.log('Moving right');
    };

    var addPlayer = function(coordsObj) {
      player = {
        width: 10,
        height: 20,
        pos: coordsObj
      };
    };

    //Render stuff and do physics here
    var loop = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (player != null) {
        if (PageManager.collides({
          x: player.x,
          y: player.y + player.height
        })) {
          player.pos.y++;
        }
        //Render the player here
        ctx.fillStyle="#FF0000";
        ctx.fillRect(player.pos.x, player.pos.y, player.width, player.height);
      }

      requestAnimationFrame(loop);
    };


    init();
    

    return {
      movePlayerLeft: movePlayerLeft,
      movePlayerRight: movePlayerRight
    };
  }
};