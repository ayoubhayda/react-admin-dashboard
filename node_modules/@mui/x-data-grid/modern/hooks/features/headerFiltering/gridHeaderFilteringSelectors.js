/* eslint-disable @typescript-eslint/naming-convention */
import { createSelector } from '../../../utils/createSelector';
export const unstable_gridHeaderFilteringStateSelector = state => state.headerFiltering;
export const unstable_gridHeaderFilteringEditFieldSelector = createSelector(unstable_gridHeaderFilteringStateSelector, headerFilteringState => headerFilteringState.editing);
export const unstable_gridHeaderFilteringMenuSelector = createSelector(unstable_gridHeaderFilteringStateSelector, headerFilteringState => headerFilteringState.menuOpen);