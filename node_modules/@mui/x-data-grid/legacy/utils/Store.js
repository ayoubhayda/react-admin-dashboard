import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var Store = /*#__PURE__*/function () {
  function Store(_value) {
    var _this = this;
    _classCallCheck(this, Store);
    this.value = void 0;
    this.listeners = void 0;
    this.subscribe = function (fn) {
      _this.listeners.add(fn);
      return function () {
        _this.listeners.delete(fn);
      };
    };
    this.getSnapshot = function () {
      return _this.value;
    };
    this.update = function (value) {
      _this.value = value;
      _this.listeners.forEach(function (l) {
        return l(value);
      });
    };
    this.value = _value;
    this.listeners = new Set();
  }
  _createClass(Store, null, [{
    key: "create",
    value: function create(value) {
      return new Store(value);
    }
  }]);
  return Store;
}();