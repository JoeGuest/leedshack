(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module("steambet",[require("./controllers"),require("./services"),require("./directives")]);
},{"./controllers":3,"./directives":5,"./services":9}],2:[function(require,module,exports){
module.exports=["$scope","SocketService","BetService","GameService",function(e,n,c,s){function t(){return{game:null,coins:null,bet:null,range:null,complete_time:null}}n.on("test",function(e){console.log(e)}),e.bet=t(),s.list().success(function(n){e.games=n}),s.richest().success(function(n){e.richest=n}),c.coins().success(function(n){e.coins=n}),e.submit=function(){c.create(e.bet).success(function(){e.message="BET SUBMITTED THANKS",e.bet=t()})},e.coinChange=function(){e.coins-e.bet.coins<0&&(e.bet.coins=e.coins)},e.changeGame=function(){s.getStats(e.bet.game.id).success(function(n){e.num_players=n[0].num_players})}}];

},{}],3:[function(require,module,exports){
module.exports=name="steambet.controllers",angular.module(name,[]).controller("AppController",require("./AppController"));

},{"./AppController":2}],4:[function(require,module,exports){
module.exports=function(){return{restrict:"C",require:"?ngModel",link:function(m,o,n,t){console.log(o[0]);var e=rome(o[0],{inputFormat:"DD/MM/YY HH:mm",initialValue:moment().format("DD/MM/YY HH:mm"),min:moment().format("DD/MM/YY HH:mm")});e.on("data",function(o){m.ngModel=moment(o,"DD/MM/YY HH:mm").format(),m.$apply()})}}};

},{}],5:[function(require,module,exports){
module.exports=name="steambet.directives",angular.module(name,[]).directive("datePicker",require("./datepicker"));

},{"./datepicker":4}],6:[function(require,module,exports){
module.exports=["$http",function(t){return{create:function(n){return t.post("/bet",n)},current:function(){return t.get("/bet/me")},friends:function(){return t.get("/bet/friends")},popular:function(){return t.get("/bet/popular")},coins:function(){return t.get("/coins")}}}];

},{}],7:[function(require,module,exports){
module.exports=["$http","SocketService",function(t,e){return{list:function(){return t.get("/games")},richest:function(){return t.get("/richest")},getStats:function(e){return t.get("/statsforgame",{params:{id:e}})}}}];

},{}],8:[function(require,module,exports){
module.exports=function(){var n=io.connect();return n};

},{}],9:[function(require,module,exports){
module.exports=name="steambet.services",angular.module(name,[]).factory("SocketService",require("./SocketService")).factory("BetService",require("./BetService")).factory("GameService",require("./GameService"));

},{"./BetService":6,"./GameService":7,"./SocketService":8}]},{},[1]);
