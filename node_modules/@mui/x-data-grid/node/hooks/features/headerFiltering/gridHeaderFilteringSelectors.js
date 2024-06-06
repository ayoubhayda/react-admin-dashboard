"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unstable_gridHeaderFilteringStateSelector = exports.unstable_gridHeaderFilteringMenuSelector = exports.unstable_gridHeaderFilteringEditFieldSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
/* eslint-disable @typescript-eslint/naming-convention */

const unstable_gridHeaderFilteringStateSelector = state => state.headerFiltering;
exports.unstable_gridHeaderFilteringStateSelector = unstable_gridHeaderFilteringStateSelector;
const unstable_gridHeaderFilteringEditFieldSelector = exports.unstable_gridHeaderFilteringEditFieldSelector = (0, _createSelector.createSelector)(unstable_gridHeaderFilteringStateSelector, headerFilteringState => headerFilteringState.editing);
const unstable_gridHeaderFilteringMenuSelector = exports.unstable_gridHeaderFilteringMenuSelector = (0, _createSelector.createSelector)(unstable_gridHeaderFilteringStateSelector, headerFilteringState => headerFilteringState.menuOpen);