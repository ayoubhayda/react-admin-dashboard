"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridBody = GridBody;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _useGridPrivateApiContext = require("../../hooks/utils/useGridPrivateApiContext");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _GridMainContainer = require("../containers/GridMainContainer");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridColumnsSelector = require("../../hooks/features/columns/gridColumnsSelector");
var _gridFilterSelector = require("../../hooks/features/filter/gridFilterSelector");
var _gridSortingSelector = require("../../hooks/features/sorting/gridSortingSelector");
var _gridFocusStateSelector = require("../../hooks/features/focus/gridFocusStateSelector");
var _densitySelector = require("../../hooks/features/density/densitySelector");
var _gridColumnGroupsSelector = require("../../hooks/features/columnGrouping/gridColumnGroupsSelector");
var _columnMenuSelector = require("../../hooks/features/columnMenu/columnMenuSelector");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function GridBody(props) {
  const {
    VirtualScrollerComponent,
    ColumnHeadersProps,
    children
  } = props;
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const rootRef = React.useRef(null);
  const visibleColumns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector);
  const filterColumnLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridFilterActiveItemsLookupSelector);
  const sortColumnLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridSortingSelector.gridSortColumnLookupSelector);
  const columnPositions = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnPositionsSelector);
  const columnHeaderTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexColumnHeaderSelector);
  const cellTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexCellSelector);
  const columnGroupHeaderTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.unstable_gridTabIndexColumnGroupHeaderSelector);
  const columnHeaderFocus = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridFocusColumnHeaderSelector);
  const columnGroupHeaderFocus = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.unstable_gridFocusColumnGroupHeaderSelector);
  const densityFactor = (0, _useGridSelector.useGridSelector)(apiRef, _densitySelector.gridDensityFactorSelector);
  const headerGroupingMaxDepth = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsHeaderMaxDepthSelector);
  const columnMenuState = (0, _useGridSelector.useGridSelector)(apiRef, _columnMenuSelector.gridColumnMenuSelector);
  const columnVisibility = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnVisibilityModelSelector);
  const columnGroupsHeaderStructure = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsHeaderStructureSelector);
  const hasOtherElementInTabSequence = !(columnGroupHeaderTabIndexState === null && columnHeaderTabIndexState === null && cellTabIndexState === null);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    apiRef.current.computeSizeAndPublishResizeEvent();
    const elementToObserve = rootRef.current;
    if (typeof ResizeObserver === 'undefined') {
      return () => {};
    }
    let animationFrame;
    const observer = new ResizeObserver(() => {
      // See https://github.com/mui/mui-x/issues/8733
      animationFrame = requestAnimationFrame(() => {
        apiRef.current.computeSizeAndPublishResizeEvent();
      });
    });
    if (elementToObserve) {
      observer.observe(elementToObserve);
    }
    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, [apiRef]);
  const columnHeadersRef = React.useRef(null);
  const columnsContainerRef = React.useRef(null);
  const virtualScrollerRef = React.useRef(null);
  apiRef.current.register('private', {
    columnHeadersContainerElementRef: columnsContainerRef,
    columnHeadersElementRef: columnHeadersRef,
    virtualScrollerRef,
    mainElementRef: rootRef
  });
  const hasDimensions = !!apiRef.current.getRootDimensions();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridMainContainer.GridMainContainer, {
    ref: rootRef,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnHeaders, (0, _extends2.default)({
      ref: columnsContainerRef,
      innerRef: columnHeadersRef,
      visibleColumns: visibleColumns,
      filterColumnLookup: filterColumnLookup,
      sortColumnLookup: sortColumnLookup,
      columnPositions: columnPositions,
      columnHeaderTabIndexState: columnHeaderTabIndexState,
      columnGroupHeaderTabIndexState: columnGroupHeaderTabIndexState,
      columnHeaderFocus: columnHeaderFocus,
      columnGroupHeaderFocus: columnGroupHeaderFocus,
      densityFactor: densityFactor,
      headerGroupingMaxDepth: headerGroupingMaxDepth,
      columnMenuState: columnMenuState,
      columnVisibility: columnVisibility,
      columnGroupsHeaderStructure: columnGroupsHeaderStructure,
      hasOtherElementInTabSequence: hasOtherElementInTabSequence
    }, ColumnHeadersProps)), hasDimensions && /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerComponent
    // The content is only rendered after dimensions are computed because
    // the lazy-loading hook is listening to `renderedRowsIntervalChange`,
    // but only does something if the dimensions are also available.
    // If this event is published while dimensions haven't been computed,
    // the `onFetchRows` prop won't be called during mount.
    , {
      ref: virtualScrollerRef
    }), children]
  });
}
process.env.NODE_ENV !== "production" ? GridBody.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: _propTypes.default.node,
  ColumnHeadersProps: _propTypes.default.object,
  VirtualScrollerComponent: _propTypes.default.elementType.isRequired
} : void 0;