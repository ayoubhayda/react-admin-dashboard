"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterInputMultipleSingleSelect = GridFilterInputMultipleSingleSelect;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Autocomplete = _interopRequireWildcard(require("@mui/material/Autocomplete"));
var _utils = require("@mui/utils");
var _filterPanelUtils = require("./filterPanelUtils");
var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "color", "error", "helperText", "size", "variant", "getOptionLabel", "getOptionValue"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const filter = (0, _Autocomplete.createFilterOptions)();
function GridFilterInputMultipleSingleSelect(props) {
  const {
      item,
      applyValue,
      apiRef,
      focusElementRef,
      color,
      error,
      helperText,
      size,
      variant = 'standard',
      getOptionLabel: getOptionLabelProp,
      getOptionValue: getOptionValueProp
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const TextFieldProps = {
    color,
    error,
    helperText,
    size,
    variant
  };
  const id = (0, _utils.unstable_useId)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  let resolvedColumn = null;
  if (item.field) {
    const column = apiRef.current.getColumn(item.field);
    if ((0, _filterPanelUtils.isSingleSelectColDef)(column)) {
      resolvedColumn = column;
    }
  }
  const getOptionValue = getOptionValueProp || resolvedColumn?.getOptionValue;
  const getOptionLabel = getOptionLabelProp || resolvedColumn?.getOptionLabel;
  const isOptionEqualToValue = React.useCallback((option, value) => getOptionValue(option) === getOptionValue(value), [getOptionValue]);
  const resolvedValueOptions = React.useMemo(() => {
    if (!resolvedColumn?.valueOptions) {
      return [];
    }
    if (typeof resolvedColumn.valueOptions === 'function') {
      return resolvedColumn.valueOptions({
        field: resolvedColumn.field
      });
    }
    return resolvedColumn.valueOptions;
  }, [resolvedColumn]);
  const resolvedFormattedValueOptions = React.useMemo(() => {
    return resolvedValueOptions?.map(getOptionValue);
  }, [resolvedValueOptions, getOptionValue]);

  // The value is computed from the item.value and used directly
  // If it was done by a useEffect/useState, the Autocomplete could receive incoherent value and options
  const filteredValues = React.useMemo(() => {
    if (!Array.isArray(item.value)) {
      return [];
    }
    if (resolvedValueOptions !== undefined) {
      const itemValueIndexes = item.value.map(element => {
        // Gets the index matching between values and valueOptions
        return resolvedFormattedValueOptions?.findIndex(formattedOption => formattedOption === element);
      });
      return itemValueIndexes.filter(index => index >= 0).map(index => resolvedValueOptions[index]);
    }
    return item.value;
  }, [item.value, resolvedValueOptions, resolvedFormattedValueOptions]);
  React.useEffect(() => {
    if (!Array.isArray(item.value) || filteredValues.length !== item.value.length) {
      // Updates the state if the filter value has been cleaned by the component
      applyValue((0, _extends2.default)({}, item, {
        value: filteredValues.map(getOptionValue)
      }));
    }
  }, [item, filteredValues, applyValue, getOptionValue]);
  const handleChange = React.useCallback((event, value) => {
    applyValue((0, _extends2.default)({}, item, {
      value: value.map(getOptionValue)
    }));
  }, [applyValue, item, getOptionValue]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Autocomplete.default, (0, _extends2.default)({
    multiple: true,
    options: resolvedValueOptions,
    isOptionEqualToValue: isOptionEqualToValue,
    filterOptions: filter,
    id: id,
    value: filteredValues,
    onChange: handleChange,
    getOptionLabel: getOptionLabel,
    renderTags: (value, getTagProps) => value.map((option, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseChip, (0, _extends2.default)({
      variant: "outlined",
      size: "small",
      label: getOptionLabel(option)
    }, getTagProps({
      index
    })))),
    renderInput: params => /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseTextField, (0, _extends2.default)({}, params, {
      label: apiRef.current.getLocaleText('filterPanelInputLabel'),
      placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
      InputLabelProps: (0, _extends2.default)({}, params.InputLabelProps, {
        shrink: true
      }),
      inputRef: focusElementRef,
      type: "singleSelect"
    }, TextFieldProps, rootProps.slotProps?.baseTextField))
  }, other));
}
process.env.NODE_ENV !== "production" ? GridFilterInputMultipleSingleSelect.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: _propTypes.default.shape({
    current: _propTypes.default.object.isRequired
  }).isRequired,
  applyValue: _propTypes.default.func.isRequired,
  focusElementRef: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  /**
   * Used to determine the label displayed for a given value option.
   * @param {ValueOptions} value The current value option.
   * @returns {string} The text to be displayed.
   */
  getOptionLabel: _propTypes.default.func,
  /**
   * Used to determine the value used for a value option.
   * @param {ValueOptions} value The current value option.
   * @returns {string} The value to be used.
   */
  getOptionValue: _propTypes.default.func,
  item: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    operator: _propTypes.default.string.isRequired,
    value: _propTypes.default.any
  }).isRequired,
  type: _propTypes.default.oneOf(['singleSelect'])
} : void 0;