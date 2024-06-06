import { daDK as daDKCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var daDKGrid = {
  // Root
  noRowsLabel: 'Ingen rækker',
  noResultsOverlayLabel: 'Ingen resultater',
  // Density selector toolbar button text
  toolbarDensity: 'Tæthed',
  toolbarDensityLabel: 'Tæthed',
  toolbarDensityCompact: 'Kompakt',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Luftig',
  // Columns selector toolbar button text
  toolbarColumns: 'Kolonner',
  toolbarColumnsLabel: 'Vælg kolonner',
  // Filters toolbar button text
  toolbarFilters: 'Filtre',
  toolbarFiltersLabel: 'Vis filtre',
  toolbarFiltersTooltipHide: 'Skjul filtre',
  toolbarFiltersTooltipShow: 'Vis filtre',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktive filtre") : "".concat(count, " aktivt filter");
  },
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Søg…',
  toolbarQuickFilterLabel: 'Søg',
  toolbarQuickFilterDeleteIconLabel: 'Ryd',
  // Export selector toolbar button text
  toolbarExport: 'Eksport',
  toolbarExportLabel: 'Eksporter',
  toolbarExportCSV: 'Download som CSV',
  toolbarExportPrint: 'Print',
  toolbarExportExcel: 'Download som Excel',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Find kolonne',
  columnsPanelTextFieldPlaceholder: 'Kolonne titel',
  columnsPanelDragIconLabel: 'Reorder kolonne',
  columnsPanelShowAllButton: 'Vis alle',
  columnsPanelHideAllButton: 'Skjul alle',
  // Filter panel text
  filterPanelAddFilter: 'Tilføj filter',
  filterPanelRemoveAll: 'Fjern alle',
  filterPanelDeleteIconLabel: 'Slet',
  filterPanelLogicOperator: 'Logisk operator',
  filterPanelOperator: 'Operator',
  filterPanelOperatorAnd: 'Og',
  filterPanelOperatorOr: 'Eller',
  filterPanelColumns: 'Kolonner',
  filterPanelInputLabel: 'Værdi',
  filterPanelInputPlaceholder: 'Filterværdi',
  // Filter operators text
  filterOperatorContains: 'indeholder',
  filterOperatorEquals: 'lig med',
  filterOperatorStartsWith: 'begynder med',
  filterOperatorEndsWith: 'ender med',
  filterOperatorIs: 'er lig med',
  filterOperatorNot: 'er ikke lig med',
  filterOperatorAfter: 'efter',
  filterOperatorOnOrAfter: 'på eller efter',
  filterOperatorBefore: 'før',
  filterOperatorOnOrBefore: 'på eller før',
  filterOperatorIsEmpty: 'indeholder ikke data',
  filterOperatorIsNotEmpty: 'indeholder data',
  filterOperatorIsAnyOf: 'indeholder en af',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Indeholder',
  headerFilterOperatorEquals: 'Lig med',
  headerFilterOperatorStartsWith: 'Begynder med',
  headerFilterOperatorEndsWith: 'Ender med',
  headerFilterOperatorIs: 'Er lig med',
  headerFilterOperatorNot: 'Er ikke lig med',
  headerFilterOperatorAfter: 'Efter',
  headerFilterOperatorOnOrAfter: 'På eller efter',
  headerFilterOperatorBefore: 'Før',
  headerFilterOperatorOnOrBefore: 'På eller før',
  headerFilterOperatorIsEmpty: 'Indeholder ikke data',
  headerFilterOperatorIsNotEmpty: 'Indeholder data',
  headerFilterOperatorIsAnyOf: 'Indeholder en af',
  'headerFilterOperator=': 'Lig med',
  'headerFilterOperator!=': 'Ikke lig med',
  'headerFilterOperator>': 'Større end',
  'headerFilterOperator>=': 'Større end eller lig med',
  'headerFilterOperator<': 'Mindre end',
  'headerFilterOperator<=': 'Mindre end eller lig med',
  // Filter values text
  filterValueAny: 'hvilken som helst',
  filterValueTrue: 'positiv',
  filterValueFalse: 'negativ',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Vis kolonner',
  columnMenuManageColumns: 'Administrer kolonner',
  columnMenuFilter: 'Filtrer',
  columnMenuHideColumn: 'Skjul kolonne',
  columnMenuUnsort: 'Fjern sortering',
  columnMenuSortAsc: 'Sorter stigende',
  columnMenuSortDesc: 'Sorter faldende',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktive filtre") : "\xC9t aktivt filter";
  },
  columnHeaderFiltersLabel: 'Vis filtre',
  columnHeaderSortIconLabel: 'Sorter',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "".concat(count.toLocaleString(), " r\xE6kker valgt") : "\xC9n r\xE6kke valgt";
  },
  // Total row amount footer text
  footerTotalRows: 'Antal rækker i alt:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " af ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Afkrydsningsvalg',
  checkboxSelectionSelectAllRows: 'Vælg alle rækker',
  checkboxSelectionUnselectAllRows: 'Fravælg alle rækker',
  checkboxSelectionSelectRow: 'Vælg række',
  checkboxSelectionUnselectRow: 'Fravælg række',
  // Boolean cell text
  booleanCellTrueLabel: 'ja',
  booleanCellFalseLabel: 'nej',
  // Actions cell more text
  actionsCellMore: 'mere',
  // Column pinning text
  pinToLeft: 'Fastgør til venstre',
  pinToRight: 'Fastgør til højre',
  unpin: 'Frigiv',
  // Tree Data
  treeDataGroupingHeaderName: 'Gruppe',
  treeDataExpand: 'Vis underelementer',
  treeDataCollapse: 'Skjul underelementer',
  // Grouping columns
  groupingColumnHeaderName: 'Gruppe',
  groupColumn: function groupColumn(name) {
    return "Grupp\xE9r efter ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "Fjern gruppering efter ".concat(name);
  },
  // Master/detail
  detailPanelToggle: 'Udvid/kollaps detaljepanel',
  expandDetailPanel: 'Udvid',
  collapseDetailPanel: 'Kollaps',
  // Row reordering text
  rowReorderingHeaderName: 'Omarrangering af rækker',
  // Aggregation
  aggregationMenuItemHeader: 'Aggregering',
  aggregationFunctionLabelSum: 'sum',
  aggregationFunctionLabelAvg: 'gns',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'størrelse'
};
export var daDK = getGridLocalization(daDKGrid, daDKCore);