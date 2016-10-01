//Controlls the loading of the game. Will be browserified

var dibus = require('dibus');

dibus.register(require('./modules/pageManager'));
dibus.register(require('./modules/canvasManager'));
dibus.register(require('./modules/controlManger'));