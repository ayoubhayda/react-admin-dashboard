import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["item", "applyValue", "apiRef", "focusElementRef", "isFilterActive", "clearButton", "tabIndex", "label", "variant", "InputLabelProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { refType, unstable_useId as useId } from '@mui/utils';
import { styled } from '@mui/material/styles';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var BooleanOperatorContainer = styled('div')(_defineProperty({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
}, "& button", {
  margin: 'auto 0px 5px 5px'
}));
function GridFilterInputBoolean(props) {
  var _rootProps$slotProps, _baseSelectProps$nati, _rootProps$slotProps2, _rootProps$slotProps3;
  var item = props.item,
    applyValue = props.applyValue,
    apiRef = props.apiRef,
    focusElementRef = props.focusElementRef,
    isFilterActive = props.isFilterActive,
    clearButton = props.clearButton,
    tabIndex = props.tabIndex,
    labelProp = props.label,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'standard' : _props$variant,
    InputLabelProps = props.InputLabelProps,
    others = _objectWithoutProperties(props, _excluded);
  var _React$useState = React.useState(item.value || ''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filterValueState = _React$useState2[0],
    setFilterValueState = _React$useState2[1];
  var rootProps = useGridRootProps();
  var labelId = useId();
  var selectId = useId();
  var baseSelectProps = ((_rootProps$slotProps = rootProps.slotProps) == null ? void 0 : _rootProps$slotProps.baseSelect) || {};
  var isSelectNative = (_baseSelectProps$nati = baseSelectProps.native) != null ? _baseSelectProps$nati : true;
  var baseSelectOptionProps = ((_rootProps$slotProps2 = rootProps.slotProps) == null ? void 0 : _rootProps$slotProps2.baseSelectOption) || {};
  var onFilterChange = React.useCallback(function (event) {
    var value = event.target.value;
    setFilterValueState(value);
    applyValue(_extends({}, item, {
      value: value
    }));
  }, [applyValue, item]);
  React.useEffect(function () {
    setFilterValueState(item.value || '');
  }, [item.value]);
  var label = labelProp != null ? labelProp : apiRef.current.getLocaleText('filterPanelInputLabel');
  return /*#__PURE__*/_jsxs(BooleanOperatorContainer, {
    children: [/*#__PURE__*/_jsxs(rootProps.slots.baseFormControl, {
      fullWidth: true,
      children: [/*#__PURE__*/_jsx(rootProps.slots.baseInputLabel, _extends({}, (_rootProps$slotProps3 = rootProps.slotProps) == null ? void 0 : _rootProps$slotProps3.baseInputLabel, {
        id: labelId,
        shrink: true,
        variant: variant,
        children: label
      })), /*#__PURE__*/_jsxs(rootProps.slots.baseSelect, _extends({
        labelId: labelId,
        id: selectId,
        label: label,
        value: filterValueState,
        onChange: onFilterChange,
        variant: variant,
        notched: variant === 'outlined' ? true : undefined,
        native: isSelectNative,
        displayEmpty: true,
        inputProps: {
          ref: focusElementRef,
          tabIndex: tabIndex
        }
      }, others, baseSelectProps, {
        children: [/*#__PURE__*/_jsx(rootProps.slots.baseSelectOption, _extends({}, baseSelectOptionProps, {
          native: isSelectNative,
          value: "",
          children: apiRef.current.getLocaleText('filterValueAny')
        })), /*#__PURE__*/_jsx(rootProps.slots.baseSelectOption, _extends({}, baseSelectOptionProps, {
          native: isSelectNative,
          value: "true",
          children: apiRef.current.getLocaleText('filterValueTrue')
        })), /*#__PURE__*/_jsx(rootProps.slots.baseSelectOption, _extends({}, baseSelectOptionProps, {
          native: isSelectNative,
          value: "false",
          children: apiRef.current.getLocaleText('filterValueFalse')
        }))]
      }))]
    }), clearButton]
  });
}
process.env.NODE_ENV !== "production" ? GridFilterInputBoolean.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired
  }).isRequired,
  applyValue: PropTypes.func.isRequired,
  clearButton: PropTypes.node,
  focusElementRef: refType,
  /**
   * It is `true` if the filter either has a value or an operator with no value
   * required is selected (e.g. `isEmpty`)
   */
  isFilterActive: PropTypes.bool,
  item: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operator: PropTypes.string.isRequired,
    value: PropTypes.any
  }).isRequired
} : void 0;
export { GridFilterInputBoolean };