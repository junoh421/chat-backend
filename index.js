const app = require('./app');
const http = require('http');
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const socket = require('socket.io')

const io = socket(server);
io.on('connection', function(socket) {
  console.log('User connected', socket.id)

  socket.on('send:message', function(message) {
    io.emit('sent:message', message);
  });

  socket.on('update:message', function(message) {
    io.emit('updated:message', message);
  });

  socket.on('delete:message', function(messageId) {
    io.emit('deleted:message', messageId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
})

server.listen(port, () => {
  console.log('Server listening:', port);
});
