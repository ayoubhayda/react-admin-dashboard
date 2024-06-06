import _extends from "@babel/runtime/helpers/esm/extends";
import { GridSkeletonCell, GridColumnsPanel, GridFilterPanel, GridFooter, GridLoadingOverlay, GridNoRowsOverlay, GridPagination, GridPanel, GridPreferencesPanel, GridRow, GridColumnHeaderFilterIconButton, GridRowCount } from '../components';
import { GridCellV7 } from '../components/cell/GridCell';
import { GridColumnHeaders } from '../components/GridColumnHeaders';
import { GridColumnMenu } from '../components/menu/columnMenu/GridColumnMenu';
import { GridNoResultsOverlay } from '../components/GridNoResultsOverlay';
import materialSlots from '../material';

// TODO: camelCase these key. It's a private helper now.
// Remove then need to call `uncapitalizeObjectKeys`.
export var DATA_GRID_DEFAULT_SLOTS_COMPONENTS = _extends({}, materialSlots, {
  Cell: GridCellV7,
  SkeletonCell: GridSkeletonCell,
  ColumnHeaderFilterIconButton: GridColumnHeaderFilterIconButton,
  ColumnMenu: GridColumnMenu,
  ColumnHeaders: GridColumnHeaders,
  Footer: GridFooter,
  FooterRowCount: GridRowCount,
  Toolbar: null,
  PreferencesPanel: GridPreferencesPanel,
  LoadingOverlay: GridLoadingOverlay,
  NoResultsOverlay: GridNoResultsOverlay,
  NoRowsOverlay: GridNoRowsOverlay,
  Pagination: GridPagination,
  FilterPanel: GridFilterPanel,
  ColumnsPanel: GridColumnsPanel,
  Panel: GridPanel,
  Row: GridRow
});