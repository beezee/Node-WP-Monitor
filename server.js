var http = require('http')
  , app = http.createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , events = require('events')
  , mysql = require('mysql')
  , client = mysql.createClient({
    user : 'USERNAME',
    password : 'PASSWORD',
    host : 'localhost',
    database : 'DBNAME'
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
 client.query(
  'SELECT * FROM wp_posts WHERE post_status IN ("draft", "publish") ORDER BY post_date DESC LIMIT 10 ',
  function (err, results, fields) {
    if (err) {
      throw err;
    }
    app.posts = results;
    console.log('ran query');
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