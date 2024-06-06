import { gridVisibleColumnDefinitionsSelector } from '../features/columns/gridColumnsSelector';
import { useGridSelector } from './useGridSelector';
import { useGridRootProps } from './useGridRootProps';
import { gridColumnGroupsHeaderMaxDepthSelector } from '../features/columnGrouping/gridColumnGroupsSelector';
import { gridPinnedRowsCountSelector, gridRowCountSelector } from '../features/rows/gridRowsSelector';
import { useGridPrivateApiContext } from './useGridPrivateApiContext';
export var useGridAriaAttributes = function useGridAriaAttributes() {
  var _rootProps$experiment;
  var apiRef = useGridPrivateApiContext();
  var rootProps = useGridRootProps();
  var visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  var totalRowCount = useGridSelector(apiRef, gridRowCountSelector);
  var headerGroupingMaxDepth = useGridSelector(apiRef, gridColumnGroupsHeaderMaxDepthSelector);
  var pinnedRowsCount = useGridSelector(apiRef, gridPinnedRowsCountSelector);
  var role = 'grid';
  if ((_rootProps$experiment = rootProps.experimentalFeatures) != null && _rootProps$experiment.ariaV7 && rootProps.treeData) {
    role = 'treegrid';
  }
  return {
    role: role,
    'aria-colcount': visibleColumns.length,
    'aria-rowcount': headerGroupingMaxDepth + 1 + pinnedRowsCount + totalRowCount,
    'aria-multiselectable': !rootProps.disableMultipleRowSelection
  };
};