import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "tabIndex", "disabled", "isFilterActive", "clearButton", "InputProps", "variant"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/utils';
import { useTimeout } from '../../../hooks/utils/useTimeout';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
function GridFilterInputValue(props) {
  var _item$value, _rootProps$slotProps;
  var item = props.item,
    applyValue = props.applyValue,
    type = props.type,
    apiRef = props.apiRef,
    focusElementRef = props.focusElementRef,
    tabIndex = props.tabIndex,
    disabled = props.disabled,
    isFilterActive = props.isFilterActive,
    clearButton = props.clearButton,
    InputProps = props.InputProps,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'standard' : _props$variant,
    others = _objectWithoutProperties(props, _excluded);
  var filterTimeout = useTimeout();
  var _React$useState = React.useState((_item$value = item.value) != null ? _item$value : ''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filterValueState = _React$useState2[0],
    setFilterValueState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    applying = _React$useState4[0],
    setIsApplying = _React$useState4[1];
  var id = useId();
  var rootProps = useGridRootProps();
  var onFilterChange = React.useCallback(function (event) {
    var value = event.target.value;
    setFilterValueState(String(value));
    setIsApplying(true);
    filterTimeout.start(rootProps.filterDebounceMs, function () {
      var newItem = _extends({}, item, {
        value: value,
        fromInput: id
      });
      applyValue(newItem);
      setIsApplying(false);
    });
  }, [id, applyValue, item, rootProps.filterDebounceMs, filterTimeout]);
  React.useEffect(function () {
    var itemPlusTag = item;
    if (itemPlusTag.fromInput !== id || item.value === undefined) {
      var _item$value2;
      setFilterValueState(String((_item$value2 = item.value) != null ? _item$value2 : ''));
    }
  }, [id, item]);
  return /*#__PURE__*/_jsx(rootProps.slots.baseTextField, _extends({
    id: id,
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
    value: filterValueState,
    onChange: onFilterChange,
    variant: variant,
    type: type || 'text',
    InputProps: _extends({}, applying || clearButton ? {
      endAdornment: applying ? /*#__PURE__*/_jsx(rootProps.slots.loadIcon, {
        fontSize: "small",
        color: "action"
      }) : clearButton
    } : {}, {
      disabled: disabled
    }, InputProps, {
      inputProps: _extends({
        tabIndex: tabIndex
      }, InputProps == null ? void 0 : InputProps.inputProps)
    }),
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef
  }, others, (_rootProps$slotProps = rootProps.slotProps) == null ? void 0 : _rootProps$slotProps.baseTextField));
}
process.env.NODE_ENV !== "production" ? GridFilterInputValue.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired
  }).isRequired,
  applyValue: PropTypes.func.isRequired,
  clearButton: PropTypes.node,
  focusElementRef: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.func, PropTypes.object]),
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
export { GridFilterInputValue };