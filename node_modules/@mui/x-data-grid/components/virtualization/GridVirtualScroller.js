import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['virtualScroller']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
const VirtualScrollerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'VirtualScroller',
  overridesResolver: (props, styles) => styles.virtualScroller
})({
  overflow: 'auto',
  height: '100%',
  // See https://github.com/mui/mui-x/issues/4360
  position: 'relative',
  '@media print': {
    overflow: 'hidden'
  },
  zIndex: 0 // See https://github.com/mui/mui-x/issues/10547
});
const GridVirtualScroller = /*#__PURE__*/React.forwardRef(function GridVirtualScroller(props, ref) {
  const rootProps = useGridRootProps();
  const classes = useUtilityClasses(rootProps);
  return /*#__PURE__*/_jsx(VirtualScrollerRoot, _extends({
    ref: ref
  }, props, {
    className: clsx(classes.root, props.className),
    ownerState: rootProps
  }));
});
export { GridVirtualScroller };