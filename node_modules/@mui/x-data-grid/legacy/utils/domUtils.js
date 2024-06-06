import { gridClasses } from '../constants/gridClasses';
export function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
export function findParentElementFromClassName(elem, className) {
  return elem.closest(".".concat(className));
}
export function getRowEl(cell) {
  if (!cell) {
    return null;
  }
  return findParentElementFromClassName(cell, gridClasses.row);
}

// TODO remove
export function isGridCellRoot(elem) {
  return elem != null && elem.classList.contains(gridClasses.cell);
}
export function isGridHeaderCellRoot(elem) {
  return elem != null && elem.classList.contains(gridClasses.columnHeader);
}
function escapeOperandAttributeSelector(operand) {
  return operand.replace(/["\\]/g, '\\$&');
}
export function getGridColumnHeaderElement(root, field) {
  return root.querySelector("[role=\"columnheader\"][data-field=\"".concat(escapeOperandAttributeSelector(field), "\"]"));
}
function getGridRowElementSelector(id) {
  return ".".concat(gridClasses.row, "[data-id=\"").concat(escapeOperandAttributeSelector(String(id)), "\"]");
}
export function getGridRowElement(root, id) {
  return root.querySelector(getGridRowElementSelector(id));
}
export function getGridCellElement(root, _ref) {
  var id = _ref.id,
    field = _ref.field;
  var rowSelector = getGridRowElementSelector(id);
  var cellSelector = ".".concat(gridClasses.cell, "[data-field=\"").concat(escapeOperandAttributeSelector(field), "\"]");
  var selector = "".concat(rowSelector, " ").concat(cellSelector);
  return root.querySelector(selector);
}

// https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/
export var getActiveElement = function getActiveElement() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var activeEl = root.activeElement;
  if (!activeEl) {
    return null;
  }
  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }
  return activeEl;
};
export function isEventTargetInPortal(event) {
  if (
  // The target is not an element when triggered by a Select inside the cell
  // See https://github.com/mui/material-ui/issues/10534
  event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) {
    return true;
  }
  return false;
}