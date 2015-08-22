module.exports = function (socket) {
  
  socket.emit('test', 'Hello ' + socket.request.user.username);
  
};
