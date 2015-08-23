(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module("steambet",[require("./controllers"),require("./services"),require("./directives")]);
},{"./controllers":3,"./directives":5,"./services":9}],2:[function(require,module,exports){
module.exports=["$scope","SocketService","BetService","GameService","$interval",function(e,n,c,s,t){function o(){return{game:null,coins:null,bet:null,range:null,complete_time:null}}function u(){s.richest().success(function(n){e.richest=n})}function i(){c.coins().success(function(n){e.coins=n})}function l(){c.yourbets().success(function(n){e.yourbets=n})}function f(){c.yourprebets().success(function(n){e.yourprebets=n})}function r(){c.allbets().success(function(n){e.allbets=n})}n.on("test",function(e){console.log(e)}),e.bet=o(),s.list().success(function(n){e.games=n}),u(),t(u,5e3),i(),t(i,5e3),l(),t(l,5e3),f(),t(f,5e3),r(),t(r,5e3),e.submit=function(){c.create(e.bet).success(function(n){e.coins=n,e.message="bet placed!",e.bet=o(),l()})},e.coinChange=function(){e.coins-e.bet.coins<0&&(e.bet.coins=e.coins)},e.changeGame=function(){s.getStats(e.bet.game.id).success(function(n){e.num_players=n[0].num_players})}}];

},{}],3:[function(require,module,exports){
module.exports=name="steambet.controllers",angular.module(name,[]).controller("AppController",require("./AppController"));

},{"./AppController":2}],4:[function(require,module,exports){
module.exports=function(){return{restrict:"C",require:"?ngModel",link:function(e,m,n,t){var r=rome(m[0],{inputFormat:"DD/MM/YY HH:mm",initialValue:moment().format("DD/MM/YY HH:mm"),min:moment().format("DD/MM/YY HH:mm")});r.on("data",function(e){t.$setViewValue(e),t.$render()})}}};

},{}],5:[function(require,module,exports){
module.exports=name="steambet.directives",angular.module(name,[]).directive("datePicker",require("./datepicker"));

},{"./datepicker":4}],6:[function(require,module,exports){
module.exports=["$http",function(t){return{create:function(e){return t.post("/bet",e)},current:function(){return t.get("/bet/me")},friends:function(){return t.get("/bet/friends")},popular:function(){return t.get("/bet/popular")},coins:function(){return t.get("/coins")},yourbets:function(){return t.get("/yourbets")},yourprebets:function(){return t.get("/yourprebets")},allbets:function(){return t.get("/allbets")}}}];

},{}],7:[function(require,module,exports){
module.exports=["$http","SocketService",function(t,e){return{list:function(){return t.get("/games")},richest:function(){return t.get("/richest")},getStats:function(e){return t.get("/statsforgame",{params:{id:e}})}}}];

},{}],8:[function(require,module,exports){
module.exports=function(){var n=io.connect();return n};

},{}],9:[function(require,module,exports){
module.exports=name="steambet.services",angular.module(name,[]).factory("SocketService",require("./SocketService")).factory("BetService",require("./BetService")).factory("GameService",require("./GameService"));

},{"./BetService":6,"./GameService":7,"./SocketService":8}]},{},[1]);
