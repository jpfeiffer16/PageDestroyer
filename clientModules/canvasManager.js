var Vector = require('../types/vector');
var uuid = require('uuid');
module.exports = {
  name: 'CanvasManager',
  service: function(PageManager, ActionManager) {
    var self = this;
    var canvas = null;
    var ctx = null;
    var mousePos = new Vector(0, 0);
    var aimAngle = 0;
    var bullets = [];
    var otherPlayers = [];

    var w = document.documentElement.clientWidth,
        h = document.documentElement.clientHeight;
    var player = {
      id: uuid.v4(),
      ready: false,
      moveLeft: function() {
        if (this.ready) {
          this.vel.x--;
          ActionManager.playerChange(this);
        }
          
      },
      moveRight: function() {
        if (this.ready) {
          this.vel.x++;
          ActionManager.playerChange(this);
        }

      },
      jump: function() {
        if (this.ready && !this.hasJumped) {
          this.vel.sub(new Vector(0, 10));
          this.hasJumped = true;
          var self = this;
          setTimeout(function() {
            self.hasJumped = false;
          }, 900);
          ActionManager.playerChange(this);
        }

      },
      shoot: function () {
        if (this.ready) {
          var velocity = player.dir.cp();
          // velocity.length = 1000;
          velocity.mul(10);
          // velocity.normalize();
          // velocity.setAngle(player.dir);
          bullets.push({
            pos: player.getShouldersPos().cp(),
            dir: velocity
          });
        }
      },
      shoulders: {
        x: .5,
        y: .3
      },
      getShouldersPos: function() {
        return new Vector(
          this.pos.x + (this.width * this.shoulders.x),
          this.pos.y + (this.height * this.shoulders.y)
        );
      }
    };
    
    var init = function() {
      canvas = document.createElement('canvas');
      canvas.style['position'] = 'absolute';
      canvas.style['top'] = '0px';
      canvas.style['left'] = '0px';
      canvas.style['z-index'] = '10000';
      
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);;

      canvas.style['width'] = w + 'px';
      canvas.style['height'] = h + 'px';
      // canvas.width = screen.width;
      // canvas.height = screen.height;

      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
      ctx.font = "48px serif";

      var playerClick = function(event) {
        addPlayer({
          x: event.x,
          y: event.y
        });
        canvas.removeEventListener('click', playerClick);
      }
      canvas.addEventListener('click', playerClick);
      requestAnimationFrame(loop);
      
      document.addEventListener('mousemove', function(e) {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
      });

      // var shootInterval;
      document.addEventListener('keydown', function(e) {
        // aimAngle = Math.atan2(e.y - e.y, player.pos.x - player.pos.x) * 180 / Math.PI;
        // aimAngle = Math.atan2(e.y - player.pos.y, e.x - player.pos.x) * 180 / Math.PI;

        //Shoot here
        // console.log(e);
        // if (e.key == ' ') {
        //   player.shoot();
        // }
        // shootInterval = setInterval(player.shoot, 300);
      });

      // document.addEventListener('keyup', function(e) {
      //   //Stop shooting here
      //   console.log('Mouse Down');
      //   clearInterval(shootInterval);
      // });

      //Listen for our update events
      // ActionManager.on('localPlayerChange', function(player) {
        
      // });
    };

    var addPlayer = function(coordsObj) {
      player.ready = true;
      player.width = 10;
      player.height = 20;
      player.pos = new Vector(coordsObj.x, coordsObj.y);
      player.vel = new Vector(0, 0);
      player.dir = new Vector(0, 1);
    };

    var playerChange = function(player) {
      otherPlayers.filter(function(player) {
        return player.id == player.id;
      })
      .forEach(function(player) {
        player = player;
      });
    };

    //Render stuff and do physics here
    var loop = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (player.ready) {
        //Various simulations
        // var newPos = player.pos.cp();

        // //Gravity
        // newPos.add(new Vector(0, .96));

        //Air resistance
        // if (!(player.vel.y < 1 || player.vel.y > -1)) {
        //   if (player.vel.x > 0) player.vel.sub(new Vector(.3, 0));
        //   if (player.vel.x < 0) player.vel.add(new Vector(.3, 0));
        // } else {
        //   player.vel.x = 0;
        // }

        // if (player.vel.y > 0) player.vel.sub(new Vector(0, .3));
        // if (player.vel.y < 0) player.vel.add(new Vector(0, .3));
        // if (player.vel.x > 0) player.vel.sub(new Vector(0, .3));
        // if (player.vel.x < 0) player.vel.add(new Vector(0, .3));

        if (!PageManager.collides({
          x: player.pos.x,
          y: player.pos.y + player.height
        })) {
          //Add the velocity to the player
          player.vel.add(new Vector(0, .96));
        } else {
          if (player.vel.y > 0)
            player.vel.y = 0;
        }

        if (PageManager.collides({
          x: player.pos.x,
          y: player.pos.y
        })) {
          if (player.vel.x < 0)
            player.vel.x = 0;
        }

        if (PageManager.collides({
          x: player.pos.x + player.width,
          y: player.pos.y + player
        })) {
          if (player.vel.x > 0)
            player.vel.x = 0;
        }

        if (player.pos.x + player.width >= w) {
          player.pos.x = (w - player.width);
          if (player.vel.x > 0)
            player.vel.x = 0;
        }

        if (player.pos.x <= 0) {
          player.pos.x = 1;
          if (player.vel.x < 0)
            player.vel.x = 0;
        }

        if (player.pos.y + player.height >= h) {
          player.pos.y = h - player.height;
          if (player.vel.y > 0)
            player.vel.y = 0;
        }
        // if (player.vel.y < -5)
        //   player.vel.y = -5;

        player.pos.add(player.vel);

        //Render the player here
        ctx.fillStyle="#FF0000";
        ctx.fillRect(player.pos.x, player.pos.y, player.width, player.height);
        //Render temp line to cursor
        var playerShoulders = player.getShouldersPos();
        // ctx.drawLine(playerShoulders.x, playerShoulders.y, mousePos.x, mousePos.y);

        // ctx.beginPath();
        // ctx.moveTo(playerShoulders.x, playerShoulders.y);
        // ctx.lineTo(mousePos.x, mousePos.y);
        // ctx.stroke();
        // ctx.closePath();

        //Bullets

        bullets.forEach(function(bullet) {
          bullet.dir.add((new Vector(0, .01)));
          if (
            bullet.pos.x > w || bullet.pos.x < 0
          ) {
            bullet.dir.x *= -1;
            bullet.dir.mul(.7);
          }
          if (
            bullet.pos.y > h || bullet.pos.y < 0
          ) {
            bullet.dir.y *= -1;
            bullet.dir.mul(.7);
          }
          bullet.pos.add(bullet.dir);
          
          ctx.beginPath();
          ctx.arc(bullet.pos.x, bullet.pos.y, 2, 0, 2 * Math.PI);
          ctx.fill();
        });

        
        // ctx.fillText(player.dir.angle() + " deg", 10, 50);
        // player.dir.setAngle(Math.atan2(mousePos.y - player.pos.y, mousePos.x - player.pos.x) * 180 / Math.PI);
        player.dir.setAngle(Math.atan2(mousePos.y - player.pos.y, mousePos.x - player.pos.x));
      }

      requestAnimationFrame(loop);
    };

    init();

    // loop();

    return {
      player: player,
      otherPlayers: otherPlayers,
      playerChange: playerChange
    };
  }
};
