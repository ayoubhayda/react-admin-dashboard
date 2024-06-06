import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["changeReason", "unstable_updateValueOnRender"],
  _excluded2 = ["align", "children", "editCellState", "colIndex", "column", "cellMode", "field", "formattedValue", "hasFocus", "height", "isEditable", "isSelected", "rowId", "tabIndex", "style", "value", "width", "className", "showRightBorder", "extendRowFullWidth", "row", "colSpan", "disableDragEvents", "isNotVisible", "onClick", "onDoubleClick", "onMouseDown", "onMouseUp", "onMouseOver", "onKeyDown", "onKeyUp", "onDragEnter", "onDragOver"],
  _excluded3 = ["column", "rowId", "editCellState", "align", "children", "colIndex", "height", "width", "className", "showRightBorder", "extendRowFullWidth", "row", "colSpan", "disableDragEvents", "isNotVisible", "onClick", "onDoubleClick", "onMouseDown", "onMouseUp", "onMouseOver", "onKeyDown", "onKeyUp", "onDragEnter", "onDragOver", "style"],
  _excluded4 = ["changeReason", "unstable_updateValueOnRender"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef, unstable_composeClasses as composeClasses, unstable_ownerDocument as ownerDocument, unstable_capitalize as capitalize } from '@mui/utils';
import { fastMemo } from '../../utils/fastMemo';
import { doesSupportPreventScroll } from '../../utils/doesSupportPreventScroll';
import { getDataGridUtilityClass, gridClasses } from '../../constants/gridClasses';
import { GridCellModes } from '../../models';
import { useGridSelector, objectShallowCompare } from '../../hooks/utils/useGridSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridFocusCellSelector } from '../../hooks/features/focus/gridFocusStateSelector';
import { MissingRowIdError } from '../../hooks/features/rows/useGridParamsApi';
import { jsx as _jsx } from "react/jsx-runtime";
var EMPTY_CELL_PARAMS = {
  id: -1,
  field: '__unset__',
  row: {},
  rowNode: {
    id: -1,
    depth: 0,
    type: 'leaf',
    parent: -1,
    groupingKey: null
  },
  colDef: {
    type: 'string',
    field: '__unset__',
    computedWidth: 0
  },
  cellMode: GridCellModes.View,
  hasFocus: false,
  tabIndex: -1,
  value: null,
  formattedValue: '__unset__',
  isEditable: false,
  api: {}
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var align = ownerState.align,
    showRightBorder = ownerState.showRightBorder,
    isEditable = ownerState.isEditable,
    isSelected = ownerState.isSelected,
    isSelectionMode = ownerState.isSelectionMode,
    classes = ownerState.classes;
  var slots = {
    root: ['cell', "cell--text".concat(capitalize(align)), isEditable && 'cell--editable', isSelected && 'selected', showRightBorder && 'cell--withRightBorder', isSelectionMode && !isEditable && 'cell--selectionMode', 'withBorderColor'],
    content: ['cellContent']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
var warnedOnce = false;

// GridCellWrapper is a compatibility layer for the V6 cell slot. If we can use the more efficient
// `GridCellV7`, we should. That component is a merge of `GridCellWrapper` and `GridCell`.
// TODO(v7): Remove the wrapper & cellV6 and use the cellV7 exclusively.
// TODO(v7): Removing the wrapper will break the docs performance visualization demo.
var GridCellWrapper = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var column = props.column,
    rowId = props.rowId,
    editCellState = props.editCellState;
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var field = column.field;
  var cellParamsWithAPI = useGridSelector(apiRef, function () {
    // This is required because `.getCellParams` tries to get the `state.rows.tree` entry
    // associated with `rowId`/`fieldId`, but this selector runs after the state has been
    // updated, while `rowId`/`fieldId` reference an entry in the old state.
    try {
      var cellParams = apiRef.current.getCellParams(rowId, field);
      var result = cellParams;
      result.api = apiRef.current;
      return result;
    } catch (e) {
      if (e instanceof MissingRowIdError) {
        return EMPTY_CELL_PARAMS;
      }
      throw e;
    }
  }, objectShallowCompare);
  var isSelected = useGridSelector(apiRef, function () {
    return apiRef.current.unstable_applyPipeProcessors('isCellSelected', false, {
      id: rowId,
      field: field
    });
  });
  if (cellParamsWithAPI === EMPTY_CELL_PARAMS) {
    return null;
  }
  var cellMode = cellParamsWithAPI.cellMode,
    hasFocus = cellParamsWithAPI.hasFocus,
    isEditable = cellParamsWithAPI.isEditable,
    value = cellParamsWithAPI.value,
    formattedValue = cellParamsWithAPI.formattedValue;
  var managesOwnFocus = column.type === 'actions';
  var tabIndex = (cellMode === 'view' || !isEditable) && !managesOwnFocus ? cellParamsWithAPI.tabIndex : -1;
  var rootClasses = rootProps.classes,
    getCellClassName = rootProps.getCellClassName;
  var classNames = apiRef.current.unstable_applyPipeProcessors('cellClassName', [], {
    id: rowId,
    field: field
  });
  if (column.cellClassName) {
    classNames.push(typeof column.cellClassName === 'function' ? column.cellClassName(cellParamsWithAPI) : column.cellClassName);
  }
  if (getCellClassName) {
    classNames.push(getCellClassName(cellParamsWithAPI));
  }
  var children;
  if (editCellState == null && column.renderCell) {
    children = column.renderCell(cellParamsWithAPI);
    classNames.push(gridClasses['cell--withRenderer']);
    classNames.push(rootClasses == null ? void 0 : rootClasses['cell--withRenderer']);
  }
  if (editCellState != null && column.renderEditCell) {
    var updatedRow = apiRef.current.getRowWithUpdatedValues(rowId, column.field);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    var changeReason = editCellState.changeReason,
      unstable_updateValueOnRender = editCellState.unstable_updateValueOnRender,
      editCellStateRest = _objectWithoutProperties(editCellState, _excluded);
    var params = _extends({}, cellParamsWithAPI, {
      row: updatedRow
    }, editCellStateRest);
    children = column.renderEditCell(params);
    classNames.push(gridClasses['cell--editing']);
    classNames.push(rootClasses == null ? void 0 : rootClasses['cell--editing']);
  }
  var slots = rootProps.slots;
  var CellComponent = slots.cell;
  var cellProps = _extends({}, props, {
    ref: ref,
    field: field,
    formattedValue: formattedValue,
    hasFocus: hasFocus,
    isEditable: isEditable,
    isSelected: isSelected,
    value: value,
    cellMode: cellMode,
    children: children,
    tabIndex: tabIndex,
    className: clsx(classNames)
  });
  return /*#__PURE__*/React.createElement(CellComponent, cellProps);
});
var GridCell = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _rootProps$experiment, _rootProps$experiment2;
  var align = props.align,
    childrenProp = props.children,
    editCellState = props.editCellState,
    colIndex = props.colIndex,
    column = props.column,
    cellMode = props.cellMode,
    field = props.field,
    formattedValue = props.formattedValue,
    hasFocus = props.hasFocus,
    height = props.height,
    isEditable = props.isEditable,
    isSelected = props.isSelected,
    rowId = props.rowId,
    tabIndex = props.tabIndex,
    styleProp = props.style,
    value = props.value,
    width = props.width,
    className = props.className,
    showRightBorder = props.showRightBorder,
    extendRowFullWidth = props.extendRowFullWidth,
    row = props.row,
    colSpan = props.colSpan,
    disableDragEvents = props.disableDragEvents,
    isNotVisible = props.isNotVisible,
    onClick = props.onClick,
    onDoubleClick = props.onDoubleClick,
    onMouseDown = props.onMouseDown,
    onMouseUp = props.onMouseUp,
    onMouseOver = props.onMouseOver,
    onKeyDown = props.onKeyDown,
    onKeyUp = props.onKeyUp,
    onDragEnter = props.onDragEnter,
    onDragOver = props.onDragOver,
    other = _objectWithoutProperties(props, _excluded2);
  var valueToRender = formattedValue == null ? value : formattedValue;
  var cellRef = React.useRef(null);
  var handleRef = useForkRef(ref, cellRef);
  var focusElementRef = React.useRef(null);
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var ownerState = {
    align: align,
    showRightBorder: showRightBorder,
    isEditable: isEditable,
    classes: rootProps.classes,
    isSelected: isSelected
  };
  var classes = useUtilityClasses(ownerState);
  var publishMouseUp = React.useCallback(function (eventName) {
    return function (event) {
      var params = apiRef.current.getCellParams(rowId, field || '');
      apiRef.current.publishEvent(eventName, params, event);
      if (onMouseUp) {
        onMouseUp(event);
      }
    };
  }, [apiRef, field, onMouseUp, rowId]);
  var publishMouseDown = React.useCallback(function (eventName) {
    return function (event) {
      var params = apiRef.current.getCellParams(rowId, field || '');
      apiRef.current.publishEvent(eventName, params, event);
      if (onMouseDown) {
        onMouseDown(event);
      }
    };
  }, [apiRef, field, onMouseDown, rowId]);
  var publish = React.useCallback(function (eventName, propHandler) {
    return function (event) {
      // The row might have been deleted during the click
      if (!apiRef.current.getRow(rowId)) {
        return;
      }
      var params = apiRef.current.getCellParams(rowId, field || '');
      apiRef.current.publishEvent(eventName, params, event);
      if (propHandler) {
        propHandler(event);
      }
    };
  }, [apiRef, field, rowId]);
  var style = React.useMemo(function () {
    if (isNotVisible) {
      return {
        padding: 0,
        opacity: 0,
        width: 0,
        border: 0
      };
    }
    var cellStyle = _extends({
      minWidth: width,
      maxWidth: width,
      minHeight: height,
      maxHeight: height === 'auto' ? 'none' : height
    }, styleProp);
    return cellStyle;
  }, [width, height, isNotVisible, styleProp]);
  React.useEffect(function () {
    if (!hasFocus || cellMode === GridCellModes.Edit) {
      return;
    }
    var doc = ownerDocument(apiRef.current.rootElementRef.current);
    if (cellRef.current && !cellRef.current.contains(doc.activeElement)) {
      var focusableElement = cellRef.current.querySelector('[tabindex="0"]');
      var elementToFocus = focusElementRef.current || focusableElement || cellRef.current;
      if (doesSupportPreventScroll()) {
        elementToFocus.focus({
          preventScroll: true
        });
      } else {
        var scrollPosition = apiRef.current.getScrollPosition();
        elementToFocus.focus();
        apiRef.current.scroll(scrollPosition);
      }
    }
  }, [hasFocus, cellMode, apiRef]);
  var handleFocus = other.onFocus;
  if (process.env.NODE_ENV === 'test' && (_rootProps$experiment = rootProps.experimentalFeatures) != null && _rootProps$experiment.warnIfFocusStateIsNotSynced) {
    handleFocus = function handleFocus(event) {
      var focusedCell = gridFocusCellSelector(apiRef);
      if ((focusedCell == null ? void 0 : focusedCell.id) === rowId && focusedCell.field === field) {
        if (typeof other.onFocus === 'function') {
          other.onFocus(event);
        }
        return;
      }
      if (!warnedOnce) {
        console.warn(["MUI: The cell with id=".concat(rowId, " and field=").concat(field, " received focus."), "According to the state, the focus should be at id=".concat(focusedCell == null ? void 0 : focusedCell.id, ", field=").concat(focusedCell == null ? void 0 : focusedCell.field, "."), "Not syncing the state may cause unwanted behaviors since the `cellFocusIn` event won't be fired.", 'Call `fireEvent.mouseUp` before the `fireEvent.click` to sync the focus with the state.'].join('\n'));
        warnedOnce = true;
      }
    };
  }
  var managesOwnFocus = column.type === 'actions';
  var children = childrenProp;
  if (children === undefined) {
    var valueString = valueToRender == null ? void 0 : valueToRender.toString();
    children = /*#__PURE__*/_jsx("div", {
      className: classes.content,
      title: valueString,
      role: "presentation",
      children: valueString
    });
  }
  if ( /*#__PURE__*/React.isValidElement(children) && managesOwnFocus) {
    children = /*#__PURE__*/React.cloneElement(children, {
      focusElementRef: focusElementRef
    });
  }
  var draggableEventHandlers = disableDragEvents ? null : {
    onDragEnter: publish('cellDragEnter', onDragEnter),
    onDragOver: publish('cellDragOver', onDragOver)
  };
  var ariaV7 = (_rootProps$experiment2 = rootProps.experimentalFeatures) == null ? void 0 : _rootProps$experiment2.ariaV7;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    _jsx("div", _extends({
      ref: handleRef,
      className: clsx(className, classes.root),
      role: ariaV7 ? 'gridcell' : 'cell',
      "data-field": field,
      "data-colindex": colIndex,
      "aria-colindex": colIndex + 1,
      "aria-colspan": colSpan,
      style: style,
      tabIndex: tabIndex,
      onClick: publish('cellClick', onClick),
      onDoubleClick: publish('cellDoubleClick', onDoubleClick),
      onMouseOver: publish('cellMouseOver', onMouseOver),
      onMouseDown: publishMouseDown('cellMouseDown'),
      onMouseUp: publishMouseUp('cellMouseUp'),
      onKeyDown: publish('cellKeyDown', onKeyDown),
      onKeyUp: publish('cellKeyUp', onKeyUp)
    }, draggableEventHandlers, other, {
      onFocus: handleFocus,
      children: children
    }))
  );
});
var MemoizedCellWrapper = fastMemo(GridCellWrapper);
process.env.NODE_ENV !== "production" ? GridCellWrapper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  align: PropTypes.oneOf(['center', 'left', 'right']),
  className: PropTypes.string,
  colIndex: PropTypes.number,
  colSpan: PropTypes.number,
  column: PropTypes.object,
  disableDragEvents: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showRightBorder: PropTypes.bool,
  width: PropTypes.number
} : void 0;
process.env.NODE_ENV !== "production" ? GridCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  align: PropTypes.oneOf(['center', 'left', 'right']),
  cellMode: PropTypes.oneOf(['edit', 'view']),
  children: PropTypes.node,
  className: PropTypes.string,
  colIndex: PropTypes.number,
  colSpan: PropTypes.number,
  column: PropTypes.object,
  disableDragEvents: PropTypes.bool,
  editCellState: PropTypes.shape({
    changeReason: PropTypes.oneOf(['debouncedSetEditCellValue', 'setEditCellValue']),
    isProcessingProps: PropTypes.bool,
    isValidating: PropTypes.bool,
    value: PropTypes.any
  }),
  isNotVisible: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showRightBorder: PropTypes.bool,
  width: PropTypes.number
} : void 0;
export { MemoizedCellWrapper as GridCellWrapper, GridCell };
var GridCellV7 = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _getActions, _ref, _rootProps$unstable_c, _rootProps$experiment3, _rootProps$experiment4;
  var column = props.column,
    rowId = props.rowId,
    editCellState = props.editCellState,
    align = props.align,
    childrenProp = props.children,
    colIndex = props.colIndex,
    height = props.height,
    width = props.width,
    className = props.className,
    showRightBorder = props.showRightBorder,
    extendRowFullWidth = props.extendRowFullWidth,
    row = props.row,
    colSpan = props.colSpan,
    disableDragEvents = props.disableDragEvents,
    isNotVisible = props.isNotVisible,
    onClick = props.onClick,
    onDoubleClick = props.onDoubleClick,
    onMouseDown = props.onMouseDown,
    onMouseUp = props.onMouseUp,
    onMouseOver = props.onMouseOver,
    onKeyDown = props.onKeyDown,
    onKeyUp = props.onKeyUp,
    onDragEnter = props.onDragEnter,
    onDragOver = props.onDragOver,
    styleProp = props.style,
    other = _objectWithoutProperties(props, _excluded3);
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var field = column.field;
  var cellParamsWithAPI = useGridSelector(apiRef, function () {
    // This is required because `.getCellParams` tries to get the `state.rows.tree` entry
    // associated with `rowId`/`fieldId`, but this selector runs after the state has been
    // updated, while `rowId`/`fieldId` reference an entry in the old state.
    try {
      var cellParams = apiRef.current.getCellParams(rowId, field);
      var result = cellParams;
      result.api = apiRef.current;
      return result;
    } catch (e) {
      if (e instanceof MissingRowIdError) {
        return EMPTY_CELL_PARAMS;
      }
      throw e;
    }
  }, objectShallowCompare);
  var isSelected = useGridSelector(apiRef, function () {
    return apiRef.current.unstable_applyPipeProcessors('isCellSelected', false, {
      id: rowId,
      field: field
    });
  });
  var cellMode = cellParamsWithAPI.cellMode,
    hasFocus = cellParamsWithAPI.hasFocus,
    isEditable = cellParamsWithAPI.isEditable,
    value = cellParamsWithAPI.value,
    formattedValue = cellParamsWithAPI.formattedValue;
  var canManageOwnFocus = column.type === 'actions' && ((_getActions = (_ref = column).getActions) == null ? void 0 : _getActions.call(_ref, apiRef.current.getRowParams(rowId)).some(function (action) {
    return !action.props.disabled;
  }));
  var tabIndex = (cellMode === 'view' || !isEditable) && !canManageOwnFocus ? cellParamsWithAPI.tabIndex : -1;
  var rootClasses = rootProps.classes,
    getCellClassName = rootProps.getCellClassName;
  var classNames = apiRef.current.unstable_applyPipeProcessors('cellClassName', [], {
    id: rowId,
    field: field
  });
  if (column.cellClassName) {
    classNames.push(typeof column.cellClassName === 'function' ? column.cellClassName(cellParamsWithAPI) : column.cellClassName);
  }
  if (getCellClassName) {
    classNames.push(getCellClassName(cellParamsWithAPI));
  }
  var valueToRender = formattedValue == null ? value : formattedValue;
  var cellRef = React.useRef(null);
  var handleRef = useForkRef(ref, cellRef);
  var focusElementRef = React.useRef(null);
  // @ts-expect-error To access `unstable_cellSelection` flag as it's a `premium` feature
  var isSelectionMode = (_rootProps$unstable_c = rootProps.unstable_cellSelection) != null ? _rootProps$unstable_c : false;
  var ownerState = {
    align: align,
    showRightBorder: showRightBorder,
    isEditable: isEditable,
    classes: rootProps.classes,
    isSelected: isSelected,
    isSelectionMode: isSelectionMode
  };
  var classes = useUtilityClasses(ownerState);
  var publishMouseUp = React.useCallback(function (eventName) {
    return function (event) {
      var params = apiRef.current.getCellParams(rowId, field || '');
      apiRef.current.publishEvent(eventName, params, event);
      if (onMouseUp) {
        onMouseUp(event);
      }
    };
  }, [apiRef, field, onMouseUp, rowId]);
  var publishMouseDown = React.useCallback(function (eventName) {
    return function (event) {
      var params = apiRef.current.getCellParams(rowId, field || '');
      apiRef.current.publishEvent(eventName, params, event);
      if (onMouseDown) {
        onMouseDown(event);
      }
    };
  }, [apiRef, field, onMouseDown, rowId]);
  var publish = React.useCallback(function (eventName, propHandler) {
    return function (event) {
      // The row might have been deleted during the click
      if (!apiRef.current.getRow(rowId)) {
        return;
      }
      var params = apiRef.current.getCellParams(rowId, field || '');
      apiRef.current.publishEvent(eventName, params, event);
      if (propHandler) {
        propHandler(event);
      }
    };
  }, [apiRef, field, rowId]);
  var style = React.useMemo(function () {
    if (isNotVisible) {
      return _extends({
        padding: 0,
        opacity: 0,
        width: 0,
        border: 0
      }, styleProp);
    }
    var cellStyle = _extends({
      minWidth: width,
      maxWidth: width,
      minHeight: height,
      maxHeight: height === 'auto' ? 'none' : height
    }, styleProp);
    return cellStyle;
  }, [width, height, isNotVisible, styleProp]);
  React.useEffect(function () {
    if (!hasFocus || cellMode === GridCellModes.Edit) {
      return;
    }
    var doc = ownerDocument(apiRef.current.rootElementRef.current);
    if (cellRef.current && !cellRef.current.contains(doc.activeElement)) {
      var focusableElement = cellRef.current.querySelector('[tabindex="0"]');
      var elementToFocus = focusElementRef.current || focusableElement || cellRef.current;
      if (doesSupportPreventScroll()) {
        elementToFocus.focus({
          preventScroll: true
        });
      } else {
        var scrollPosition = apiRef.current.getScrollPosition();
        elementToFocus.focus();
        apiRef.current.scroll(scrollPosition);
      }
    }
  }, [hasFocus, cellMode, apiRef]);
  if (cellParamsWithAPI === EMPTY_CELL_PARAMS) {
    return null;
  }
  var handleFocus = other.onFocus;
  if (process.env.NODE_ENV === 'test' && (_rootProps$experiment3 = rootProps.experimentalFeatures) != null && _rootProps$experiment3.warnIfFocusStateIsNotSynced) {
    handleFocus = function handleFocus(event) {
      var focusedCell = gridFocusCellSelector(apiRef);
      if ((focusedCell == null ? void 0 : focusedCell.id) === rowId && focusedCell.field === field) {
        if (typeof other.onFocus === 'function') {
          other.onFocus(event);
        }
        return;
      }
      if (!warnedOnce) {
        console.warn(["MUI: The cell with id=".concat(rowId, " and field=").concat(field, " received focus."), "According to the state, the focus should be at id=".concat(focusedCell == null ? void 0 : focusedCell.id, ", field=").concat(focusedCell == null ? void 0 : focusedCell.field, "."), "Not syncing the state may cause unwanted behaviors since the `cellFocusIn` event won't be fired.", 'Call `fireEvent.mouseUp` before the `fireEvent.click` to sync the focus with the state.'].join('\n'));
        warnedOnce = true;
      }
    };
  }
  var children;
  if (editCellState == null && column.renderCell) {
    children = column.renderCell(cellParamsWithAPI);
    classNames.push(gridClasses['cell--withRenderer']);
    classNames.push(rootClasses == null ? void 0 : rootClasses['cell--withRenderer']);
  }
  if (editCellState != null && column.renderEditCell) {
    var updatedRow = apiRef.current.getRowWithUpdatedValues(rowId, column.field);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    var changeReason = editCellState.changeReason,
      unstable_updateValueOnRender = editCellState.unstable_updateValueOnRender,
      editCellStateRest = _objectWithoutProperties(editCellState, _excluded4);
    var params = _extends({}, cellParamsWithAPI, {
      row: updatedRow
    }, editCellStateRest);
    children = column.renderEditCell(params);
    classNames.push(gridClasses['cell--editing']);
    classNames.push(rootClasses == null ? void 0 : rootClasses['cell--editing']);
  }
  if (children === undefined) {
    var valueString = valueToRender == null ? void 0 : valueToRender.toString();
    children = /*#__PURE__*/_jsx("div", {
      className: classes.content,
      title: valueString,
      role: "presentation",
      children: valueString
    });
  }
  if ( /*#__PURE__*/React.isValidElement(children) && canManageOwnFocus) {
    children = /*#__PURE__*/React.cloneElement(children, {
      focusElementRef: focusElementRef
    });
  }
  var draggableEventHandlers = disableDragEvents ? null : {
    onDragEnter: publish('cellDragEnter', onDragEnter),
    onDragOver: publish('cellDragOver', onDragOver)
  };
  var ariaV7 = (_rootProps$experiment4 = rootProps.experimentalFeatures) == null ? void 0 : _rootProps$experiment4.ariaV7;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    _jsx("div", _extends({
      ref: handleRef,
      className: clsx(className, classNames, classes.root),
      role: ariaV7 ? 'gridcell' : 'cell',
      "data-field": field,
      "data-colindex": colIndex,
      "aria-colindex": colIndex + 1,
      "aria-colspan": colSpan,
      style: style,
      tabIndex: tabIndex,
      onClick: publish('cellClick', onClick),
      onDoubleClick: publish('cellDoubleClick', onDoubleClick),
      onMouseOver: publish('cellMouseOver', onMouseOver),
      onMouseDown: publishMouseDown('cellMouseDown'),
      onMouseUp: publishMouseUp('cellMouseUp'),
      onKeyDown: publish('cellKeyDown', onKeyDown),
      onKeyUp: publish('cellKeyUp', onKeyUp)
    }, draggableEventHandlers, other, {
      onFocus: handleFocus,
      children: children
    }))
  );
});
process.env.NODE_ENV !== "production" ? GridCellV7.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  align: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
  className: PropTypes.string,
  colIndex: PropTypes.number.isRequired,
  colSpan: PropTypes.number,
  column: PropTypes.object.isRequired,
  disableDragEvents: PropTypes.bool,
  editCellState: PropTypes.shape({
    changeReason: PropTypes.oneOf(['debouncedSetEditCellValue', 'setEditCellValue']),
    isProcessingProps: PropTypes.bool,
    isValidating: PropTypes.bool,
    value: PropTypes.any
  }),
  height: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
  isNotVisible: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  showRightBorder: PropTypes.bool,
  width: PropTypes.number.isRequired
} : void 0;
var MemoizedGridCellV7 = fastMemo(GridCellV7);
export { MemoizedGridCellV7 as GridCellV7 };