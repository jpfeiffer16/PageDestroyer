//Controlls the loading of the game. Will be browserified

var dibus = require('dibus');


dibus.register(require('./clientModules/pageManager'));
dibus.register(require('./clientModules/canvasManager'));
dibus.register(require('./clientModules/controlManger'));
dibus.register(require('./clientModules/websocketsManager'));