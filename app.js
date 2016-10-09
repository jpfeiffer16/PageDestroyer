const express = require('express');
const app = express();
const browserify = require('browserify');
const PageHub = require('./modules/pageHub');

//Setup websockets
let server = require('http').Server(app);
let io = require('socket.io')(server);

//Setup express
app.use(express.static('public'));

//Listen
let port = 3000 || process.env.PORT;
server.listen(port, function() {
  console.log(`Server listening on port ${ port }`);
});

io.on('connection', function (socket) {
  socket.on('playermove', function (data) {
    PageHub.playerMove(data);
  });
  socket.on('playershoot', function (data) {
    PageHub.playerShoot(data);
  });
});

app.get('/bundle.js', (req, res) => {
  browserify({
    // debug: process.env.NODE_ENV == 'development'
    debug: true
  })
    .add('./game.js')
    .bundle()
    .pipe(res);
});



