import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "getOptionLabel", "getOptionValue", "placeholder", "tabIndex", "label", "variant", "isFilterActive", "clearButton", "InputLabelProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/utils';
import { styled } from '@mui/material/styles';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { getValueFromValueOptions, isSingleSelectColDef } from './filterPanelUtils';
import { createElement as _createElement } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const renderSingleSelectOptions = ({
  column: {
    valueOptions,
    field
  },
  OptionComponent,
  getOptionLabel,
  getOptionValue,
  isSelectNative,
  baseSelectOptionProps
}) => {
  const iterableColumnValues = typeof valueOptions === 'function' ? ['', ...valueOptions({
    field
  })] : ['', ...(valueOptions || [])];
  return iterableColumnValues.map(option => {
    const value = getOptionValue(option);
    const label = getOptionLabel(option);
    return /*#__PURE__*/_createElement(OptionComponent, _extends({}, baseSelectOptionProps, {
      native: isSelectNative,
      key: value,
      value: value
    }), label);
  });
};
const SingleSelectOperatorContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  [`& button`]: {
    margin: 'auto 0px 5px 5px'
  }
});
function GridFilterInputSingleSelect(props) {
  const {
      item,
      applyValue,
      type,
      apiRef,
      focusElementRef,
      getOptionLabel: getOptionLabelProp,
      getOptionValue: getOptionValueProp,
      placeholder,
      tabIndex,
      label: labelProp,
      variant = 'standard',
      clearButton
    } = props,
    others = _objectWithoutPropertiesLoose(props, _excluded);
  const [filterValueState, setFilterValueState] = React.useState(item.value ?? '');
  const id = useId();
  const labelId = useId();
  const rootProps = useGridRootProps();
  const isSelectNative = rootProps.slotProps?.baseSelect?.native ?? true;
  let resolvedColumn = null;
  if (item.field) {
    const column = apiRef.current.getColumn(item.field);
    if (isSingleSelectColDef(column)) {
      resolvedColumn = column;
    }
  }
  const getOptionValue = getOptionValueProp || resolvedColumn?.getOptionValue;
  const getOptionLabel = getOptionLabelProp || resolvedColumn?.getOptionLabel;
  const currentValueOptions = React.useMemo(() => {
    if (!resolvedColumn) {
      return undefined;
    }
    return typeof resolvedColumn.valueOptions === 'function' ? resolvedColumn.valueOptions({
      field: resolvedColumn.field
    }) : resolvedColumn.valueOptions;
  }, [resolvedColumn]);
  const onFilterChange = React.useCallback(event => {
    let value = event.target.value;

    // NativeSelect casts the value to a string.
    value = getValueFromValueOptions(value, currentValueOptions, getOptionValue);
    setFilterValueState(String(value));
    applyValue(_extends({}, item, {
      value
    }));
  }, [currentValueOptions, getOptionValue, applyValue, item]);
  React.useEffect(() => {
    let itemValue;
    if (currentValueOptions !== undefined) {
      // sanitize if valueOptions are provided
      itemValue = getValueFromValueOptions(item.value, currentValueOptions, getOptionValue);
      if (itemValue !== item.value) {
        applyValue(_extends({}, item, {
          value: itemValue
        }));
        return;
      }
    } else {
      itemValue = item.value;
    }
    itemValue = itemValue ?? '';
    setFilterValueState(String(itemValue));
  }, [item, currentValueOptions, applyValue, getOptionValue]);
  if (!isSingleSelectColDef(resolvedColumn)) {
    return null;
  }
  if (!isSingleSelectColDef(resolvedColumn)) {
    return null;
  }
  const label = labelProp ?? apiRef.current.getLocaleText('filterPanelInputLabel');
  return /*#__PURE__*/_jsxs(SingleSelectOperatorContainer, {
    children: [/*#__PURE__*/_jsxs(rootProps.slots.baseFormControl, {
      children: [/*#__PURE__*/_jsx(rootProps.slots.baseInputLabel, _extends({}, rootProps.slotProps?.baseInputLabel, {
        id: labelId,
        htmlFor: id,
        shrink: true,
        variant: variant,
        children: label
      })), /*#__PURE__*/_jsx(rootProps.slots.baseSelect, _extends({
        id: id,
        label: label,
        labelId: labelId,
        value: filterValueState,
        onChange: onFilterChange,
        variant: variant,
        type: type || 'text',
        inputProps: {
          tabIndex,
          ref: focusElementRef,
          placeholder: placeholder ?? apiRef.current.getLocaleText('filterPanelInputPlaceholder')
        },
        native: isSelectNative,
        notched: variant === 'outlined' ? true : undefined
      }, others /* FIXME: typing error */, rootProps.slotProps?.baseSelect, {
        children: renderSingleSelectOptions({
          column: resolvedColumn,
          OptionComponent: rootProps.slots.baseSelectOption,
          getOptionLabel,
          getOptionValue,
          isSelectNative,
          baseSelectOptionProps: rootProps.slotProps?.baseSelectOption
        })
      }))]
    }), clearButton]
  });
}
process.env.NODE_ENV !== "production" ? GridFilterInputSingleSelect.propTypes = {
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
   * Used to determine the label displayed for a given value option.
   * @param {ValueOptions} value The current value option.
   * @returns {string} The text to be displayed.
   */
  getOptionLabel: PropTypes.func,
  /**
   * Used to determine the value used for a value option.
   * @param {ValueOptions} value The current value option.
   * @returns {string} The value to be used.
   */
  getOptionValue: PropTypes.func,
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
export { GridFilterInputSingleSelect };