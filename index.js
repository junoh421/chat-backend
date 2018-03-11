const app = require('./app');
const http = require('http');
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const socket = require('socket.io')
const io = socket(server);
app.io = io;

io.on('connection', function(socket) {
  socket.on('user:login', (userId) => {
    socket.user = userId;
    console.log('user-' + socket.user.userId + ' online');
    socket.emit('online:user', userId);
  })

  socket.on('disconnect', () => {
    userId = socket.user;
    socket.emit('offline:user', userId);
  });
})

server.listen(port, () => {
  console.log('Server listening:', port);
});
