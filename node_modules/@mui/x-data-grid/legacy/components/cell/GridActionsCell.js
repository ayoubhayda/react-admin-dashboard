import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["api", "colDef", "id", "hasFocus", "isEditable", "field", "value", "formattedValue", "row", "rowNode", "cellMode", "tabIndex", "position", "focusElementRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@mui/material/MenuList';
import { useTheme } from '@mui/material/styles';
import { unstable_useId as useId } from '@mui/utils';
import { gridClasses } from '../../constants/gridClasses';
import { GridMenu } from '../menu/GridMenu';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var hasActions = function hasActions(colDef) {
  return typeof colDef.getActions === 'function';
};
function GridActionsCell(props) {
  var _rootProps$slotProps;
  var api = props.api,
    colDef = props.colDef,
    id = props.id,
    hasFocus = props.hasFocus,
    isEditable = props.isEditable,
    field = props.field,
    value = props.value,
    formattedValue = props.formattedValue,
    row = props.row,
    rowNode = props.rowNode,
    cellMode = props.cellMode,
    tabIndex = props.tabIndex,
    _props$position = props.position,
    position = _props$position === void 0 ? 'bottom-end' : _props$position,
    focusElementRef = props.focusElementRef,
    other = _objectWithoutProperties(props, _excluded);
  var _React$useState = React.useState(-1),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedButtonIndex = _React$useState2[0],
    setFocusedButtonIndex = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    open = _React$useState4[0],
    setOpen = _React$useState4[1];
  var apiRef = useGridApiContext();
  var rootRef = React.useRef(null);
  var buttonRef = React.useRef(null);
  var ignoreCallToFocus = React.useRef(false);
  var touchRippleRefs = React.useRef({});
  var theme = useTheme();
  var menuId = useId();
  var buttonId = useId();
  var rootProps = useGridRootProps();
  if (!hasActions(colDef)) {
    throw new Error('MUI: Missing the `getActions` property in the `GridColDef`.');
  }
  var options = colDef.getActions(apiRef.current.getRowParams(id));
  var iconButtons = options.filter(function (option) {
    return !option.props.showInMenu;
  });
  var menuButtons = options.filter(function (option) {
    return option.props.showInMenu;
  });
  var numberOfButtons = iconButtons.length + (menuButtons.length ? 1 : 0);
  React.useLayoutEffect(function () {
    if (!hasFocus) {
      Object.entries(touchRippleRefs.current).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          index = _ref2[0],
          ref = _ref2[1];
        ref == null || ref.stop({}, function () {
          delete touchRippleRefs.current[index];
        });
      });
    }
  }, [hasFocus]);
  React.useEffect(function () {
    if (focusedButtonIndex < 0 || !rootRef.current) {
      return;
    }
    if (focusedButtonIndex >= rootRef.current.children.length) {
      return;
    }
    var child = rootRef.current.children[focusedButtonIndex];
    child.focus({
      preventScroll: true
    });
  }, [focusedButtonIndex]);
  React.useEffect(function () {
    if (!hasFocus) {
      setFocusedButtonIndex(-1);
      ignoreCallToFocus.current = false;
    }
  }, [hasFocus]);
  React.useImperativeHandle(focusElementRef, function () {
    return {
      focus: function focus() {
        // If ignoreCallToFocus is true, then one of the buttons was clicked and the focus is already set
        if (!ignoreCallToFocus.current) {
          // find the first focusable button and pass the index to the state
          var focusableButtonIndex = options.findIndex(function (o) {
            return !o.props.disabled;
          });
          setFocusedButtonIndex(focusableButtonIndex);
        }
      }
    };
  }, [options]);
  React.useEffect(function () {
    if (focusedButtonIndex >= numberOfButtons) {
      setFocusedButtonIndex(numberOfButtons - 1);
    }
  }, [focusedButtonIndex, numberOfButtons]);
  var showMenu = function showMenu() {
    setOpen(true);
    setFocusedButtonIndex(numberOfButtons - 1);
    ignoreCallToFocus.current = true;
  };
  var hideMenu = function hideMenu() {
    setOpen(false);
  };
  var handleTouchRippleRef = function handleTouchRippleRef(index) {
    return function (instance) {
      touchRippleRefs.current[index] = instance;
    };
  };
  var handleButtonClick = function handleButtonClick(index, onClick) {
    return function (event) {
      setFocusedButtonIndex(index);
      ignoreCallToFocus.current = true;
      if (onClick) {
        onClick(event);
      }
    };
  };
  var handleRootKeyDown = function handleRootKeyDown(event) {
    if (numberOfButtons <= 1) {
      return;
    }
    var getNewIndex = function getNewIndex(index, direction) {
      var _options;
      if (index < 0 || index > options.length) {
        return index;
      }

      // for rtl mode we need to reverse the direction
      var rtlMod = theme.direction === 'rtl' ? -1 : 1;
      var indexMod = (direction === 'left' ? -1 : 1) * rtlMod;

      // if the button that should receive focus is disabled go one more step
      return (_options = options[index + indexMod]) != null && _options.props.disabled ? getNewIndex(index + indexMod, direction) : index + indexMod;
    };
    var newIndex = focusedButtonIndex;
    if (event.key === 'ArrowRight') {
      newIndex = getNewIndex(focusedButtonIndex, 'right');
    } else if (event.key === 'ArrowLeft') {
      newIndex = getNewIndex(focusedButtonIndex, 'left');
    }
    if (newIndex < 0 || newIndex >= numberOfButtons) {
      return; // We're already in the first or last item = do nothing and let the grid listen the event
    }
    if (newIndex !== focusedButtonIndex) {
      event.preventDefault(); // Prevent scrolling
      event.stopPropagation(); // Don't stop propagation for other keys, e.g. ArrowUp
      setFocusedButtonIndex(newIndex);
    }
  };
  var handleListKeyDown = function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
    if (['Tab', 'Escape'].includes(event.key)) {
      hideMenu();
    }
  };
  return /*#__PURE__*/_jsxs("div", _extends({
    role: "menu",
    ref: rootRef,
    tabIndex: -1,
    className: gridClasses.actionsCell,
    onKeyDown: handleRootKeyDown
  }, other, {
    children: [iconButtons.map(function (button, index) {
      return /*#__PURE__*/React.cloneElement(button, {
        key: index,
        touchRippleRef: handleTouchRippleRef(index),
        onClick: handleButtonClick(index, button.props.onClick),
        tabIndex: focusedButtonIndex === index ? tabIndex : -1
      });
    }), menuButtons.length > 0 && buttonId && /*#__PURE__*/_jsx(rootProps.slots.baseIconButton, _extends({
      ref: buttonRef,
      id: buttonId,
      "aria-label": apiRef.current.getLocaleText('actionsCellMore'),
      "aria-haspopup": "menu",
      "aria-expanded": open,
      "aria-controls": open ? menuId : undefined,
      role: "menuitem",
      size: "small",
      onClick: showMenu,
      touchRippleRef: handleTouchRippleRef(buttonId),
      tabIndex: focusedButtonIndex === iconButtons.length ? tabIndex : -1
    }, (_rootProps$slotProps = rootProps.slotProps) == null ? void 0 : _rootProps$slotProps.baseIconButton, {
      children: /*#__PURE__*/_jsx(rootProps.slots.moreActionsIcon, {
        fontSize: "small"
      })
    })), menuButtons.length > 0 && /*#__PURE__*/_jsx(GridMenu, {
      open: open,
      target: buttonRef.current,
      position: position,
      onClose: hideMenu,
      children: /*#__PURE__*/_jsx(MenuList, {
        id: menuId,
        className: gridClasses.menuList,
        onKeyDown: handleListKeyDown,
        "aria-labelledby": buttonId,
        variant: "menu",
        autoFocusItem: true,
        children: menuButtons.map(function (button, index) {
          return /*#__PURE__*/React.cloneElement(button, {
            key: index,
            closeMenu: hideMenu
          });
        })
      })
    })]
  }));
}
process.env.NODE_ENV !== "production" ? GridActionsCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  api: PropTypes.object,
  /**
   * The mode of the cell.
   */
  cellMode: PropTypes.oneOf(['edit', 'view']).isRequired,
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * A ref allowing to set imperative focus.
   * It can be passed to the element that should receive focus.
   * @ignore - do not document.
   */
  focusElementRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      focus: PropTypes.func.isRequired
    })
  })]),
  /**
   * The cell value formatted with the column valueFormatter.
   */
  formattedValue: PropTypes.any,
  /**
   * If true, the cell is the active element.
   */
  hasFocus: PropTypes.bool.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * If true, the cell is editable.
   */
  isEditable: PropTypes.bool,
  position: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /**
   * The row model of the row that the current cell belongs to.
   */
  row: PropTypes.any.isRequired,
  /**
   * The node of the row that the current cell belongs to.
   */
  rowNode: PropTypes.object.isRequired,
  /**
   * the tabIndex value.
   */
  tabIndex: PropTypes.oneOf([-1, 0]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any
} : void 0;
export { GridActionsCell };
export var renderActionsCell = function renderActionsCell(params) {
  return /*#__PURE__*/_jsx(GridActionsCell, _extends({}, params));
};