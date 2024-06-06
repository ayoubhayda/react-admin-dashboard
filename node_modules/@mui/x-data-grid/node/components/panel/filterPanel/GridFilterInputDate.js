"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterInputDate = GridFilterInputDate;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _useTimeout = require("../../../hooks/utils/useTimeout");
var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "InputProps", "isFilterActive", "clearButton", "tabIndex", "disabled"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function GridFilterInputDate(props) {
  const {
      item,
      applyValue,
      type,
      apiRef,
      focusElementRef,
      InputProps,
      clearButton,
      tabIndex,
      disabled
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const filterTimeout = (0, _useTimeout.useTimeout)();
  const [filterValueState, setFilterValueState] = React.useState(item.value ?? '');
  const [applying, setIsApplying] = React.useState(false);
  const id = (0, _utils.unstable_useId)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const onFilterChange = React.useCallback(event => {
    const value = event.target.value;
    setFilterValueState(String(value));
    setIsApplying(true);
    filterTimeout.start(rootProps.filterDebounceMs, () => {
      applyValue((0, _extends2.default)({}, item, {
        value
      }));
      setIsApplying(false);
    });
  }, [applyValue, item, rootProps.filterDebounceMs, filterTimeout]);
  React.useEffect(() => {
    const itemValue = item.value ?? '';
    setFilterValueState(String(itemValue));
  }, [item.value]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseTextField, (0, _extends2.default)({
    fullWidth: true,
    id: id,
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
    value: filterValueState,
    onChange: onFilterChange,
    variant: "standard",
    type: type || 'text',
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef,
    InputProps: (0, _extends2.default)({}, applying || clearButton ? {
      endAdornment: applying ? /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.loadIcon, {
        fontSize: "small",
        color: "action"
      }) : clearButton
    } : {}, {
      disabled
    }, InputProps, {
      inputProps: (0, _extends2.default)({
        max: type === 'datetime-local' ? '9999-12-31T23:59' : '9999-12-31',
        tabIndex
      }, InputProps?.inputProps)
    })
  }, other, rootProps.slotProps?.baseTextField));
}
process.env.NODE_ENV !== "production" ? GridFilterInputDate.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: _propTypes.default.shape({
    current: _propTypes.default.object.isRequired
  }).isRequired,
  applyValue: _propTypes.default.func.isRequired,
  clearButton: _propTypes.default.node,
  focusElementRef: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  /**
   * It is `true` if the filter either has a value or an operator with no value
   * required is selected (e.g. `isEmpty`)
   */
  isFilterActive: _propTypes.default.bool,
  item: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    operator: _propTypes.default.string.isRequired,
    value: _propTypes.default.any
  }).isRequired
} : void 0;