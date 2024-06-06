"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeadersInner = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _utils = require("@mui/utils");
var _system = require("@mui/system");
var _gridClasses = require("../../constants/gridClasses");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["isDragging", "className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    isDragging,
    hasScrollX,
    classes
  } = ownerState;
  const slots = {
    root: ['columnHeadersInner', isDragging && 'columnHeaderDropZone', hasScrollX && 'columnHeadersInner--scrollable']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
const GridColumnHeadersInnerRoot = (0, _system.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'columnHeadersInner',
  overridesResolver: (props, styles) => [{
    [`&.${_gridClasses.gridClasses.columnHeaderDropZone}`]: styles.columnHeaderDropZone
  }, styles.columnHeadersInner]
})(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  [`&.${_gridClasses.gridClasses.columnHeaderDropZone} .${_gridClasses.gridClasses.columnHeaderDraggableContainer}`]: {
    cursor: 'move'
  },
  [`&.${_gridClasses.gridClasses['columnHeadersInner--scrollable']} .${_gridClasses.gridClasses.columnHeader}:last-child`]: {
    borderRight: 'none'
  }
}));
const GridColumnHeadersInner = exports.GridColumnHeadersInner = /*#__PURE__*/React.forwardRef(function GridColumnHeadersInner(props, ref) {
  const {
      isDragging,
      className
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = (0, _extends2.default)({}, rootProps, {
    isDragging,
    hasScrollX: apiRef.current.getRootDimensions()?.hasScrollX ?? false
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridColumnHeadersInnerRoot, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(className, classes.root),
    ownerState: ownerState
  }, other));
});