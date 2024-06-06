import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { unstable_composeClasses as composeClasses, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import clsx from 'clsx';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridExpandedRowCountSelector } from '../../hooks/features/filter/gridFilterSelector';
import { gridRowCountSelector, gridRowsLoadingSelector } from '../../hooks/features/rows/gridRowsSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getMinimalContentHeight } from '../../hooks/features/rows/gridRowsUtils';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const GridOverlayWrapperRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'OverlayWrapper',
  shouldForwardProp: prop => prop !== 'overlayType',
  overridesResolver: (props, styles) => styles.overlayWrapper
})(({
  overlayType
}) => ({
  position: 'sticky',
  // To stay in place while scrolling
  top: 0,
  left: 0,
  width: 0,
  // To stay above the content instead of shifting it down
  height: 0,
  // To stay above the content instead of shifting it down
  zIndex: overlayType === 'loadingOverlay' ? 5 // Should be above pinned columns, pinned rows, and detail panel
  : 4 // Should be above pinned columns and detail panel
}));
const GridOverlayWrapperInner = styled('div', {
  name: 'MuiDataGrid',
  slot: 'OverlayWrapperInner',
  shouldForwardProp: prop => prop !== 'overlayType',
  overridesResolver: (props, styles) => styles.overlayWrapperInner
})({});
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['overlayWrapper'],
    inner: ['overlayWrapperInner']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridOverlayWrapper(props) {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const [viewportInnerSize, setViewportInnerSize] = React.useState(() => apiRef.current.getRootDimensions()?.viewportInnerSize ?? null);
  const handleViewportSizeChange = React.useCallback(() => {
    setViewportInnerSize(apiRef.current.getRootDimensions()?.viewportInnerSize ?? null);
  }, [apiRef]);
  useEnhancedEffect(() => {
    return apiRef.current.subscribeEvent('viewportInnerSizeChange', handleViewportSizeChange);
  }, [apiRef, handleViewportSizeChange]);
  let height = viewportInnerSize?.height ?? 0;
  if (rootProps.autoHeight && height === 0) {
    height = getMinimalContentHeight(apiRef, rootProps.rowHeight); // Give room to show the overlay when there no rows.
  }
  const classes = useUtilityClasses(_extends({}, props, {
    classes: rootProps.classes
  }));
  if (!viewportInnerSize) {
    return null;
  }
  return /*#__PURE__*/_jsx(GridOverlayWrapperRoot, {
    className: clsx(classes.root),
    overlayType: props.overlayType,
    children: /*#__PURE__*/_jsx(GridOverlayWrapperInner, _extends({
      className: clsx(classes.inner),
      style: {
        height,
        width: viewportInnerSize?.width ?? 0
      }
    }, props))
  });
}
process.env.NODE_ENV !== "production" ? GridOverlayWrapper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  overlayType: PropTypes.string.isRequired
} : void 0;
export function GridOverlays() {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const totalRowCount = useGridSelector(apiRef, gridRowCountSelector);
  const visibleRowCount = useGridSelector(apiRef, gridExpandedRowCountSelector);
  const loading = useGridSelector(apiRef, gridRowsLoadingSelector);
  const showNoRowsOverlay = !loading && totalRowCount === 0;
  const showNoResultsOverlay = !loading && totalRowCount > 0 && visibleRowCount === 0;
  let overlay = null;
  let overlayType = '';
  if (showNoRowsOverlay) {
    overlay = /*#__PURE__*/_jsx(rootProps.slots.noRowsOverlay, _extends({}, rootProps.slotProps?.noRowsOverlay));
    overlayType = 'noRowsOverlay';
  }
  if (showNoResultsOverlay) {
    overlay = /*#__PURE__*/_jsx(rootProps.slots.noResultsOverlay, _extends({}, rootProps.slotProps?.noResultsOverlay));
    overlayType = 'noResultsOverlay';
  }
  if (loading) {
    overlay = /*#__PURE__*/_jsx(rootProps.slots.loadingOverlay, _extends({}, rootProps.slotProps?.loadingOverlay));
    overlayType = 'loadingOverlay';
  }
  if (overlay === null) {
    return null;
  }
  return /*#__PURE__*/_jsx(GridOverlayWrapper, {
    overlayType: overlayType,
    children: overlay
  });
}