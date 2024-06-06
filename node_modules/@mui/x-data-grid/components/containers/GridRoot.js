import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "className"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef, unstable_useEnhancedEffect as useEnhancedEffect, unstable_capitalize as capitalize, unstable_composeClasses as composeClasses } from '@mui/utils';
import { GridRootStyles } from './GridRootStyles';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridPrivateApiContext } from '../../hooks/utils/useGridPrivateApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { gridDensityValueSelector } from '../../hooks/features/density/densitySelector';
import { useGridAriaAttributes } from '../../hooks/utils/useGridAriaAttributes';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    autoHeight,
    density,
    classes
  } = ownerState;
  const slots = {
    root: ['root', autoHeight && 'autoHeight', `root--density${capitalize(density)}`, 'withBorderColor']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
const GridRoot = /*#__PURE__*/React.forwardRef(function GridRoot(props, ref) {
  var _rootProps$experiment;
  const rootProps = useGridRootProps();
  const {
      children,
      className
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const apiRef = useGridPrivateApiContext();
  const densityValue = useGridSelector(apiRef, gridDensityValueSelector);
  const rootContainerRef = React.useRef(null);
  const handleRef = useForkRef(rootContainerRef, ref);
  const getAriaAttributes = (_rootProps$experiment = rootProps.experimentalFeatures) != null && _rootProps$experiment.ariaV7 // ariaV7 should never change
  ? null : useGridAriaAttributes;
  const ariaAttributes = typeof getAriaAttributes === 'function' ? getAriaAttributes() : null;
  const ownerState = _extends({}, rootProps, {
    density: densityValue
  });
  const classes = useUtilityClasses(ownerState);
  apiRef.current.register('public', {
    rootElementRef: rootContainerRef
  });

  // Our implementation of <NoSsr />
  const [mountedState, setMountedState] = React.useState(false);
  useEnhancedEffect(() => {
    setMountedState(true);
  }, []);
  if (!mountedState) {
    return null;
  }
  return /*#__PURE__*/_jsx(GridRootStyles, _extends({
    ref: handleRef,
    className: clsx(className, classes.root),
    ownerState: ownerState
  }, ariaAttributes, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? GridRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export { GridRoot };