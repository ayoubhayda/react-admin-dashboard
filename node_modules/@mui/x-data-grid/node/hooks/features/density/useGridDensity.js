"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridDensity = exports.densityStateInitializer = exports.COMPACT_DENSITY_FACTOR = exports.COMFORTABLE_DENSITY_FACTOR = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useGridLogger = require("../../utils/useGridLogger");
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _densitySelector = require("./densitySelector");
var _utils = require("../../../utils/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const COMPACT_DENSITY_FACTOR = exports.COMPACT_DENSITY_FACTOR = 0.7;
const COMFORTABLE_DENSITY_FACTOR = exports.COMFORTABLE_DENSITY_FACTOR = 1.3;
const DENSITY_FACTORS = {
  compact: COMPACT_DENSITY_FACTOR,
  comfortable: COMFORTABLE_DENSITY_FACTOR,
  standard: 1
};
const densityStateInitializer = (state, props) => (0, _extends2.default)({}, state, {
  density: {
    value: props.density,
    factor: DENSITY_FACTORS[props.density]
  }
});
exports.densityStateInitializer = densityStateInitializer;
const useGridDensity = (apiRef, props) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useDensity');
  const setDensity = React.useCallback(newDensity => {
    logger.debug(`Set grid density to ${newDensity}`);
    apiRef.current.setState(state => {
      const currentDensityState = (0, _densitySelector.gridDensitySelector)(state);
      const newDensityState = {
        value: newDensity,
        factor: DENSITY_FACTORS[newDensity]
      };
      if ((0, _utils.isDeepEqual)(currentDensityState, newDensityState)) {
        return state;
      }
      return (0, _extends2.default)({}, state, {
        density: newDensityState
      });
    });
    apiRef.current.forceUpdate();
  }, [logger, apiRef]);
  React.useEffect(() => {
    apiRef.current.setDensity(props.density);
  }, [apiRef, props.density]);
  const densityApi = {
    setDensity
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, densityApi, 'public');
};
exports.useGridDensity = useGridDensity;