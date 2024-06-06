"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unstable_gridTabIndexColumnHeaderFilterSelector = exports.unstable_gridTabIndexColumnGroupHeaderSelector = exports.unstable_gridFocusColumnHeaderFilterSelector = exports.unstable_gridFocusColumnGroupHeaderSelector = exports.gridTabIndexStateSelector = exports.gridTabIndexColumnHeaderSelector = exports.gridTabIndexCellSelector = exports.gridFocusStateSelector = exports.gridFocusColumnHeaderSelector = exports.gridFocusCellSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
const gridFocusStateSelector = state => state.focus;
exports.gridFocusStateSelector = gridFocusStateSelector;
const gridFocusCellSelector = exports.gridFocusCellSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.cell);
const gridFocusColumnHeaderSelector = exports.gridFocusColumnHeaderSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.columnHeader);

// eslint-disable-next-line @typescript-eslint/naming-convention
const unstable_gridFocusColumnHeaderFilterSelector = exports.unstable_gridFocusColumnHeaderFilterSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.columnHeaderFilter);

// eslint-disable-next-line @typescript-eslint/naming-convention
const unstable_gridFocusColumnGroupHeaderSelector = exports.unstable_gridFocusColumnGroupHeaderSelector = (0, _createSelector.createSelector)(gridFocusStateSelector, focusState => focusState.columnGroupHeader);
const gridTabIndexStateSelector = state => state.tabIndex;
exports.gridTabIndexStateSelector = gridTabIndexStateSelector;
const gridTabIndexCellSelector = exports.gridTabIndexCellSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.cell);
const gridTabIndexColumnHeaderSelector = exports.gridTabIndexColumnHeaderSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.columnHeader);

// eslint-disable-next-line @typescript-eslint/naming-convention
const unstable_gridTabIndexColumnHeaderFilterSelector = exports.unstable_gridTabIndexColumnHeaderFilterSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.columnHeaderFilter);

// eslint-disable-next-line @typescript-eslint/naming-convention
const unstable_gridTabIndexColumnGroupHeaderSelector = exports.unstable_gridTabIndexColumnGroupHeaderSelector = (0, _createSelector.createSelector)(gridTabIndexStateSelector, state => state.columnGroupHeader);