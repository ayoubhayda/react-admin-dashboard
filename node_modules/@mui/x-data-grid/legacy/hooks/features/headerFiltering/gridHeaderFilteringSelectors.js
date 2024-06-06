/* eslint-disable @typescript-eslint/naming-convention */
import { createSelector } from '../../../utils/createSelector';
export var unstable_gridHeaderFilteringStateSelector = function unstable_gridHeaderFilteringStateSelector(state) {
  return state.headerFiltering;
};
export var unstable_gridHeaderFilteringEditFieldSelector = createSelector(unstable_gridHeaderFilteringStateSelector, function (headerFilteringState) {
  return headerFilteringState.editing;
});
export var unstable_gridHeaderFilteringMenuSelector = createSelector(unstable_gridHeaderFilteringStateSelector, function (headerFilteringState) {
  return headerFilteringState.menuOpen;
});