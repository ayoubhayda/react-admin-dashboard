import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { useLazyRef } from './useLazyRef';
import { useOnMount } from './useOnMount';
var Timeout = /*#__PURE__*/function () {
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
    value: function start(delay, fn) {
      this.clear();
      this.currentId = setTimeout(fn, delay);
    }
  }], [{
    key: "create",
    value: function create() {
      return new Timeout();
    }
  }]);
  return Timeout;
}();
export function useTimeout() {
  var timeout = useLazyRef(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}