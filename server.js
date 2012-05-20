var express = require('express')
  , app =express.createServer()
  , io = require('socket.io').listen(app);

app.listen(3000);

app.configure(function() {
  app.use(express.static('./public'));
});


io.sockets.on('connection', function (socket) {
  socket.on('clientVelocity', function(data){
    if(data.b > 0 && Math.abs(data.g) < 70){
      angle = data.b
      data['angle'] = angle
      socket.broadcast.emit('fuckingVelocity', data)
    }

    if(data.b > 0 && Math.abs(data.g) >= 70){
      angle = 180 - data.b
      data['angle'] = angle
      socket.broadcast.emit('fuckingVelocity', data)
    }

    if(data.b < 0){
      angle = Math.abs(data.b)
      data['angle'] = angle
      socket.broadcast.emit('fuckingVelocity', data)
    }
  })

  socket.on('wantVelocity', function(data){
      socket.broadcast.emit('getVelocity')
  })

  socket.on('gotVelocity', function(data){
    console.log("WOOOO")
    socket.broadcast.emit('browserVolume', data)
  });
});