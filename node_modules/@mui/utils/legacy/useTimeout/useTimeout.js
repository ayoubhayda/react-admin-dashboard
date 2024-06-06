'use client';

import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import useLazyRef from '../useLazyRef/useLazyRef';
import useOnMount from '../useOnMount/useOnMount';
export var Timeout = /*#__PURE__*/function () {
  function Timeout() {
    var _this = this;
    _classCallCheck(this, Timeout);
    this.currentId = 0;
    this.clear = function () {
      if (_this.currentId !== 0) {
        clearTimeout(_this.currentId);
        _this.currentId = 0;
      }
    };
    this.disposeEffect = function () {
      return _this.clear;
    };
  }
  _createClass(Timeout, [{
    key: "start",
    value:
    /**
     * Executes `fn` after `delay`, clearing any previously scheduled call.
     */
    function start(delay, fn) {
      var _this2 = this;
      this.clear();
      this.currentId = setTimeout(function () {
        _this2.currentId = 0;
        fn();
      }, delay);
    }
  }], [{
    key: "create",
    value: function create() {
      return new Timeout();
    }
  }]);
  return Timeout;
}();
export default function useTimeout() {
  var timeout = useLazyRef(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}