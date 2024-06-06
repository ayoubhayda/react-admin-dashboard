import { renderEditInputCell } from '../components/cell/GridEditInputCell';
import { gridStringOrNumberComparator } from '../hooks/features/sorting/gridSortingUtils';
import { getGridStringOperators, getGridStringQuickFilterFn } from './gridStringOperators';
import { convertQuickFilterV7ToLegacy } from './utils';

/**
 * TODO: Move pro and premium properties outside of this Community file
 */
export const GRID_STRING_COL_DEF = {
  width: 100,
  minWidth: 50,
  maxWidth: Infinity,
  hideable: true,
  sortable: true,
  resizable: true,
  filterable: true,
  groupable: true,
  pinnable: true,
  // @ts-ignore
  aggregable: true,
  editable: false,
  sortComparator: gridStringOrNumberComparator,
  type: 'string',
  align: 'left',
  filterOperators: getGridStringOperators(),
  renderEditCell: renderEditInputCell,
  getApplyQuickFilterFn: convertQuickFilterV7ToLegacy(getGridStringQuickFilterFn),
  getApplyQuickFilterFnV7: getGridStringQuickFilterFn
};