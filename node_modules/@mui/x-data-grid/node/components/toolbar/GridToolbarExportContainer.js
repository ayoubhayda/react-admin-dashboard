"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridToolbarExportContainer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _MenuList = _interopRequireDefault(require("@mui/material/MenuList"));
var _keyboardUtils = require("../../utils/keyboardUtils");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _GridMenu = require("../menu/GridMenu");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridClasses = require("../../constants/gridClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "onClick"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridToolbarExportContainer = exports.GridToolbarExportContainer = /*#__PURE__*/React.forwardRef(function GridToolbarExportContainer(props, ref) {
  const {
      children,
      onClick
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const exportButtonId = (0, _utils.unstable_useId)();
  const exportMenuId = (0, _utils.unstable_useId)();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const handleRef = (0, _utils.unstable_useForkRef)(ref, buttonRef);
  const handleMenuOpen = event => {
    setOpen(prevOpen => !prevOpen);
    onClick?.(event);
  };
  const handleMenuClose = () => setOpen(false);
  const handleListKeyDown = event => {
    if ((0, _keyboardUtils.isTabKey)(event.key)) {
      event.preventDefault();
    }
    if ((0, _keyboardUtils.isHideMenuKey)(event.key)) {
      handleMenuClose();
    }
  };
  if (children == null) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseButton, (0, _extends2.default)({
      ref: handleRef,
      size: "small",
      startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.exportIcon, {}),
      "aria-expanded": open,
      "aria-label": apiRef.current.getLocaleText('toolbarExportLabel'),
      "aria-haspopup": "menu",
      "aria-controls": open ? exportMenuId : undefined,
      id: exportButtonId
    }, other, {
      onClick: handleMenuOpen
    }, rootProps.slotProps?.baseButton, {
      children: apiRef.current.getLocaleText('toolbarExport')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridMenu.GridMenu, {
      open: open,
      target: buttonRef.current,
      onClose: handleMenuClose,
      position: "bottom-start",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuList.default, {
        id: exportMenuId,
        className: _gridClasses.gridClasses.menuList,
        "aria-labelledby": exportButtonId,
        onKeyDown: handleListKeyDown,
        autoFocusItem: open,
        children: React.Children.map(children, child => {
          if (! /*#__PURE__*/React.isValidElement(child)) {
            return child;
          }
          return /*#__PURE__*/React.cloneElement(child, {
            hideMenu: handleMenuClose
          });
        })
      })
    })]
  });
});