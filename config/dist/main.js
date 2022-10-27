/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/count.js
function count() {
  for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
    arg[_key] = arguments[_key];
  }
  return arg.reduce((pre, cur) => pre + cur, 0);
}
;// CONCATENATED MODULE: ./src/main.js



console.log(count(5, 4));
/******/ })()
;