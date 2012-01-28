var http = require('http')
  , app = http.createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , events = require('events')
  , mysql = require('mysql')
  , request = require('request')
  , jsdom = require('jsdom')
  , client = mysql.createClient({
    user : 'USERNAME',
    password : 'PASSWORD',
    host : 'localhost',
    database : 'DATABASE'
  });
  
io.set('log_level', 0);

app.listen(1337);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

function pollServer() {
 request({ uri:'http://localhost/otherdev/wpnode/wp_endpoint.php' }, function (error, response, body) {
  if (error && response.statusCode !== 200) {
    console.log('Error when contacting google.com')
  }
  
    app.posts = response.body;
  });
 
};
pollServer();
setInterval(pollServer, 5000);
  
  io.sockets.on('connection', function (socket) {
  socket.emit('news', app.posts);
  socket.on('my other event', function (data) {
    socket.emit('news', app.posts);
  });
  
});