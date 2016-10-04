const express = require('express');
const app = express();
const browserify = require('browserify');

app.use(express.static('public'));
app.get('/bundle.js', (req, res) => {
  browserify({
    // debug: process.env.NODE_ENV == 'development'
    debug: true
  })
    .add('./game.js')
    .bundle()
    .pipe(res);
});

let port = 3000 || process.env.PORT;
app.listen(port, function () {
  console.log(`Server listening on port ${ port }`);
});