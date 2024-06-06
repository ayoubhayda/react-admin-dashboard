import { GridStateCommunity } from '../../../models/gridStateCommunity';
/**
 * Get the columns state
 * @category Virtualization
 */
export declare const gridVirtualizationSelector: (state: GridStateCommunity) => import("./useGridVirtualization").GridVirtualizationState;
/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export declare const gridVirtualizationEnabledSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, boolean>;
/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export declare const gridVirtualizationColumnEnabledSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, boolean>;
