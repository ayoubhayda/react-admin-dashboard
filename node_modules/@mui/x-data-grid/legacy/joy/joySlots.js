import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["touchRippleRef", "inputProps", "onChange", "color", "size", "checked", "sx", "value", "inputRef"],
  _excluded2 = ["onChange", "label", "placeholder", "value", "inputRef", "type", "size", "variant"],
  _excluded3 = ["startIcon", "color", "endIcon", "size", "sx", "variant"],
  _excluded4 = ["color", "size", "sx", "touchRippleRef"],
  _excluded5 = ["name", "checkedIcon", "color", "disableRipple", "disableFocusRipple", "disableTouchRipple", "edge", "icon", "inputProps", "inputRef", "size", "sx", "onChange", "onClick"],
  _excluded6 = ["open", "onOpen", "value", "onChange", "size", "color", "variant", "inputProps", "MenuProps", "inputRef", "error", "native", "fullWidth", "labelId"],
  _excluded7 = ["native"],
  _excluded8 = ["shrink", "variant", "sx"];
import * as React from 'react';
import JoyCheckbox from '@mui/joy/Checkbox';
import JoyInput from '@mui/joy/Input';
import JoyFormControl from '@mui/joy/FormControl';
import JoyFormLabel from '@mui/joy/FormLabel';
import JoyButton from '@mui/joy/Button';
import JoyIconButton from '@mui/joy/IconButton';
import JoySwitch from '@mui/joy/Switch';
import JoySelect from '@mui/joy/Select';
import JoyOption from '@mui/joy/Option';
import JoyBox from '@mui/joy/Box';
import JoyTypography from '@mui/joy/Typography';
import JoyCircularProgress from '@mui/joy/CircularProgress';
import JoyTooltip from '@mui/joy/Tooltip';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import joyIconSlots, { GridKeyboardArrowRight, GridKeyboardArrowLeft } from './icons';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { gridFilteredTopLevelRowCountSelector, gridPaginationModelSelector } from '../hooks';
import { GridOverlay } from '../components/containers/GridOverlay';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function convertColor(color) {
  if (color === 'secondary') {
    return 'primary';
  }
  if (color === 'error') {
    return 'danger';
  }
  if (color === 'default' || color === 'inherit') {
    return 'neutral';
  }
  return color;
}
function convertSize(size) {
  return size ? {
    small: 'sm',
    medium: 'md',
    large: 'lg'
  }[size] : size;
}
function convertVariant(variant) {
  var defaultVariant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'plain';
  if (!variant) {
    return defaultVariant;
  }
  return {
    standard: 'outlined',
    outlined: 'outlined',
    contained: 'solid',
    text: 'plain',
    filled: 'soft'
  }[variant] || defaultVariant;
}
var Checkbox = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var touchRippleRef = _ref.touchRippleRef,
    inputProps = _ref.inputProps,
    onChange = _ref.onChange,
    color = _ref.color,
    size = _ref.size,
    checked = _ref.checked,
    sx = _ref.sx,
    value = _ref.value,
    inputRef = _ref.inputRef,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_jsx(JoyCheckbox, _extends({}, props, {
    slotProps: {
      input: _extends({}, inputProps, {
        ref: inputRef
      })
    },
    ref: ref,
    checked: checked,
    onChange: onChange
  }));
});
var TextField = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
  var _props$InputProps, _props$inputProps;
  var onChange = _ref2.onChange,
    label = _ref2.label,
    placeholder = _ref2.placeholder,
    value = _ref2.value,
    inputRef = _ref2.inputRef,
    type = _ref2.type,
    size = _ref2.size,
    variant = _ref2.variant,
    props = _objectWithoutProperties(_ref2, _excluded2);
  var rootRef = useForkRef(ref, (_props$InputProps = props.InputProps) == null ? void 0 : _props$InputProps.ref);
  var inputForkRef = useForkRef(inputRef, props == null || (_props$inputProps = props.inputProps) == null ? void 0 : _props$inputProps.ref);
  var _ref3 = props.InputProps || {},
    startAdornment = _ref3.startAdornment,
    endAdornment = _ref3.endAdornment;
  return /*#__PURE__*/_jsxs(JoyFormControl, {
    ref: rootRef,
    children: [/*#__PURE__*/_jsx(JoyFormLabel, {
      children: label
    }), /*#__PURE__*/_jsx(JoyInput, {
      type: type,
      value: value,
      onChange: onChange,
      placeholder: placeholder,
      variant: convertVariant(variant, 'outlined'),
      size: convertSize(size),
      slotProps: {
        input: _extends({}, props == null ? void 0 : props.inputProps, {
          ref: inputForkRef
        })
      },
      startDecorator: startAdornment,
      endDecorator: endAdornment
    })]
  });
});
var Button = /*#__PURE__*/React.forwardRef(function Button(_ref4, ref) {
  var startIcon = _ref4.startIcon,
    color = _ref4.color,
    endIcon = _ref4.endIcon,
    size = _ref4.size,
    sx = _ref4.sx,
    variant = _ref4.variant,
    props = _objectWithoutProperties(_ref4, _excluded3);
  return /*#__PURE__*/_jsx(JoyButton, _extends({}, props, {
    size: convertSize(size),
    color: convertColor(color),
    variant: convertVariant(variant),
    ref: ref,
    startDecorator: startIcon,
    endDecorator: endIcon,
    sx: sx
  }));
});
var IconButton = /*#__PURE__*/React.forwardRef(function IconButton(_ref5, ref) {
  var _convertColor;
  var color = _ref5.color,
    size = _ref5.size,
    sx = _ref5.sx,
    touchRippleRef = _ref5.touchRippleRef,
    props = _objectWithoutProperties(_ref5, _excluded4);
  return /*#__PURE__*/_jsx(JoyIconButton, _extends({}, props, {
    size: convertSize(size),
    color: (_convertColor = convertColor(color)) != null ? _convertColor : 'neutral',
    variant: "plain",
    ref: ref,
    sx: sx
  }));
});
var Switch = /*#__PURE__*/React.forwardRef(function Switch(_ref6, ref) {
  var name = _ref6.name,
    checkedIcon = _ref6.checkedIcon,
    colorProp = _ref6.color,
    disableRipple = _ref6.disableRipple,
    disableFocusRipple = _ref6.disableFocusRipple,
    disableTouchRipple = _ref6.disableTouchRipple,
    edge = _ref6.edge,
    icon = _ref6.icon,
    inputProps = _ref6.inputProps,
    inputRef = _ref6.inputRef,
    size = _ref6.size,
    sx = _ref6.sx,
    onChange = _ref6.onChange,
    onClick = _ref6.onClick,
    props = _objectWithoutProperties(_ref6, _excluded5);
  return /*#__PURE__*/_jsx(JoySwitch, _extends({}, props, {
    onChange: onChange,
    size: convertSize(size),
    color: convertColor(colorProp),
    ref: ref,
    slotProps: {
      input: _extends({}, inputProps, {
        name: name,
        onClick: onClick,
        ref: inputRef
      }),
      thumb: {
        children: icon
      }
    },
    sx: [_extends({}, edge === 'start' && {
      ml: '-8px'
    }, edge === 'end' && {
      mr: '-8px'
    })].concat(_toConsumableArray(Array.isArray(sx) ? sx : [sx]))
  }));
});
var Select = /*#__PURE__*/React.forwardRef(function (_ref7, ref) {
  var open = _ref7.open,
    onOpen = _ref7.onOpen,
    value = _ref7.value,
    onChange = _ref7.onChange,
    size = _ref7.size,
    color = _ref7.color,
    variant = _ref7.variant,
    inputProps = _ref7.inputProps,
    MenuProps = _ref7.MenuProps,
    inputRef = _ref7.inputRef,
    error = _ref7.error,
    native = _ref7.native,
    fullWidth = _ref7.fullWidth,
    labelId = _ref7.labelId,
    props = _objectWithoutProperties(_ref7, _excluded6);
  var handleChange = function handleChange(event, newValue) {
    if (event && onChange) {
      // Same as in https://github.com/mui/material-ui/blob/e5558282a8f36856aef1299f3a36f3235e92e770/packages/mui-material/src/Select/SelectInput.js#L288-L300

      // Redefine target to allow name and value to be read.
      // This allows seamless integration with the most popular form libraries.
      // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
      // Clone the event to not override `target` of the original event.
      var nativeEvent = event.nativeEvent || event;
      // @ts-ignore The nativeEvent is function, not object
      var clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
      Object.defineProperty(clonedEvent, 'target', {
        writable: true,
        value: {
          value: newValue,
          name: props.name
        }
      });
      onChange(clonedEvent, null);
    }
  };
  return /*#__PURE__*/_jsx(JoySelect, _extends({}, props, {
    listboxOpen: open,
    onListboxOpenChange: function onListboxOpenChange(isOpen) {
      if (isOpen) {
        onOpen == null || onOpen({});
      } else {
        var _MenuProps$onClose;
        MenuProps == null || (_MenuProps$onClose = MenuProps.onClose) == null || _MenuProps$onClose.call(MenuProps, {}, undefined);
      }
    },
    size: convertSize(size),
    color: convertColor(color),
    variant: convertVariant(variant, 'outlined'),
    ref: ref,
    value: value,
    onChange: handleChange,
    slotProps: {
      button: {
        'aria-labelledby': labelId,
        ref: inputRef
      },
      listbox: {
        disablePortal: false,
        sx: {
          zIndex: 1350
        }
      }
    }
  }));
});
var Option = /*#__PURE__*/React.forwardRef(function (_ref8, ref) {
  var native = _ref8.native,
    props = _objectWithoutProperties(_ref8, _excluded7);
  return /*#__PURE__*/_jsx(JoyOption, _extends({}, props, {
    ref: ref
  }));
});
var InputLabel = /*#__PURE__*/React.forwardRef(function (_ref9, ref) {
  var shrink = _ref9.shrink,
    variant = _ref9.variant,
    sx = _ref9.sx,
    props = _objectWithoutProperties(_ref9, _excluded8);
  return /*#__PURE__*/_jsx(JoyFormLabel, _extends({}, props, {
    ref: ref,
    sx: sx
  }));
});
function labelDisplayedRows(_ref10) {
  var from = _ref10.from,
    to = _ref10.to,
    count = _ref10.count;
  return "".concat(from, "\u2013").concat(to, " of ").concat(count !== -1 ? count : "more than ".concat(to));
}
var getLabelDisplayedRowsTo = function getLabelDisplayedRowsTo(_ref11) {
  var page = _ref11.page,
    pageSize = _ref11.pageSize,
    rowCount = _ref11.rowCount;
  if (rowCount === -1) {
    return (page + 1) * pageSize;
  }
  return pageSize === -1 ? rowCount : Math.min(rowCount, (page + 1) * pageSize);
};
var Pagination = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var paginationModel = gridPaginationModelSelector(apiRef);
  var visibleTopLevelRowCount = gridFilteredTopLevelRowCountSelector(apiRef);
  var rowCount = React.useMemo(function () {
    var _ref12, _rootProps$rowCount;
    return (_ref12 = (_rootProps$rowCount = rootProps.rowCount) != null ? _rootProps$rowCount : visibleTopLevelRowCount) != null ? _ref12 : 0;
  }, [rootProps.rowCount, visibleTopLevelRowCount]);
  var lastPage = React.useMemo(function () {
    return Math.floor(rowCount / (paginationModel.pageSize || 1));
  }, [rowCount, paginationModel.pageSize]);
  var handlePageChange = React.useCallback(function (page) {
    apiRef.current.setPage(page);
  }, [apiRef]);
  var page = paginationModel.page <= lastPage ? paginationModel.page : lastPage;
  var pageSize = paginationModel.pageSize;
  var isPageSizeIncludedInPageSizeOptions = function isPageSizeIncludedInPageSizeOptions() {
    for (var i = 0; i < rootProps.pageSizeOptions.length; i += 1) {
      var option = rootProps.pageSizeOptions[i];
      if (typeof option === 'number') {
        if (option === pageSize) {
          return true;
        }
      } else if (option.value === pageSize) {
        return true;
      }
    }
    return false;
  };
  var pageSizeOptions = isPageSizeIncludedInPageSizeOptions() ? rootProps.pageSizeOptions : [];
  var handleChangeRowsPerPage = function handleChangeRowsPerPage(event, newValue) {
    var newPageSize = Number(newValue);
    apiRef.current.setPageSize(newPageSize);
  };
  return /*#__PURE__*/_jsxs(JoyBox, {
    sx: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      justifyContent: 'flex-end',
      px: 2
    },
    ref: ref,
    children: [/*#__PURE__*/_jsxs(JoyFormControl, {
      orientation: "horizontal",
      size: "sm",
      children: [/*#__PURE__*/_jsx(JoyFormLabel, {
        children: "Rows per page:"
      }), /*#__PURE__*/_jsx(JoySelect, {
        onChange: handleChangeRowsPerPage,
        value: pageSize,
        children: pageSizeOptions.map(function (option) {
          return /*#__PURE__*/_jsx(Option, {
            value: typeof option !== 'number' && option.value ? option.value : option,
            children: typeof option !== 'number' && option.label ? option.label : "".concat(option)
          }, typeof option !== 'number' && option.label ? option.label : "".concat(option));
        })
      })]
    }), /*#__PURE__*/_jsx(JoyTypography, {
      textAlign: "center",
      fontSize: "xs",
      fontWeight: "md",
      children: labelDisplayedRows({
        from: rowCount === 0 ? 0 : page * pageSize + 1,
        to: getLabelDisplayedRowsTo({
          page: page,
          pageSize: pageSize,
          rowCount: rowCount
        }),
        count: rowCount === -1 ? -1 : rowCount
      })
    }), /*#__PURE__*/_jsxs(JoyBox, {
      sx: {
        display: 'flex',
        gap: 0.5
      },
      children: [/*#__PURE__*/_jsx(JoyIconButton, {
        size: "sm",
        color: "neutral",
        variant: "outlined",
        disabled: page === 0,
        onClick: function onClick() {
          return handlePageChange(page - 1);
        },
        sx: {
          bgcolor: 'background.surface'
        },
        children: /*#__PURE__*/_jsx(GridKeyboardArrowLeft, {})
      }), /*#__PURE__*/_jsx(JoyIconButton, {
        size: "sm",
        color: "neutral",
        variant: "outlined",
        disabled: rowCount !== -1 ? page >= Math.ceil(rowCount / pageSize) - 1 : false,
        onClick: function onClick() {
          return handlePageChange(page + 1);
        },
        sx: {
          bgcolor: 'background.surface'
        },
        children: /*#__PURE__*/_jsx(GridKeyboardArrowRight, {})
      })]
    })]
  });
});
var LoadingOverlay = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/_jsx(GridOverlay, _extends({}, props, {
    ref: ref,
    children: /*#__PURE__*/_jsx(JoyCircularProgress, {})
  }));
});
var joySlots = _extends({}, joyIconSlots, {
  baseCheckbox: Checkbox,
  baseTextField: TextField,
  baseButton: Button,
  baseIconButton: IconButton,
  baseSwitch: Switch,
  baseSelect: Select,
  baseSelectOption: Option,
  baseInputLabel: InputLabel,
  baseFormControl: JoyFormControl,
  baseTooltip: JoyTooltip,
  pagination: Pagination,
  loadingOverlay: LoadingOverlay
});
export default joySlots;