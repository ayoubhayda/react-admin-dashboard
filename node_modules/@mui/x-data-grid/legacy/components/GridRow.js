import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["selected", "hovered", "rowId", "row", "index", "style", "position", "rowHeight", "className", "visibleColumns", "renderedColumns", "containerWidth", "firstColumnToRender", "lastColumnToRender", "isLastVisible", "focusedCellColumnIndexNotInRange", "isNotVisible", "focusedCell", "tabbableCell", "onClick", "onDoubleClick", "onMouseEnter", "onMouseLeave", "onMouseOut", "onMouseOver"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses, unstable_useForkRef as useForkRef } from '@mui/utils';
import { fastMemo } from '../utils/fastMemo';
import { GridEditModes, GridRowModes, GridCellModes } from '../models/gridEditRowModel';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { getDataGridUtilityClass, gridClasses } from '../constants/gridClasses';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { gridColumnsTotalWidthSelector } from '../hooks/features/columns/gridColumnsSelector';
import { useGridSelector, objectShallowCompare } from '../hooks/utils/useGridSelector';
import { useGridVisibleRows } from '../hooks/utils/useGridVisibleRows';
import { findParentElementFromClassName, isEventTargetInPortal } from '../utils/domUtils';
import { GRID_CHECKBOX_SELECTION_COL_DEF } from '../colDef/gridCheckboxSelectionColDef';
import { GRID_ACTIONS_COLUMN_TYPE } from '../colDef/gridActionsColDef';
import { GRID_DETAIL_PANEL_TOGGLE_FIELD } from '../constants/gridDetailPanelToggleField';
import { gridSortModelSelector } from '../hooks/features/sorting/gridSortingSelector';
import { gridRowMaximumTreeDepthSelector } from '../hooks/features/rows/gridRowsSelector';
import { gridColumnGroupsHeaderMaxDepthSelector } from '../hooks/features/columnGrouping/gridColumnGroupsSelector';
import { randomNumberBetween } from '../utils/utils';
import { GridCellWrapper, GridCellV7 } from './cell/GridCell';
import { gridEditRowsStateSelector } from '../hooks/features/editing/gridEditingSelectors';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var editable = ownerState.editable,
    editing = ownerState.editing,
    selected = ownerState.selected,
    isLastVisible = ownerState.isLastVisible,
    rowHeight = ownerState.rowHeight,
    classes = ownerState.classes;
  var slots = {
    root: ['row', selected && 'selected', editable && 'row--editable', editing && 'row--editing', isLastVisible && 'row--lastVisible', rowHeight === 'auto' && 'row--dynamicHeight']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function EmptyCell(_ref) {
  var width = _ref.width;
  if (!width) {
    return null;
  }
  var style = {
    width: width
  };
  return /*#__PURE__*/_jsx("div", {
    className: "".concat(gridClasses.cell, " ").concat(gridClasses.withBorderColor),
    style: style
  }); // TODO change to .MuiDataGrid-emptyCell or .MuiDataGrid-rowFiller
}
var GridRow = /*#__PURE__*/React.forwardRef(function GridRow(props, refProp) {
  var selected = props.selected,
    hovered = props.hovered,
    rowId = props.rowId,
    row = props.row,
    index = props.index,
    styleProp = props.style,
    position = props.position,
    rowHeight = props.rowHeight,
    className = props.className,
    visibleColumns = props.visibleColumns,
    renderedColumns = props.renderedColumns,
    containerWidth = props.containerWidth,
    firstColumnToRender = props.firstColumnToRender,
    lastColumnToRender = props.lastColumnToRender,
    _props$isLastVisible = props.isLastVisible,
    isLastVisible = _props$isLastVisible === void 0 ? false : _props$isLastVisible,
    focusedCellColumnIndexNotInRange = props.focusedCellColumnIndexNotInRange,
    isNotVisible = props.isNotVisible,
    focusedCell = props.focusedCell,
    tabbableCell = props.tabbableCell,
    onClick = props.onClick,
    onDoubleClick = props.onDoubleClick,
    onMouseEnter = props.onMouseEnter,
    onMouseLeave = props.onMouseLeave,
    onMouseOut = props.onMouseOut,
    onMouseOver = props.onMouseOver,
    other = _objectWithoutProperties(props, _excluded);
  var apiRef = useGridApiContext();
  var ref = React.useRef(null);
  var rootProps = useGridRootProps();
  var currentPage = useGridVisibleRows(apiRef, rootProps);
  var columnsTotalWidth = useGridSelector(apiRef, gridColumnsTotalWidthSelector);
  var sortModel = useGridSelector(apiRef, gridSortModelSelector);
  var treeDepth = useGridSelector(apiRef, gridRowMaximumTreeDepthSelector);
  var headerGroupingMaxDepth = useGridSelector(apiRef, gridColumnGroupsHeaderMaxDepthSelector);
  var editRowsState = useGridSelector(apiRef, gridEditRowsStateSelector);
  var handleRef = useForkRef(ref, refProp);
  var ariaRowIndex = index + headerGroupingMaxDepth + 2; // 1 for the header row and 1 as it's 1-based

  var ownerState = {
    selected: selected,
    hovered: hovered,
    isLastVisible: isLastVisible,
    classes: rootProps.classes,
    editing: apiRef.current.getRowMode(rowId) === GridRowModes.Edit,
    editable: rootProps.editMode === GridEditModes.Row,
    rowHeight: rowHeight
  };
  var classes = useUtilityClasses(ownerState);
  React.useLayoutEffect(function () {
    if (rowHeight === 'auto' && ref.current && typeof ResizeObserver === 'undefined') {
      // Fallback for IE
      apiRef.current.unstable_storeRowHeightMeasurement(rowId, ref.current.clientHeight, position);
    }
  }, [apiRef, rowHeight, rowId, position]);
  React.useLayoutEffect(function () {
    if (currentPage.range) {
      // The index prop is relative to the rows from all pages. As example, the index prop of the
      // first row is 5 if `paginationModel.pageSize=5` and `paginationModel.page=1`. However, the index used by the virtualization
      // doesn't care about pagination and considers the rows from the current page only, so the
      // first row always has index=0. We need to subtract the index of the first row to make it
      // compatible with the index used by the virtualization.
      var rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(rowId);
      // pinned rows are not part of the visible rows
      if (rowIndex != null) {
        apiRef.current.unstable_setLastMeasuredRowIndex(rowIndex);
      }
    }
    var rootElement = ref.current;
    var hasFixedHeight = rowHeight !== 'auto';
    if (!rootElement || hasFixedHeight || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    var resizeObserver = new ResizeObserver(function (entries) {
      var _entries = _slicedToArray(entries, 1),
        entry = _entries[0];
      var height = entry.borderBoxSize && entry.borderBoxSize.length > 0 ? entry.borderBoxSize[0].blockSize : entry.contentRect.height;
      apiRef.current.unstable_storeRowHeightMeasurement(rowId, height, position);
    });
    resizeObserver.observe(rootElement);
    return function () {
      return resizeObserver.disconnect();
    };
  }, [apiRef, currentPage.range, index, rowHeight, rowId, position]);
  var publish = React.useCallback(function (eventName, propHandler) {
    return function (event) {
      // Ignore portal
      if (isEventTargetInPortal(event)) {
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
    };
  }, [apiRef, rowId]);
  var publishClick = React.useCallback(function (event) {
    var cell = findParentElementFromClassName(event.target, gridClasses.cell);
    var field = cell == null ? void 0 : cell.getAttribute('data-field');

    // Check if the field is available because the cell that fills the empty
    // space of the row has no field.
    if (field) {
      // User clicked in the checkbox added by checkboxSelection
      if (field === GRID_CHECKBOX_SELECTION_COL_DEF.field) {
        return;
      }

      // User opened a detail panel
      if (field === GRID_DETAIL_PANEL_TOGGLE_FIELD) {
        return;
      }

      // User reorders a row
      if (field === '__reorder__') {
        return;
      }

      // User is editing a cell
      if (apiRef.current.getCellMode(rowId, field) === GridCellModes.Edit) {
        return;
      }

      // User clicked a button from the "actions" column type
      var column = apiRef.current.getColumn(field);
      if ((column == null ? void 0 : column.type) === GRID_ACTIONS_COLUMN_TYPE) {
        return;
      }
    }
    publish('rowClick', onClick)(event);
  }, [apiRef, onClick, publish, rowId]);
  var slots = rootProps.slots,
    slotProps = rootProps.slotProps,
    disableColumnReorder = rootProps.disableColumnReorder;
  var CellComponent = slots.cell === GridCellV7 ? GridCellV7 : GridCellWrapper;
  var rowReordering = rootProps.rowReordering;
  var getCell = function getCell(column, cellProps) {
    var _editRowsState$rowId$, _editRowsState$rowId;
    var disableDragEvents = disableColumnReorder && column.disableReorder || !rowReordering && !!sortModel.length && treeDepth > 1 && Object.keys(editRowsState).length > 0;
    var editCellState = (_editRowsState$rowId$ = (_editRowsState$rowId = editRowsState[rowId]) == null ? void 0 : _editRowsState$rowId[column.field]) != null ? _editRowsState$rowId$ : null;
    var cellIsNotVisible = false;
    if (focusedCellColumnIndexNotInRange !== undefined && visibleColumns[focusedCellColumnIndexNotInRange].field === column.field) {
      cellIsNotVisible = true;
    }
    return /*#__PURE__*/_jsx(CellComponent, _extends({
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
    }, slotProps == null ? void 0 : slotProps.cell), column.field);
  };
  var sizes = useGridSelector(apiRef, function () {
    return _extends({}, apiRef.current.unstable_getRowInternalSizes(rowId));
  }, objectShallowCompare);
  var minHeight = rowHeight;
  if (minHeight === 'auto' && sizes) {
    var numberOfBaseSizes = 0;
    var maximumSize = Object.entries(sizes).reduce(function (acc, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        size = _ref3[1];
      var isBaseHeight = /^base[A-Z]/.test(key);
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
  var style = React.useMemo(function () {
    if (isNotVisible) {
      return {
        opacity: 0,
        width: 0,
        height: 0
      };
    }
    var rowStyle = _extends({}, styleProp, {
      maxHeight: rowHeight === 'auto' ? 'none' : rowHeight,
      // max-height doesn't support "auto"
      minHeight: minHeight
    });
    if (sizes != null && sizes.spacingTop) {
      var property = rootProps.rowSpacingType === 'border' ? 'borderTopWidth' : 'marginTop';
      rowStyle[property] = sizes.spacingTop;
    }
    if (sizes != null && sizes.spacingBottom) {
      var _property = rootProps.rowSpacingType === 'border' ? 'borderBottomWidth' : 'marginBottom';
      var propertyValue = rowStyle[_property];
      // avoid overriding existing value
      if (typeof propertyValue !== 'number') {
        propertyValue = parseInt(propertyValue || '0', 10);
      }
      propertyValue += sizes.spacingBottom;
      rowStyle[_property] = propertyValue;
    }
    return rowStyle;
  }, [isNotVisible, rowHeight, styleProp, minHeight, sizes, rootProps.rowSpacingType]);
  var rowClassNames = apiRef.current.unstable_applyPipeProcessors('rowClassName', [], rowId);
  if (typeof rootProps.getRowClassName === 'function') {
    var _currentPage$range;
    var indexRelativeToCurrentPage = index - (((_currentPage$range = currentPage.range) == null ? void 0 : _currentPage$range.firstRowIndex) || 0);
    var rowParams = _extends({}, apiRef.current.getRowParams(rowId), {
      isFirstVisible: indexRelativeToCurrentPage === 0,
      isLastVisible: indexRelativeToCurrentPage === currentPage.rows.length - 1,
      indexRelativeToCurrentPage: indexRelativeToCurrentPage
    });
    rowClassNames.push(rootProps.getRowClassName(rowParams));
  }
  var randomNumber = randomNumberBetween(10000, 20, 80);
  var rowNode = apiRef.current.getRowNode(rowId);
  if (!rowNode) {
    return null;
  }
  var rowType = rowNode.type;
  var cells = [];
  for (var i = 0; i < renderedColumns.length; i += 1) {
    var column = renderedColumns[i];
    var indexRelativeToAllColumns = firstColumnToRender + i;
    if (focusedCellColumnIndexNotInRange !== undefined && focusedCell) {
      if (visibleColumns[focusedCellColumnIndexNotInRange].field === column.field) {
        indexRelativeToAllColumns = focusedCellColumnIndexNotInRange;
      } else {
        indexRelativeToAllColumns -= 1;
      }
    }
    var cellColSpanInfo = apiRef.current.unstable_getCellColSpanInfo(rowId, indexRelativeToAllColumns);
    if (cellColSpanInfo && !cellColSpanInfo.spannedByColSpan) {
      if (rowType !== 'skeletonRow') {
        var _cellColSpanInfo$cell = cellColSpanInfo.cellProps,
          colSpan = _cellColSpanInfo$cell.colSpan,
          width = _cellColSpanInfo$cell.width;
        var cellProps = {
          width: width,
          colSpan: colSpan,
          showRightBorder: rootProps.showCellVerticalBorder,
          indexRelativeToAllColumns: indexRelativeToAllColumns
        };
        cells.push(getCell(column, cellProps));
      } else {
        var _width = cellColSpanInfo.cellProps.width;
        var contentWidth = Math.round(randomNumber());
        cells.push( /*#__PURE__*/_jsx(slots.skeletonCell, {
          width: _width,
          contentWidth: contentWidth,
          field: column.field,
          align: column.align
        }, column.field));
      }
    }
  }
  var emptyCellWidth = containerWidth - columnsTotalWidth;
  var eventHandlers = row ? {
    onClick: publishClick,
    onDoubleClick: publish('rowDoubleClick', onDoubleClick),
    onMouseEnter: publish('rowMouseEnter', onMouseEnter),
    onMouseLeave: publish('rowMouseLeave', onMouseLeave),
    onMouseOut: publish('rowMouseOut', onMouseOut),
    onMouseOver: publish('rowMouseOver', onMouseOver)
  } : null;
  return /*#__PURE__*/_jsxs("div", _extends({
    ref: handleRef,
    "data-id": rowId,
    "data-rowindex": index,
    role: "row",
    className: clsx.apply(void 0, _toConsumableArray(rowClassNames).concat([classes.root, className, hovered && 'Mui-hovered'])),
    "aria-rowindex": ariaRowIndex,
    "aria-selected": selected,
    style: style
  }, eventHandlers, other, {
    children: [cells, emptyCellWidth > 0 && /*#__PURE__*/_jsx(EmptyCell, {
      width: emptyCellWidth
    })]
  }));
});
process.env.NODE_ENV !== "production" ? GridRow.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  containerWidth: PropTypes.number.isRequired,
  firstColumnToRender: PropTypes.number.isRequired,
  /**
   * Determines which cell has focus.
   * If `null`, no cell in this row has focus.
   */
  focusedCell: PropTypes.string,
  focusedCellColumnIndexNotInRange: PropTypes.number,
  /**
   * Index of the row in the whole sorted and filtered dataset.
   * If some rows above have expanded children, this index also take those children into account.
   */
  index: PropTypes.number.isRequired,
  isLastVisible: PropTypes.bool,
  isNotVisible: PropTypes.bool,
  lastColumnToRender: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  position: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
  renderedColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  row: PropTypes.object,
  rowHeight: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  selected: PropTypes.bool.isRequired,
  /**
   * Determines which cell should be tabbable by having tabIndex=0.
   * If `null`, no cell in this row is in the tab sequence.
   */
  tabbableCell: PropTypes.string,
  visibleColumns: PropTypes.arrayOf(PropTypes.object).isRequired
} : void 0;
var MemoizedGridRow = fastMemo(GridRow);
export { MemoizedGridRow as GridRow };