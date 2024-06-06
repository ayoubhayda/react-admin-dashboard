"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridVirtualizationSelector = exports.gridVirtualizationEnabledSelector = exports.gridVirtualizationColumnEnabledSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
/**
 * Get the columns state
 * @category Virtualization
 */
const gridVirtualizationSelector = state => state.virtualization;

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
exports.gridVirtualizationSelector = gridVirtualizationSelector;
const gridVirtualizationEnabledSelector = exports.gridVirtualizationEnabledSelector = (0, _createSelector.createSelector)(gridVirtualizationSelector, state => state.enabled);

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
const gridVirtualizationColumnEnabledSelector = exports.gridVirtualizationColumnEnabledSelector = (0, _createSelector.createSelector)(gridVirtualizationSelector, state => state.enabledForColumns);