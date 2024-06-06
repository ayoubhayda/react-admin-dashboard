import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["sx", "fontSize"],
  _excluded2 = ["sortingOrder"];
/**
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT).
 * All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
 * provided that the above copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
 * INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
 * FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
 * OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
 * ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
import * as React from 'react';
import SvgIcon from '@mui/joy/SvgIcon';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function createSvgIcon(path, displayName) {
  var fontSizeMap = {
    small: 'lg',
    medium: 'xl',
    large: 'xl2',
    inherit: undefined
  };
  // @ts-ignore internal component
  function Component(_ref, ref) {
    var sx = _ref.sx,
      fontSize = _ref.fontSize,
      props = _objectWithoutProperties(_ref, _excluded);
    return /*#__PURE__*/_jsx(SvgIcon, _extends({
      "data-testid": "".concat(displayName, "Icon"),
      ref: ref,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      sx: [{
        fill: 'none'
      }].concat(_toConsumableArray(Array.isArray(sx) ? sx : [sx])),
      fontSize: fontSize ? fontSizeMap[fontSize] : undefined
    }, props, {
      children: path
    }));
  }
  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = "".concat(displayName, "Icon");
  }

  // @ts-ignore internal component
  Component.muiName = SvgIcon.muiName;

  // @ts-ignore internal component
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}
export var GridArrowUpwardIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("line", {
    x1: "12",
    x2: "12",
    y1: "19",
    y2: "5"
  }), /*#__PURE__*/_jsx("polyline", {
    points: "5 12 12 5 19 12"
  })]
}), 'ArrowUpward');
export var GridArrowDownwardIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("line", {
    x1: "12",
    x2: "12",
    y1: "5",
    y2: "19"
  }), /*#__PURE__*/_jsx("polyline", {
    points: "19 12 12 19 5 12"
  })]
}), 'ArrowDownward');
export var GridKeyboardArrowLeft = createSvgIcon( /*#__PURE__*/_jsx("polyline", {
  points: "15 18 9 12 15 6"
}), 'KeyboardArrowLeft');
export var GridKeyboardArrowRight = createSvgIcon( /*#__PURE__*/_jsx("polyline", {
  points: "9 18 15 12 9 6"
}), 'KeyboardArrowRight');
export var GridExpandMoreIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("path", {
    d: "m7 15 5 5 5-5"
  }), /*#__PURE__*/_jsx("path", {
    d: "m7 9 5-5 5 5"
  })]
}), 'ExpandMore');
export var GridFilterListIcon = createSvgIcon( /*#__PURE__*/_jsx("polygon", {
  points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
}), 'FilterList');
export var GridFilterAltIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/_jsx("path", {
    d: "M7 12h10"
  }), /*#__PURE__*/_jsx("path", {
    d: "M10 18h4"
  })]
}), 'FilterAlt');
export var GridSearchIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/_jsx("line", {
    x1: "21",
    x2: "16.65",
    y1: "21",
    y2: "16.65"
  })]
}), 'Search');
export var GridMenuIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/_jsx("path", {
    d: "M7 8h10"
  }), /*#__PURE__*/_jsx("path", {
    d: "M7 12h10"
  }), /*#__PURE__*/_jsx("path", {
    d: "M7 16h10"
  })]
}), 'Menu');
export var GridCheckCircleIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), /*#__PURE__*/_jsx("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })]
}), 'CheckCircle');
export var GridColumnIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "3",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/_jsx("line", {
    x1: "12",
    x2: "12",
    y1: "3",
    y2: "21"
  })]
}), 'ColumnIcon');
export var GridSeparatorIcon = createSvgIcon( /*#__PURE__*/_jsx("path", {
  d: "M11 19V5h2v14z"
}), 'Separator');
export var GridViewHeadlineIcon = createSvgIcon( /*#__PURE__*/_jsx("path", {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  d: "M3 12h18M3 12v4.5M3 12V7.5M21 12v4.5m0-4.5V7.5m-18 9v3.9a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6v-3.9m-18 0h18m0-9V3.6a.6.6 0 0 0-.6-.6H3.6a.6.6 0 0 0-.6.6v3.9m18 0H3"
}), 'ViewHeadline');
export var GridTableRowsIcon = createSvgIcon( /*#__PURE__*/_jsx("path", {
  fill: "currentColor",
  strokeWidth: "0",
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h14zm0 5v4H5v-4h14zM5 19v-3h14v3H5z"
}), 'TableRows');
export var GridViewStreamIcon = createSvgIcon( /*#__PURE__*/_jsx("path", {
  d: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 6h16"
}), 'ViewStream');
export var GridTripleDotsVerticalIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "19",
    r: "1"
  })]
}), 'TripleDotsVertical');
export var GridCloseIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/_jsx("line", {
    x1: "15",
    x2: "9",
    y1: "9",
    y2: "15"
  }), /*#__PURE__*/_jsx("line", {
    x1: "9",
    x2: "15",
    y1: "9",
    y2: "15"
  })]
}), 'Close');
export var GridAddIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/_jsx("line", {
    x1: "12",
    x2: "12",
    y1: "8",
    y2: "16"
  }), /*#__PURE__*/_jsx("line", {
    x1: "8",
    x2: "16",
    y1: "12",
    y2: "12"
  })]
}), 'Add');
export var GridRemoveIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/_jsx("line", {
    x1: "15",
    x2: "9",
    y1: "9",
    y2: "15"
  }), /*#__PURE__*/_jsx("line", {
    x1: "9",
    x2: "15",
    y1: "9",
    y2: "15"
  })]
}), 'Remove');
export var GridLoadIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/_jsx("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/_jsx("line", {
    x1: "12",
    x2: "12",
    y1: "15",
    y2: "3"
  })]
}), 'Load');
export var GridDragIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("circle", {
    cx: "9",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "9",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "9",
    cy: "19",
    r: "1"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "15",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "15",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "15",
    cy: "19",
    r: "1"
  })]
}), 'Drag');
export var GridSaveAltIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("path", {
    d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
  }), /*#__PURE__*/_jsx("polyline", {
    points: "14 2 14 8 20 8"
  }), /*#__PURE__*/_jsx("path", {
    d: "M12 12v6"
  }), /*#__PURE__*/_jsx("path", {
    d: "m15 15-3-3-3 3"
  })]
}), 'SaveAlt');
export var GridCheckIcon = createSvgIcon( /*#__PURE__*/_jsx("polyline", {
  points: "20 6 9 17 4 12"
}), 'Check');
export var GridMoreVertIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/_jsx("circle", {
    cx: "12",
    cy: "19",
    r: "1"
  })]
}), 'MoreVert');
export var GridVisibilityOffIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("path", {
    d: "M9.88 9.88a3 3 0 1 0 4.24 4.24"
  }), /*#__PURE__*/_jsx("path", {
    d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
  }), /*#__PURE__*/_jsx("path", {
    d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
  }), /*#__PURE__*/_jsx("line", {
    x1: "2",
    x2: "22",
    y1: "2",
    y2: "22"
  })]
}), 'VisibilityOff');
export var GridViewColumnIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("rect", {
    width: "6",
    height: "20",
    x: "4",
    y: "2",
    rx: "2"
  }), /*#__PURE__*/_jsx("rect", {
    width: "6",
    height: "20",
    x: "14",
    y: "2",
    rx: "2"
  })]
}), 'ViewColumn');
export var GridClearIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("path", {
    d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"
  }), /*#__PURE__*/_jsx("path", {
    d: "M22 21H7"
  }), /*#__PURE__*/_jsx("path", {
    d: "m5 11 9 9"
  })]
}), 'Clear');
export var GridDeleteIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/_jsx("path", {
    d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
  }), /*#__PURE__*/_jsx("path", {
    d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
  }), /*#__PURE__*/_jsx("line", {
    x1: "10",
    x2: "10",
    y1: "11",
    y2: "17"
  }), /*#__PURE__*/_jsx("line", {
    x1: "14",
    x2: "14",
    y1: "11",
    y2: "17"
  })]
}), 'Delete');
export var GridDeleteForeverIcon = createSvgIcon( /*#__PURE__*/_jsxs(React.Fragment, {
  children: [/*#__PURE__*/_jsx("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/_jsx("path", {
    d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
  }), /*#__PURE__*/_jsx("path", {
    d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
  }), /*#__PURE__*/_jsx("line", {
    x1: "10",
    x2: "10",
    y1: "11",
    y2: "17"
  }), /*#__PURE__*/_jsx("line", {
    x1: "14",
    x2: "14",
    y1: "11",
    y2: "17"
  })]
}), 'Delete');
var GridColumnUnsortedIcon = /*#__PURE__*/React.memo(function GridColumnHeaderSortIcon(props) {
  var sortingOrder = props.sortingOrder,
    other = _objectWithoutProperties(props, _excluded2);
  var rootProps = useGridRootProps();
  var _sortingOrder = _slicedToArray(sortingOrder, 1),
    nextSortDirection = _sortingOrder[0];
  var Icon = nextSortDirection === 'asc' ? rootProps.slots.columnSortedAscendingIcon : rootProps.slots.columnSortedDescendingIcon;
  return Icon ? /*#__PURE__*/_jsx(Icon, _extends({}, other)) : null;
});
var joyIconSlots = {
  booleanCellTrueIcon: GridCheckIcon,
  booleanCellFalseIcon: GridCloseIcon,
  columnMenuIcon: GridTripleDotsVerticalIcon,
  openFilterButtonIcon: GridFilterListIcon,
  filterPanelDeleteIcon: GridCloseIcon,
  columnFilteredIcon: GridFilterAltIcon,
  columnSelectorIcon: GridColumnIcon,
  columnUnsortedIcon: GridColumnUnsortedIcon,
  columnSortedAscendingIcon: GridArrowUpwardIcon,
  columnSortedDescendingIcon: GridArrowDownwardIcon,
  columnResizeIcon: GridSeparatorIcon,
  densityCompactIcon: GridViewHeadlineIcon,
  densityStandardIcon: GridTableRowsIcon,
  densityComfortableIcon: GridViewStreamIcon,
  exportIcon: GridSaveAltIcon,
  moreActionsIcon: GridMoreVertIcon,
  treeDataCollapseIcon: GridExpandMoreIcon,
  treeDataExpandIcon: GridKeyboardArrowRight,
  groupingCriteriaCollapseIcon: GridExpandMoreIcon,
  groupingCriteriaExpandIcon: GridKeyboardArrowRight,
  detailPanelExpandIcon: GridAddIcon,
  detailPanelCollapseIcon: GridRemoveIcon,
  rowReorderIcon: GridDragIcon,
  quickFilterIcon: GridSearchIcon,
  quickFilterClearIcon: GridCloseIcon,
  columnMenuHideIcon: GridVisibilityOffIcon,
  columnMenuSortAscendingIcon: GridArrowUpwardIcon,
  columnMenuSortDescendingIcon: GridArrowDownwardIcon,
  columnMenuFilterIcon: GridFilterAltIcon,
  columnMenuManageColumnsIcon: GridViewColumnIcon,
  columnMenuClearIcon: GridClearIcon,
  loadIcon: GridLoadIcon,
  filterPanelAddIcon: GridAddIcon,
  filterPanelRemoveAllIcon: GridDeleteForeverIcon,
  columnReorderIcon: GridDragIcon
};
export default joyIconSlots;