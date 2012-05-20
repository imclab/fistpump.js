var express = require('express')
  , app =express.createServer()
  , io = require('socket.io').listen(app);

app.listen(3000);

app.configure(function() {
  app.use(express.static('./public'));
});

io.sockets.on('connection', function (socket) {
  socket.emit("HELO", { hello: 'world' });
  socket.on('clientVelocity', function (data) {
    console.log("velocity data: " + data);
  });
});
