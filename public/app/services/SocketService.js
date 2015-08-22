module.exports = /*@ngInject*/ function () {
  var socket = io.connect();
  return socket;
};