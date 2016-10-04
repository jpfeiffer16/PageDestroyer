var Vector = require('../types/vector');
module.exports = {
  name: 'CanvasManager',
  service: function(PageManager) {
    var self = this;
    var canvas = null;
    var ctx = null;
    var player = {
      ready: false,
      moveLeft: function() {
        if (this.ready)
          this.vel.x--;
      },
      moveRight: function() {
        if (this.ready)
          this.vel.x++;
      },
      jump: function() {
        if (this.ready) 
          this.vel.sub(new Vector(0, 5));
      }
    };
    
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

    var addPlayer = function(coordsObj) {
      player.ready = true;
      player.width = 10;
      player.height = 20;
      player.pos = new Vector(coordsObj.x, coordsObj.y);
      player.vel = new Vector(0, 0);
      player.dir = new Vector(0, 1);
    };

    //Render stuff and do physics here
    var loop = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (player.ready) {
        //Various simulations
        var newPos = player.pos.cp();

        //Gravity
        newPos.add(new Vector(0, .96));

        //Air resistance
        // if (!(player.vel.y < 1 || player.vel.y > -1)) {
        //   if (player.vel.x > 0) player.vel.sub(new Vector(.3, 0));
        //   if (player.vel.x < 0) player.vel.add(new Vector(.3, 0));
        // } else {
        //   player.vel.x = 0;
        // }

        // if (player.vel.y > 0) player.vel.sub(new Vector(0, .3));
        // if (player.vel.y < 0) player.vel.add(new Vector(0, .3));

        if (!PageManager.collides({
          x: newPos.x,
          y: newPos.y + player.height
        })) {
          // player.pos.
          //Add the velocity to the player
          player.pos = newPos;
        }
        

        //Render the player here
        ctx.fillStyle="#FF0000";
        ctx.fillRect(player.pos.x, player.pos.y, player.width, player.height);
      }

      requestAnimationFrame(loop);
    };


    init();
    

    return {
      player: player
    };
  }
};
