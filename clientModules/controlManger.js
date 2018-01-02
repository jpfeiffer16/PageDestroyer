module.exports = {
  name: 'ControlManager',
  service: function(CanvasManager) {
    document.addEventListener('keypress', function(event) {
      switch(event.key) {
        case 'a':
          CanvasManager.player.moveLeft();
          break;
        case 'd':
          CanvasManager.player.moveRight();
          break;
        case 'w':
          CanvasManager.player.jump();
          break;
        case ' ':
          CanvasManager.player.shoot();
          break;
      };
    });
  }
}