"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTimeout = useTimeout;
var _useLazyRef = require("./useLazyRef");
var _useOnMount = require("./useOnMount");
class Timeout {
  constructor() {
    this.currentId = 0;
    this.clear = () => {
      if (this.currentId !== 0) {
        clearTimeout(this.currentId);
        this.currentId = 0;
      }
    };
    this.disposeEffect = () => {
      return this.clear;
    };
  }
  static create() {
    return new Timeout();
  }
  start(delay, fn) {
    this.clear();
    this.currentId = setTimeout(fn, delay);
  }
}
function useTimeout() {
  const timeout = (0, _useLazyRef.useLazyRef)(Timeout.create).current;
  (0, _useOnMount.useOnMount)(timeout.disposeEffect);
  return timeout;
}