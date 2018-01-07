const app = require('./app');
const http = require('http');
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const socket = require('socket.io')

const io = socket(server);
io.on('connection', function(socket) {
  console.log('User connected', socket.id)

  socket.on('send:message', function(conversationId) {
    io.emit('receieve:message', conversationId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
})

server.listen(port);
console.log('Server listening:', port);
