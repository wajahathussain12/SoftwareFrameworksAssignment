module.exports = {
  connect: function(io, PORT) {
    io.on('connection', socket => {
      console.log('user connection on Port ' + PORT + ':' + socket.id)

      // socket.on('create', function(room) {
      //   socket.join(room)
      //   console, log('server room + ' + room)
      // })
      socket.on('message', message => {
        console.log('server message + ' + message)
        io.emit('message', message)
      })
    })
  }
}
