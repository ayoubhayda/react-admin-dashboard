import { svSE as svSECore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var svSEGrid = {
  // Root
  noRowsLabel: 'Inga rader',
  noResultsOverlayLabel: 'Inga resultat funna.',
  // Density selector toolbar button text
  toolbarDensity: 'Densitet',
  toolbarDensityLabel: 'Densitet',
  toolbarDensityCompact: 'Kompakt',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Luftig',
  // Columns selector toolbar button text
  toolbarColumns: 'Kolumner',
  toolbarColumnsLabel: 'Välj kolumner',
  // Filters toolbar button text
  toolbarFilters: 'Filter',
  toolbarFiltersLabel: 'Visa filter',
  toolbarFiltersTooltipHide: 'Dölj filter',
  toolbarFiltersTooltipShow: 'Visa filter',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktiva filter") : "".concat(count, " aktivt filter");
  },
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Sök…',
  toolbarQuickFilterLabel: 'Sök',
  toolbarQuickFilterDeleteIconLabel: 'Rensa',
  // Export selector toolbar button text
  toolbarExport: 'Exportera',
  toolbarExportLabel: 'Exportera',
  toolbarExportCSV: 'Ladda ner som CSV',
  toolbarExportPrint: 'Skriv ut',
  toolbarExportExcel: 'Ladda ner som Excel',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Hitta kolumn',
  columnsPanelTextFieldPlaceholder: 'Kolumntitel',
  columnsPanelDragIconLabel: 'Ordna om kolumnen',
  columnsPanelShowAllButton: 'Visa alla',
  columnsPanelHideAllButton: 'Dölj alla',
  // Filter panel text
  filterPanelAddFilter: 'Lägg till filter',
  filterPanelRemoveAll: 'Ta bort alla',
  filterPanelDeleteIconLabel: 'Ta bort',
  filterPanelLogicOperator: 'Logisk operator',
  filterPanelOperator: 'Operator',
  filterPanelOperatorAnd: 'Och',
  filterPanelOperatorOr: 'Eller',
  filterPanelColumns: 'Kolumner',
  filterPanelInputLabel: 'Värde',
  filterPanelInputPlaceholder: 'Filtervärde',
  // Filter operators text
  filterOperatorContains: 'innehåller',
  filterOperatorEquals: 'lika med',
  filterOperatorStartsWith: 'börjar med',
  filterOperatorEndsWith: 'slutar med',
  filterOperatorIs: 'är',
  filterOperatorNot: 'är inte',
  filterOperatorAfter: 'är efter',
  filterOperatorOnOrAfter: 'är på eller efter',
  filterOperatorBefore: 'är innan',
  filterOperatorOnOrBefore: 'är på eller innan',
  filterOperatorIsEmpty: 'är tom',
  filterOperatorIsNotEmpty: 'är inte tom',
  filterOperatorIsAnyOf: 'är någon av',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Innehåller',
  headerFilterOperatorEquals: 'Lika med',
  headerFilterOperatorStartsWith: 'Börjar med',
  headerFilterOperatorEndsWith: 'Slutar med',
  headerFilterOperatorIs: 'Är',
  headerFilterOperatorNot: 'Är inte',
  headerFilterOperatorAfter: 'Är efter',
  headerFilterOperatorOnOrAfter: 'Är på eller efter',
  headerFilterOperatorBefore: 'Är innan',
  headerFilterOperatorOnOrBefore: 'Är på eller innan',
  headerFilterOperatorIsEmpty: 'Är tom',
  headerFilterOperatorIsNotEmpty: 'Är inte tom',
  headerFilterOperatorIsAnyOf: 'Innehåller någon av',
  'headerFilterOperator=': 'Lika med',
  'headerFilterOperator!=': 'Inte lika med',
  'headerFilterOperator>': 'Större än',
  'headerFilterOperator>=': 'Större eller lika med',
  'headerFilterOperator<': 'Mindre än',
  'headerFilterOperator<=': 'Mindre eller lika med',
  // Filter values text
  filterValueAny: 'något',
  filterValueTrue: 'sant',
  filterValueFalse: 'falskt',
  // Column menu text
  columnMenuLabel: 'Meny',
  columnMenuShowColumns: 'Visa kolumner',
  columnMenuManageColumns: 'Hantera kolumner',
  columnMenuFilter: 'Filtrera',
  columnMenuHideColumn: 'Dölj',
  columnMenuUnsort: 'Ta bort sortering',
  columnMenuSortAsc: 'Sortera stigande',
  columnMenuSortDesc: 'Sortera fallande',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktiva filter") : "".concat(count, " aktivt filter");
  },
  columnHeaderFiltersLabel: 'Visa filter',
  columnHeaderSortIconLabel: 'Sortera',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "".concat(count.toLocaleString(), " rader markerade") : "".concat(count.toLocaleString(), " rad markerad");
  },
  // Total row amount footer text
  footerTotalRows: 'Totalt antal rader:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " av ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Markering med kryssruta',
  checkboxSelectionSelectAllRows: 'Markera alla rader',
  checkboxSelectionUnselectAllRows: 'Avmarkera alla rader',
  checkboxSelectionSelectRow: 'Markera rad',
  checkboxSelectionUnselectRow: 'Avmarkera rad',
  // Boolean cell text
  booleanCellTrueLabel: 'ja',
  booleanCellFalseLabel: 'nej',
  // Actions cell more text
  actionsCellMore: 'mer',
  // Column pinning text
  pinToLeft: 'Fäst till vänster',
  pinToRight: 'Fäst till höger',
  unpin: 'Ta bort fästning',
  // Tree Data
  treeDataGroupingHeaderName: 'Grupp',
  treeDataExpand: 'visa underordnade',
  treeDataCollapse: 'dölj underordnade',
  // Grouping columns
  groupingColumnHeaderName: 'Grupp',
  groupColumn: function groupColumn(name) {
    return "Gruppera efter ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "Sluta gruppera efter ".concat(name);
  },
  // Master/detail
  detailPanelToggle: 'Växla detaljpanel',
  expandDetailPanel: 'Expandera',
  collapseDetailPanel: 'Kollapsa',
  // Row reordering text
  rowReorderingHeaderName: 'Ordna om rader',
  // Aggregation
  aggregationMenuItemHeader: 'Aggregering',
  aggregationFunctionLabelSum: 'summa',
  aggregationFunctionLabelAvg: 'medel',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'antal'
};
export var svSE = getGridLocalization(svSEGrid, svSECore);