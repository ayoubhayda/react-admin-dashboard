import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["changeReason", "unstable_updateValueOnRender"],
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
const EMPTY_CELL_PARAMS = {
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
const useUtilityClasses = ownerState => {
  const {
    align,
    showRightBorder,
    isEditable,
    isSelected,
    isSelectionMode,
    classes
  } = ownerState;
  const slots = {
    root: ['cell', `cell--text${capitalize(align)}`, isEditable && 'cell--editable', isSelected && 'selected', showRightBorder && 'cell--withRightBorder', isSelectionMode && !isEditable && 'cell--selectionMode', 'withBorderColor'],
    content: ['cellContent']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
let warnedOnce = false;

// GridCellWrapper is a compatibility layer for the V6 cell slot. If we can use the more efficient
// `GridCellV7`, we should. That component is a merge of `GridCellWrapper` and `GridCell`.
// TODO(v7): Remove the wrapper & cellV6 and use the cellV7 exclusively.
// TODO(v7): Removing the wrapper will break the docs performance visualization demo.
const GridCellWrapper = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    column,
    rowId,
    editCellState
  } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const field = column.field;
  const cellParamsWithAPI = useGridSelector(apiRef, () => {
    // This is required because `.getCellParams` tries to get the `state.rows.tree` entry
    // associated with `rowId`/`fieldId`, but this selector runs after the state has been
    // updated, while `rowId`/`fieldId` reference an entry in the old state.
    try {
      const cellParams = apiRef.current.getCellParams(rowId, field);
      const result = cellParams;
      result.api = apiRef.current;
      return result;
    } catch (e) {
      if (e instanceof MissingRowIdError) {
        return EMPTY_CELL_PARAMS;
      }
      throw e;
    }
  }, objectShallowCompare);
  const isSelected = useGridSelector(apiRef, () => apiRef.current.unstable_applyPipeProcessors('isCellSelected', false, {
    id: rowId,
    field
  }));
  if (cellParamsWithAPI === EMPTY_CELL_PARAMS) {
    return null;
  }
  const {
    cellMode,
    hasFocus,
    isEditable,
    value,
    formattedValue
  } = cellParamsWithAPI;
  const managesOwnFocus = column.type === 'actions';
  const tabIndex = (cellMode === 'view' || !isEditable) && !managesOwnFocus ? cellParamsWithAPI.tabIndex : -1;
  const {
    classes: rootClasses,
    getCellClassName
  } = rootProps;
  const classNames = apiRef.current.unstable_applyPipeProcessors('cellClassName', [], {
    id: rowId,
    field
  });
  if (column.cellClassName) {
    classNames.push(typeof column.cellClassName === 'function' ? column.cellClassName(cellParamsWithAPI) : column.cellClassName);
  }
  if (getCellClassName) {
    classNames.push(getCellClassName(cellParamsWithAPI));
  }
  let children;
  if (editCellState == null && column.renderCell) {
    children = column.renderCell(cellParamsWithAPI);
    classNames.push(gridClasses['cell--withRenderer']);
    classNames.push(rootClasses?.['cell--withRenderer']);
  }
  if (editCellState != null && column.renderEditCell) {
    const updatedRow = apiRef.current.getRowWithUpdatedValues(rowId, column.field);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const editCellStateRest = _objectWithoutPropertiesLoose(editCellState, _excluded);
    const params = _extends({}, cellParamsWithAPI, {
      row: updatedRow
    }, editCellStateRest);
    children = column.renderEditCell(params);
    classNames.push(gridClasses['cell--editing']);
    classNames.push(rootClasses?.['cell--editing']);
  }
  const {
    slots
  } = rootProps;
  const CellComponent = slots.cell;
  const cellProps = _extends({}, props, {
    ref,
    field,
    formattedValue,
    hasFocus,
    isEditable,
    isSelected,
    value,
    cellMode,
    children,
    tabIndex,
    className: clsx(classNames)
  });
  return /*#__PURE__*/React.createElement(CellComponent, cellProps);
});
const GridCell = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      align,
      children: childrenProp,
      colIndex,
      column,
      cellMode,
      field,
      formattedValue,
      hasFocus,
      height,
      isEditable,
      isSelected,
      rowId,
      tabIndex,
      style: styleProp,
      value,
      width,
      className,
      showRightBorder,
      colSpan,
      disableDragEvents,
      isNotVisible,
      onClick,
      onDoubleClick,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onKeyDown,
      onKeyUp,
      onDragEnter,
      onDragOver
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded2);
  const valueToRender = formattedValue == null ? value : formattedValue;
  const cellRef = React.useRef(null);
  const handleRef = useForkRef(ref, cellRef);
  const focusElementRef = React.useRef(null);
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const ownerState = {
    align,
    showRightBorder,
    isEditable,
    classes: rootProps.classes,
    isSelected
  };
  const classes = useUtilityClasses(ownerState);
  const publishMouseUp = React.useCallback(eventName => event => {
    const params = apiRef.current.getCellParams(rowId, field || '');
    apiRef.current.publishEvent(eventName, params, event);
    if (onMouseUp) {
      onMouseUp(event);
    }
  }, [apiRef, field, onMouseUp, rowId]);
  const publishMouseDown = React.useCallback(eventName => event => {
    const params = apiRef.current.getCellParams(rowId, field || '');
    apiRef.current.publishEvent(eventName, params, event);
    if (onMouseDown) {
      onMouseDown(event);
    }
  }, [apiRef, field, onMouseDown, rowId]);
  const publish = React.useCallback((eventName, propHandler) => event => {
    // The row might have been deleted during the click
    if (!apiRef.current.getRow(rowId)) {
      return;
    }
    const params = apiRef.current.getCellParams(rowId, field || '');
    apiRef.current.publishEvent(eventName, params, event);
    if (propHandler) {
      propHandler(event);
    }
  }, [apiRef, field, rowId]);
  const style = React.useMemo(() => {
    if (isNotVisible) {
      return {
        padding: 0,
        opacity: 0,
        width: 0,
        border: 0
      };
    }
    const cellStyle = _extends({
      minWidth: width,
      maxWidth: width,
      minHeight: height,
      maxHeight: height === 'auto' ? 'none' : height
    }, styleProp);
    return cellStyle;
  }, [width, height, isNotVisible, styleProp]);
  React.useEffect(() => {
    if (!hasFocus || cellMode === GridCellModes.Edit) {
      return;
    }
    const doc = ownerDocument(apiRef.current.rootElementRef.current);
    if (cellRef.current && !cellRef.current.contains(doc.activeElement)) {
      const focusableElement = cellRef.current.querySelector('[tabindex="0"]');
      const elementToFocus = focusElementRef.current || focusableElement || cellRef.current;
      if (doesSupportPreventScroll()) {
        elementToFocus.focus({
          preventScroll: true
        });
      } else {
        const scrollPosition = apiRef.current.getScrollPosition();
        elementToFocus.focus();
        apiRef.current.scroll(scrollPosition);
      }
    }
  }, [hasFocus, cellMode, apiRef]);
  let handleFocus = other.onFocus;
  if (process.env.NODE_ENV === 'test' && rootProps.experimentalFeatures?.warnIfFocusStateIsNotSynced) {
    handleFocus = event => {
      const focusedCell = gridFocusCellSelector(apiRef);
      if (focusedCell?.id === rowId && focusedCell.field === field) {
        if (typeof other.onFocus === 'function') {
          other.onFocus(event);
        }
        return;
      }
      if (!warnedOnce) {
        console.warn([`MUI: The cell with id=${rowId} and field=${field} received focus.`, `According to the state, the focus should be at id=${focusedCell?.id}, field=${focusedCell?.field}.`, "Not syncing the state may cause unwanted behaviors since the `cellFocusIn` event won't be fired.", 'Call `fireEvent.mouseUp` before the `fireEvent.click` to sync the focus with the state.'].join('\n'));
        warnedOnce = true;
      }
    };
  }
  const managesOwnFocus = column.type === 'actions';
  let children = childrenProp;
  if (children === undefined) {
    const valueString = valueToRender?.toString();
    children = /*#__PURE__*/_jsx("div", {
      className: classes.content,
      title: valueString,
      role: "presentation",
      children: valueString
    });
  }
  if ( /*#__PURE__*/React.isValidElement(children) && managesOwnFocus) {
    children = /*#__PURE__*/React.cloneElement(children, {
      focusElementRef
    });
  }
  const draggableEventHandlers = disableDragEvents ? null : {
    onDragEnter: publish('cellDragEnter', onDragEnter),
    onDragOver: publish('cellDragOver', onDragOver)
  };
  const ariaV7 = rootProps.experimentalFeatures?.ariaV7;
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
const MemoizedCellWrapper = fastMemo(GridCellWrapper);
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
const GridCellV7 = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      column,
      rowId,
      editCellState,
      align,
      colIndex,
      height,
      width,
      className,
      showRightBorder,
      colSpan,
      disableDragEvents,
      isNotVisible,
      onClick,
      onDoubleClick,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onKeyDown,
      onKeyUp,
      onDragEnter,
      onDragOver,
      style: styleProp
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded3);
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const field = column.field;
  const cellParamsWithAPI = useGridSelector(apiRef, () => {
    // This is required because `.getCellParams` tries to get the `state.rows.tree` entry
    // associated with `rowId`/`fieldId`, but this selector runs after the state has been
    // updated, while `rowId`/`fieldId` reference an entry in the old state.
    try {
      const cellParams = apiRef.current.getCellParams(rowId, field);
      const result = cellParams;
      result.api = apiRef.current;
      return result;
    } catch (e) {
      if (e instanceof MissingRowIdError) {
        return EMPTY_CELL_PARAMS;
      }
      throw e;
    }
  }, objectShallowCompare);
  const isSelected = useGridSelector(apiRef, () => apiRef.current.unstable_applyPipeProcessors('isCellSelected', false, {
    id: rowId,
    field
  }));
  const {
    cellMode,
    hasFocus,
    isEditable,
    value,
    formattedValue
  } = cellParamsWithAPI;
  const canManageOwnFocus = column.type === 'actions' && column.getActions?.(apiRef.current.getRowParams(rowId)).some(action => !action.props.disabled);
  const tabIndex = (cellMode === 'view' || !isEditable) && !canManageOwnFocus ? cellParamsWithAPI.tabIndex : -1;
  const {
    classes: rootClasses,
    getCellClassName
  } = rootProps;
  const classNames = apiRef.current.unstable_applyPipeProcessors('cellClassName', [], {
    id: rowId,
    field
  });
  if (column.cellClassName) {
    classNames.push(typeof column.cellClassName === 'function' ? column.cellClassName(cellParamsWithAPI) : column.cellClassName);
  }
  if (getCellClassName) {
    classNames.push(getCellClassName(cellParamsWithAPI));
  }
  const valueToRender = formattedValue == null ? value : formattedValue;
  const cellRef = React.useRef(null);
  const handleRef = useForkRef(ref, cellRef);
  const focusElementRef = React.useRef(null);
  // @ts-expect-error To access `unstable_cellSelection` flag as it's a `premium` feature
  const isSelectionMode = rootProps.unstable_cellSelection ?? false;
  const ownerState = {
    align,
    showRightBorder,
    isEditable,
    classes: rootProps.classes,
    isSelected,
    isSelectionMode
  };
  const classes = useUtilityClasses(ownerState);
  const publishMouseUp = React.useCallback(eventName => event => {
    const params = apiRef.current.getCellParams(rowId, field || '');
    apiRef.current.publishEvent(eventName, params, event);
    if (onMouseUp) {
      onMouseUp(event);
    }
  }, [apiRef, field, onMouseUp, rowId]);
  const publishMouseDown = React.useCallback(eventName => event => {
    const params = apiRef.current.getCellParams(rowId, field || '');
    apiRef.current.publishEvent(eventName, params, event);
    if (onMouseDown) {
      onMouseDown(event);
    }
  }, [apiRef, field, onMouseDown, rowId]);
  const publish = React.useCallback((eventName, propHandler) => event => {
    // The row might have been deleted during the click
    if (!apiRef.current.getRow(rowId)) {
      return;
    }
    const params = apiRef.current.getCellParams(rowId, field || '');
    apiRef.current.publishEvent(eventName, params, event);
    if (propHandler) {
      propHandler(event);
    }
  }, [apiRef, field, rowId]);
  const style = React.useMemo(() => {
    if (isNotVisible) {
      return _extends({
        padding: 0,
        opacity: 0,
        width: 0,
        border: 0
      }, styleProp);
    }
    const cellStyle = _extends({
      minWidth: width,
      maxWidth: width,
      minHeight: height,
      maxHeight: height === 'auto' ? 'none' : height
    }, styleProp);
    return cellStyle;
  }, [width, height, isNotVisible, styleProp]);
  React.useEffect(() => {
    if (!hasFocus || cellMode === GridCellModes.Edit) {
      return;
    }
    const doc = ownerDocument(apiRef.current.rootElementRef.current);
    if (cellRef.current && !cellRef.current.contains(doc.activeElement)) {
      const focusableElement = cellRef.current.querySelector('[tabindex="0"]');
      const elementToFocus = focusElementRef.current || focusableElement || cellRef.current;
      if (doesSupportPreventScroll()) {
        elementToFocus.focus({
          preventScroll: true
        });
      } else {
        const scrollPosition = apiRef.current.getScrollPosition();
        elementToFocus.focus();
        apiRef.current.scroll(scrollPosition);
      }
    }
  }, [hasFocus, cellMode, apiRef]);
  if (cellParamsWithAPI === EMPTY_CELL_PARAMS) {
    return null;
  }
  let handleFocus = other.onFocus;
  if (process.env.NODE_ENV === 'test' && rootProps.experimentalFeatures?.warnIfFocusStateIsNotSynced) {
    handleFocus = event => {
      const focusedCell = gridFocusCellSelector(apiRef);
      if (focusedCell?.id === rowId && focusedCell.field === field) {
        if (typeof other.onFocus === 'function') {
          other.onFocus(event);
        }
        return;
      }
      if (!warnedOnce) {
        console.warn([`MUI: The cell with id=${rowId} and field=${field} received focus.`, `According to the state, the focus should be at id=${focusedCell?.id}, field=${focusedCell?.field}.`, "Not syncing the state may cause unwanted behaviors since the `cellFocusIn` event won't be fired.", 'Call `fireEvent.mouseUp` before the `fireEvent.click` to sync the focus with the state.'].join('\n'));
        warnedOnce = true;
      }
    };
  }
  let children;
  if (editCellState == null && column.renderCell) {
    children = column.renderCell(cellParamsWithAPI);
    classNames.push(gridClasses['cell--withRenderer']);
    classNames.push(rootClasses?.['cell--withRenderer']);
  }
  if (editCellState != null && column.renderEditCell) {
    const updatedRow = apiRef.current.getRowWithUpdatedValues(rowId, column.field);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const editCellStateRest = _objectWithoutPropertiesLoose(editCellState, _excluded4);
    const params = _extends({}, cellParamsWithAPI, {
      row: updatedRow
    }, editCellStateRest);
    children = column.renderEditCell(params);
    classNames.push(gridClasses['cell--editing']);
    classNames.push(rootClasses?.['cell--editing']);
  }
  if (children === undefined) {
    const valueString = valueToRender?.toString();
    children = /*#__PURE__*/_jsx("div", {
      className: classes.content,
      title: valueString,
      role: "presentation",
      children: valueString
    });
  }
  if ( /*#__PURE__*/React.isValidElement(children) && canManageOwnFocus) {
    children = /*#__PURE__*/React.cloneElement(children, {
      focusElementRef
    });
  }
  const draggableEventHandlers = disableDragEvents ? null : {
    onDragEnter: publish('cellDragEnter', onDragEnter),
    onDragOver: publish('cellDragOver', onDragOver)
  };
  const ariaV7 = rootProps.experimentalFeatures?.ariaV7;
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
const MemoizedGridCellV7 = fastMemo(GridCellV7);
export { MemoizedGridCellV7 as GridCellV7 };