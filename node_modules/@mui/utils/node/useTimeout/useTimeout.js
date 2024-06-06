"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeout = void 0;
exports.default = useTimeout;
var _useLazyRef = _interopRequireDefault(require("../useLazyRef/useLazyRef"));
var _useOnMount = _interopRequireDefault(require("../useOnMount/useOnMount"));
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
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = 0;
      fn();
    }, delay);
  }
}
exports.Timeout = Timeout;
function useTimeout() {
  const timeout = (0, _useLazyRef.default)(Timeout.create).current;
  (0, _useOnMount.default)(timeout.disposeEffect);
  return timeout;
}