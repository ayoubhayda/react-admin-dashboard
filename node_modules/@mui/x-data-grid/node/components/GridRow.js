"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _utils = require("@mui/utils");
var _fastMemo = require("../utils/fastMemo");
var _gridEditRowModel = require("../models/gridEditRowModel");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _gridClasses = require("../constants/gridClasses");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _gridColumnsSelector = require("../hooks/features/columns/gridColumnsSelector");
var _useGridSelector = require("../hooks/utils/useGridSelector");
var _useGridVisibleRows = require("../hooks/utils/useGridVisibleRows");
var _domUtils = require("../utils/domUtils");
var _gridCheckboxSelectionColDef = require("../colDef/gridCheckboxSelectionColDef");
var _gridActionsColDef = require("../colDef/gridActionsColDef");
var _gridDetailPanelToggleField = require("../constants/gridDetailPanelToggleField");
var _gridSortingSelector = require("../hooks/features/sorting/gridSortingSelector");
var _gridRowsSelector = require("../hooks/features/rows/gridRowsSelector");
var _gridColumnGroupsSelector = require("../hooks/features/columnGrouping/gridColumnGroupsSelector");
var _utils2 = require("../utils/utils");
var _GridCell = require("./cell/GridCell");
var _gridEditingSelectors = require("../hooks/features/editing/gridEditingSelectors");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["selected", "hovered", "rowId", "row", "index", "style", "position", "rowHeight", "className", "visibleColumns", "renderedColumns", "containerWidth", "firstColumnToRender", "lastColumnToRender", "isLastVisible", "focusedCellColumnIndexNotInRange", "isNotVisible", "focusedCell", "tabbableCell", "onClick", "onDoubleClick", "onMouseEnter", "onMouseLeave", "onMouseOut", "onMouseOver"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    editable,
    editing,
    selected,
    isLastVisible,
    rowHeight,
    classes
  } = ownerState;
  const slots = {
    root: ['row', selected && 'selected', editable && 'row--editable', editing && 'row--editing', isLastVisible && 'row--lastVisible', rowHeight === 'auto' && 'row--dynamicHeight']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
function EmptyCell({
  width
}) {
  if (!width) {
    return null;
  }
  const style = {
    width
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `${_gridClasses.gridClasses.cell} ${_gridClasses.gridClasses.withBorderColor}`,
    style: style
  }); // TODO change to .MuiDataGrid-emptyCell or .MuiDataGrid-rowFiller
}
const GridRow = /*#__PURE__*/React.forwardRef(function GridRow(props, refProp) {
  const {
      selected,
      hovered,
      rowId,
      row,
      index,
      style: styleProp,
      position,
      rowHeight,
      className,
      visibleColumns,
      renderedColumns,
      containerWidth,
      firstColumnToRender,
      isLastVisible = false,
      focusedCellColumnIndexNotInRange,
      isNotVisible,
      focusedCell,
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      onMouseOut,
      onMouseOver
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const ref = React.useRef(null);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const currentPage = (0, _useGridVisibleRows.useGridVisibleRows)(apiRef, rootProps);
  const columnsTotalWidth = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnsTotalWidthSelector);
  const sortModel = (0, _useGridSelector.useGridSelector)(apiRef, _gridSortingSelector.gridSortModelSelector);
  const treeDepth = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsSelector.gridRowMaximumTreeDepthSelector);
  const headerGroupingMaxDepth = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsHeaderMaxDepthSelector);
  const editRowsState = (0, _useGridSelector.useGridSelector)(apiRef, _gridEditingSelectors.gridEditRowsStateSelector);
  const handleRef = (0, _utils.unstable_useForkRef)(ref, refProp);
  const ariaRowIndex = index + headerGroupingMaxDepth + 2; // 1 for the header row and 1 as it's 1-based

  const ownerState = {
    selected,
    hovered,
    isLastVisible,
    classes: rootProps.classes,
    editing: apiRef.current.getRowMode(rowId) === _gridEditRowModel.GridRowModes.Edit,
    editable: rootProps.editMode === _gridEditRowModel.GridEditModes.Row,
    rowHeight
  };
  const classes = useUtilityClasses(ownerState);
  React.useLayoutEffect(() => {
    if (rowHeight === 'auto' && ref.current && typeof ResizeObserver === 'undefined') {
      // Fallback for IE
      apiRef.current.unstable_storeRowHeightMeasurement(rowId, ref.current.clientHeight, position);
    }
  }, [apiRef, rowHeight, rowId, position]);
  React.useLayoutEffect(() => {
    if (currentPage.range) {
      // The index prop is relative to the rows from all pages. As example, the index prop of the
      // first row is 5 if `paginationModel.pageSize=5` and `paginationModel.page=1`. However, the index used by the virtualization
      // doesn't care about pagination and considers the rows from the current page only, so the
      // first row always has index=0. We need to subtract the index of the first row to make it
      // compatible with the index used by the virtualization.
      const rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(rowId);
      // pinned rows are not part of the visible rows
      if (rowIndex != null) {
        apiRef.current.unstable_setLastMeasuredRowIndex(rowIndex);
      }
    }
    const rootElement = ref.current;
    const hasFixedHeight = rowHeight !== 'auto';
    if (!rootElement || hasFixedHeight || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const resizeObserver = new ResizeObserver(entries => {
      const [entry] = entries;
      const height = entry.borderBoxSize && entry.borderBoxSize.length > 0 ? entry.borderBoxSize[0].blockSize : entry.contentRect.height;
      apiRef.current.unstable_storeRowHeightMeasurement(rowId, height, position);
    });
    resizeObserver.observe(rootElement);
    return () => resizeObserver.disconnect();
  }, [apiRef, currentPage.range, index, rowHeight, rowId, position]);
  const publish = React.useCallback((eventName, propHandler) => event => {
    // Ignore portal
    if ((0, _domUtils.isEventTargetInPortal)(event)) {
      return;
    }

    // The row might have been deleted
    if (!apiRef.current.getRow(rowId)) {
      return;
    }
    apiRef.current.publishEvent(eventName, apiRef.current.getRowParams(rowId), event);
    if (propHandler) {
      propHandler(event);
    }
  }, [apiRef, rowId]);
  const publishClick = React.useCallback(event => {
    const cell = (0, _domUtils.findParentElementFromClassName)(event.target, _gridClasses.gridClasses.cell);
    const field = cell?.getAttribute('data-field');

    // Check if the field is available because the cell that fills the empty
    // space of the row has no field.
    if (field) {
      // User clicked in the checkbox added by checkboxSelection
      if (field === _gridCheckboxSelectionColDef.GRID_CHECKBOX_SELECTION_COL_DEF.field) {
        return;
      }

      // User opened a detail panel
      if (field === _gridDetailPanelToggleField.GRID_DETAIL_PANEL_TOGGLE_FIELD) {
        return;
      }

      // User reorders a row
      if (field === '__reorder__') {
        return;
      }

      // User is editing a cell
      if (apiRef.current.getCellMode(rowId, field) === _gridEditRowModel.GridCellModes.Edit) {
        return;
      }

      // User clicked a button from the "actions" column type
      const column = apiRef.current.getColumn(field);
      if (column?.type === _gridActionsColDef.GRID_ACTIONS_COLUMN_TYPE) {
        return;
      }
    }
    publish('rowClick', onClick)(event);
  }, [apiRef, onClick, publish, rowId]);
  const {
    slots,
    slotProps,
    disableColumnReorder
  } = rootProps;
  const CellComponent = slots.cell === _GridCell.GridCellV7 ? _GridCell.GridCellV7 : _GridCell.GridCellWrapper;
  const rowReordering = rootProps.rowReordering;
  const getCell = (column, cellProps) => {
    const disableDragEvents = disableColumnReorder && column.disableReorder || !rowReordering && !!sortModel.length && treeDepth > 1 && Object.keys(editRowsState).length > 0;
    const editCellState = editRowsState[rowId]?.[column.field] ?? null;
    let cellIsNotVisible = false;
    if (focusedCellColumnIndexNotInRange !== undefined && visibleColumns[focusedCellColumnIndexNotInRange].field === column.field) {
      cellIsNotVisible = true;
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(CellComponent, (0, _extends2.default)({
      column: column,
      width: cellProps.width,
      rowId: rowId,
      height: rowHeight,
      showRightBorder: cellProps.showRightBorder,
      align: column.align || 'left',
      colIndex: cellProps.indexRelativeToAllColumns,
      colSpan: cellProps.colSpan,
      disableDragEvents: disableDragEvents,
      editCellState: editCellState,
      isNotVisible: cellIsNotVisible
    }, slotProps?.cell), column.field);
  };
  const sizes = (0, _useGridSelector.useGridSelector)(apiRef, () => (0, _extends2.default)({}, apiRef.current.unstable_getRowInternalSizes(rowId)), _useGridSelector.objectShallowCompare);
  let minHeight = rowHeight;
  if (minHeight === 'auto' && sizes) {
    let numberOfBaseSizes = 0;
    const maximumSize = Object.entries(sizes).reduce((acc, [key, size]) => {
      const isBaseHeight = /^base[A-Z]/.test(key);
      if (!isBaseHeight) {
        return acc;
      }
      numberOfBaseSizes += 1;
      if (size > acc) {
        return size;
      }
      return acc;
    }, 0);
    if (maximumSize > 0 && numberOfBaseSizes > 1) {
      minHeight = maximumSize;
    }
  }
  const style = React.useMemo(() => {
    if (isNotVisible) {
      return {
        opacity: 0,
        width: 0,
        height: 0
      };
    }
    const rowStyle = (0, _extends2.default)({}, styleProp, {
      maxHeight: rowHeight === 'auto' ? 'none' : rowHeight,
      // max-height doesn't support "auto"
      minHeight
    });
    if (sizes?.spacingTop) {
      const property = rootProps.rowSpacingType === 'border' ? 'borderTopWidth' : 'marginTop';
      rowStyle[property] = sizes.spacingTop;
    }
    if (sizes?.spacingBottom) {
      const property = rootProps.rowSpacingType === 'border' ? 'borderBottomWidth' : 'marginBottom';
      let propertyValue = rowStyle[property];
      // avoid overriding existing value
      if (typeof propertyValue !== 'number') {
        propertyValue = parseInt(propertyValue || '0', 10);
      }
      propertyValue += sizes.spacingBottom;
      rowStyle[property] = propertyValue;
    }
    return rowStyle;
  }, [isNotVisible, rowHeight, styleProp, minHeight, sizes, rootProps.rowSpacingType]);
  const rowClassNames = apiRef.current.unstable_applyPipeProcessors('rowClassName', [], rowId);
  if (typeof rootProps.getRowClassName === 'function') {
    const indexRelativeToCurrentPage = index - (currentPage.range?.firstRowIndex || 0);
    const rowParams = (0, _extends2.default)({}, apiRef.current.getRowParams(rowId), {
      isFirstVisible: indexRelativeToCurrentPage === 0,
      isLastVisible: indexRelativeToCurrentPage === currentPage.rows.length - 1,
      indexRelativeToCurrentPage
    });
    rowClassNames.push(rootProps.getRowClassName(rowParams));
  }
  const randomNumber = (0, _utils2.randomNumberBetween)(10000, 20, 80);
  const rowNode = apiRef.current.getRowNode(rowId);
  if (!rowNode) {
    return null;
  }
  const rowType = rowNode.type;
  const cells = [];
  for (let i = 0; i < renderedColumns.length; i += 1) {
    const column = renderedColumns[i];
    let indexRelativeToAllColumns = firstColumnToRender + i;
    if (focusedCellColumnIndexNotInRange !== undefined && focusedCell) {
      if (visibleColumns[focusedCellColumnIndexNotInRange].field === column.field) {
        indexRelativeToAllColumns = focusedCellColumnIndexNotInRange;
      } else {
        indexRelativeToAllColumns -= 1;
      }
    }
    const cellColSpanInfo = apiRef.current.unstable_getCellColSpanInfo(rowId, indexRelativeToAllColumns);
    if (cellColSpanInfo && !cellColSpanInfo.spannedByColSpan) {
      if (rowType !== 'skeletonRow') {
        const {
          colSpan,
          width
        } = cellColSpanInfo.cellProps;
        const cellProps = {
          width,
          colSpan,
          showRightBorder: rootProps.showCellVerticalBorder,
          indexRelativeToAllColumns
        };
        cells.push(getCell(column, cellProps));
      } else {
        const {
          width
        } = cellColSpanInfo.cellProps;
        const contentWidth = Math.round(randomNumber());
        cells.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(slots.skeletonCell, {
          width: width,
          contentWidth: contentWidth,
          field: column.field,
          align: column.align
        }, column.field));
      }
    }
  }
  const emptyCellWidth = containerWidth - columnsTotalWidth;
  const eventHandlers = row ? {
    onClick: publishClick,
    onDoubleClick: publish('rowDoubleClick', onDoubleClick),
    onMouseEnter: publish('rowMouseEnter', onMouseEnter),
    onMouseLeave: publish('rowMouseLeave', onMouseLeave),
    onMouseOut: publish('rowMouseOut', onMouseOut),
    onMouseOver: publish('rowMouseOver', onMouseOver)
  } : null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2.default)({
    ref: handleRef,
    "data-id": rowId,
    "data-rowindex": index,
    role: "row",
    className: (0, _clsx.default)(...rowClassNames, classes.root, className, hovered && 'Mui-hovered'),
    "aria-rowindex": ariaRowIndex,
    "aria-selected": selected,
    style: style
  }, eventHandlers, other, {
    children: [cells, emptyCellWidth > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(EmptyCell, {
      width: emptyCellWidth
    })]
  }));
});
process.env.NODE_ENV !== "production" ? GridRow.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  containerWidth: _propTypes.default.number.isRequired,
  firstColumnToRender: _propTypes.default.number.isRequired,
  /**
   * Determines which cell has focus.
   * If `null`, no cell in this row has focus.
   */
  focusedCell: _propTypes.default.string,
  focusedCellColumnIndexNotInRange: _propTypes.default.number,
  /**
   * Index of the row in the whole sorted and filtered dataset.
   * If some rows above have expanded children, this index also take those children into account.
   */
  index: _propTypes.default.number.isRequired,
  isLastVisible: _propTypes.default.bool,
  isNotVisible: _propTypes.default.bool,
  lastColumnToRender: _propTypes.default.number.isRequired,
  onClick: _propTypes.default.func,
  onDoubleClick: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  position: _propTypes.default.oneOf(['center', 'left', 'right']).isRequired,
  renderedColumns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  row: _propTypes.default.object,
  rowHeight: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number]).isRequired,
  rowId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  selected: _propTypes.default.bool.isRequired,
  /**
   * Determines which cell should be tabbable by having tabIndex=0.
   * If `null`, no cell in this row is in the tab sequence.
   */
  tabbableCell: _propTypes.default.string,
  visibleColumns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired
} : void 0;
const MemoizedGridRow = exports.GridRow = (0, _fastMemo.fastMemo)(GridRow);