module.exports = function (socket) {
  
  console.log('HELLO');
  
  socket.emit('test', 'Hello ' + socket.request.user.username);
  
};
