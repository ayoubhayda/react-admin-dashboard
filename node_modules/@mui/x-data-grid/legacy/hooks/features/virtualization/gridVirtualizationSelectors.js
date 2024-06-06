import { createSelector } from '../../../utils/createSelector';
/**
 * Get the columns state
 * @category Virtualization
 */
export var gridVirtualizationSelector = function gridVirtualizationSelector(state) {
  return state.virtualization;
};

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export var gridVirtualizationEnabledSelector = createSelector(gridVirtualizationSelector, function (state) {
  return state.enabled;
});

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export var gridVirtualizationColumnEnabledSelector = createSelector(gridVirtualizationSelector, function (state) {
  return state.enabledForColumns;
});