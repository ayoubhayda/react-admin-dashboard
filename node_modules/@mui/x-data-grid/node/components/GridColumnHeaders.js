"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeaders = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _fastMemo = require("../utils/fastMemo");
var _useGridColumnHeaders = require("../hooks/features/columnHeaders/useGridColumnHeaders");
var _GridBaseColumnHeaders = require("./columnHeaders/GridBaseColumnHeaders");
var _GridColumnHeadersInner = require("./columnHeaders/GridColumnHeadersInner");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["innerRef", "className", "visibleColumns", "sortColumnLookup", "filterColumnLookup", "columnPositions", "columnHeaderTabIndexState", "columnGroupHeaderTabIndexState", "columnHeaderFocus", "columnGroupHeaderFocus", "densityFactor", "headerGroupingMaxDepth", "columnMenuState", "columnVisibility", "columnGroupsHeaderStructure", "hasOtherElementInTabSequence"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridColumnHeaders = /*#__PURE__*/React.forwardRef(function GridColumnsHeaders(props, ref) {
  const {
      innerRef,
      visibleColumns,
      sortColumnLookup,
      filterColumnLookup,
      columnPositions,
      columnHeaderTabIndexState,
      columnGroupHeaderTabIndexState,
      columnHeaderFocus,
      columnGroupHeaderFocus,
      densityFactor,
      headerGroupingMaxDepth,
      columnMenuState,
      columnVisibility,
      columnGroupsHeaderStructure,
      hasOtherElementInTabSequence
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    isDragging,
    getRootProps,
    getInnerProps,
    getColumnHeaders,
    getColumnGroupHeaders
  } = (0, _useGridColumnHeaders.useGridColumnHeaders)({
    innerRef,
    visibleColumns,
    sortColumnLookup,
    filterColumnLookup,
    columnPositions,
    columnHeaderTabIndexState,
    columnGroupHeaderTabIndexState,
    columnHeaderFocus,
    columnGroupHeaderFocus,
    densityFactor,
    headerGroupingMaxDepth,
    columnMenuState,
    columnVisibility,
    columnGroupsHeaderStructure,
    hasOtherElementInTabSequence
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridBaseColumnHeaders.GridBaseColumnHeaders, (0, _extends2.default)({
    ref: ref
  }, getRootProps(other), {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridColumnHeadersInner.GridColumnHeadersInner, (0, _extends2.default)({
      isDragging: isDragging
    }, getInnerProps(), {
      children: [getColumnGroupHeaders(), getColumnHeaders()]
    }))
  }));
});
process.env.NODE_ENV !== "production" ? GridColumnHeaders.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  columnGroupHeaderFocus: _propTypes.default.shape({
    depth: _propTypes.default.number.isRequired,
    field: _propTypes.default.string.isRequired
  }),
  columnGroupHeaderTabIndexState: _propTypes.default.shape({
    depth: _propTypes.default.number.isRequired,
    field: _propTypes.default.string.isRequired
  }),
  columnGroupsHeaderStructure: _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.shape({
    columnFields: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
    groupId: _propTypes.default.string
  }))).isRequired,
  columnHeaderFocus: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired
  }),
  columnHeaderTabIndexState: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired
  }),
  columnMenuState: _propTypes.default.shape({
    field: _propTypes.default.string,
    open: _propTypes.default.bool.isRequired
  }).isRequired,
  columnPositions: _propTypes.default.arrayOf(_propTypes.default.number).isRequired,
  columnVisibility: _propTypes.default.object.isRequired,
  densityFactor: _propTypes.default.number.isRequired,
  filterColumnLookup: _propTypes.default.object.isRequired,
  hasOtherElementInTabSequence: _propTypes.default.bool.isRequired,
  headerGroupingMaxDepth: _propTypes.default.number.isRequired,
  innerRef: _utils.refType,
  minColumnIndex: _propTypes.default.number,
  sortColumnLookup: _propTypes.default.object.isRequired,
  visibleColumns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired
} : void 0;
const MemoizedGridColumnHeaders = exports.GridColumnHeaders = (0, _fastMemo.fastMemo)(GridColumnHeaders);