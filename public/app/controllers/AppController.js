module.exports = /*@ngInject*/ function ($scope, SocketService) {
  
  SocketService.on('test', function (msg) {
    console.log(msg);
  });
  
  console.log('test');
  
};