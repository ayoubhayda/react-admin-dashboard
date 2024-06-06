"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findParentElementFromClassName = findParentElementFromClassName;
exports.getActiveElement = void 0;
exports.getGridCellElement = getGridCellElement;
exports.getGridColumnHeaderElement = getGridColumnHeaderElement;
exports.getGridRowElement = getGridRowElement;
exports.getRowEl = getRowEl;
exports.isEventTargetInPortal = isEventTargetInPortal;
exports.isGridCellRoot = isGridCellRoot;
exports.isGridHeaderCellRoot = isGridHeaderCellRoot;
exports.isOverflown = isOverflown;
var _gridClasses = require("../constants/gridClasses");
function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
function findParentElementFromClassName(elem, className) {
  return elem.closest(`.${className}`);
}
function getRowEl(cell) {
  if (!cell) {
    return null;
  }
  return findParentElementFromClassName(cell, _gridClasses.gridClasses.row);
}

// TODO remove
function isGridCellRoot(elem) {
  return elem != null && elem.classList.contains(_gridClasses.gridClasses.cell);
}
function isGridHeaderCellRoot(elem) {
  return elem != null && elem.classList.contains(_gridClasses.gridClasses.columnHeader);
}
function escapeOperandAttributeSelector(operand) {
  return operand.replace(/["\\]/g, '\\$&');
}
function getGridColumnHeaderElement(root, field) {
  return root.querySelector(`[role="columnheader"][data-field="${escapeOperandAttributeSelector(field)}"]`);
}
function getGridRowElementSelector(id) {
  return `.${_gridClasses.gridClasses.row}[data-id="${escapeOperandAttributeSelector(String(id))}"]`;
}
function getGridRowElement(root, id) {
  return root.querySelector(getGridRowElementSelector(id));
}
function getGridCellElement(root, {
  id,
  field
}) {
  const rowSelector = getGridRowElementSelector(id);
  const cellSelector = `.${_gridClasses.gridClasses.cell}[data-field="${escapeOperandAttributeSelector(field)}"]`;
  const selector = `${rowSelector} ${cellSelector}`;
  return root.querySelector(selector);
}

// https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/
const getActiveElement = (root = document) => {
  const activeEl = root.activeElement;
  if (!activeEl) {
    return null;
  }
  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }
  return activeEl;
};
exports.getActiveElement = getActiveElement;
function isEventTargetInPortal(event) {
  if (
  // The target is not an element when triggered by a Select inside the cell
  // See https://github.com/mui/material-ui/issues/10534
  event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) {
    return true;
  }
  return false;
}