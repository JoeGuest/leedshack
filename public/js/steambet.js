(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module("steambet",[require("./controllers"),require("./services"),require("./directives")]);
},{"./controllers":3,"./directives":4,"./services":6}],2:[function(require,module,exports){
module.exports=["$scope","SocketService","BetService","GameService",function(e,n,t,c){function o(){return{game:null,coins:null,bet:null,range:null,complete_time:null}}n.on("test",function(e){console.log(e)}),e.bet=o(),c.list().success(function(n){e.games=n}),e.submit=function(){t.create(e.bet).success(function(){e.message="BET SUBMITTED THANKS",e.bet=o()})}}];

},{}],3:[function(require,module,exports){
module.exports=name="steambet.controllers",angular.module(name,[]).controller("AppController",require("./AppController"));

},{"./AppController":2}],4:[function(require,module,exports){
module.exports=name="steambet.directives",angular.module(name,[]);

},{}],5:[function(require,module,exports){
module.exports=function(){var n=io.connect();return n};

},{}],6:[function(require,module,exports){
module.exports=name="steambet.services",angular.module(name,[]).factory("SocketService",require("./SocketService"));

},{"./SocketService":5}]},{},[1]);
