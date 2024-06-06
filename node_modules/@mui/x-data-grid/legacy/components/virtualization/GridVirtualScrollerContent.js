import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(props, overflowedContent) {
  var classes = props.classes;
  var slots = {
    root: ['virtualScrollerContent', overflowedContent && 'virtualScrollerContent--overflowed']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
var VirtualScrollerContentRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'VirtualScrollerContent',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.virtualScrollerContent;
  }
})({});
var GridVirtualScrollerContent = /*#__PURE__*/React.forwardRef(function GridVirtualScrollerContent(props, ref) {
  var _props$style;
  var rootProps = useGridRootProps();
  var overflowedContent = !rootProps.autoHeight && ((_props$style = props.style) == null ? void 0 : _props$style.minHeight) === 'auto';
  var classes = useUtilityClasses(rootProps, overflowedContent);
  return /*#__PURE__*/_jsx(VirtualScrollerContentRoot, _extends({
    ref: ref
  }, props, {
    ownerState: rootProps,
    className: clsx(classes.root, props.className)
  }));
});
export { GridVirtualScrollerContent };