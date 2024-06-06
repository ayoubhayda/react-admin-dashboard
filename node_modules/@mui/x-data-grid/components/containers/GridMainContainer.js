import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { styled } from '@mui/system';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridAriaAttributes } from '../../hooks/utils/useGridAriaAttributes';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['main']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
const GridMainContainerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'Main',
  overridesResolver: (props, styles) => styles.main
})(() => ({
  position: 'relative',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
}));
export const GridMainContainer = /*#__PURE__*/React.forwardRef((props, ref) => {
  var _rootProps$experiment;
  const rootProps = useGridRootProps();
  const classes = useUtilityClasses(rootProps);
  const getAriaAttributes = (_rootProps$experiment = rootProps.experimentalFeatures) != null && _rootProps$experiment.ariaV7 // ariaV7 should never change
  ? useGridAriaAttributes : null;
  const ariaAttributes = typeof getAriaAttributes === 'function' ? getAriaAttributes() : null;
  return /*#__PURE__*/_jsx(GridMainContainerRoot, _extends({
    ref: ref,
    className: classes.root,
    ownerState: rootProps
  }, ariaAttributes, {
    children: props.children
  }));
});