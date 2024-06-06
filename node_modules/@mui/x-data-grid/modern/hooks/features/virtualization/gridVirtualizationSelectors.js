import { createSelector } from '../../../utils/createSelector';
/**
 * Get the columns state
 * @category Virtualization
 */
export const gridVirtualizationSelector = state => state.virtualization;

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export const gridVirtualizationEnabledSelector = createSelector(gridVirtualizationSelector, state => state.enabled);

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export const gridVirtualizationColumnEnabledSelector = createSelector(gridVirtualizationSelector, state => state.enabledForColumns);