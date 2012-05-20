var express = require('express')
  , app =express.createServer()
  , io = require('socket.io').listen(app);

app.listen(3000);

app.configure(function() {
  app.use(express.static('./public'));
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
