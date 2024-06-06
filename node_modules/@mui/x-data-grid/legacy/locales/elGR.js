import { elGR as elGRCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var elGRGrid = {
  // Root
  noRowsLabel: 'Δεν υπάρχουν καταχωρήσεις',
  noResultsOverlayLabel: 'Δεν βρέθηκαν αποτελέσματα.',
  // Density selector toolbar button text
  toolbarDensity: 'Ύψος σειράς',
  toolbarDensityLabel: 'Ύψος σειράς',
  toolbarDensityCompact: 'Συμπαγής',
  toolbarDensityStandard: 'Προκαθορισμένο',
  toolbarDensityComfortable: 'Πλατύ',
  // Columns selector toolbar button text
  toolbarColumns: 'Στήλες',
  toolbarColumnsLabel: 'Επιλέξτε στήλες',
  // Filters toolbar button text
  toolbarFilters: 'Φίλτρα',
  toolbarFiltersLabel: 'Εμφάνιση φίλτρων',
  toolbarFiltersTooltipHide: 'Απόκρυψη φίλτρων',
  toolbarFiltersTooltipShow: 'Εμφάνιση φίλτρων',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " \u03B5\u03BD\u03B5\u03C1\u03B3\u03AC \u03C6\u03AF\u03BB\u03C4\u03C1\u03B1") : "".concat(count, " \u03B5\u03BD\u03B5\u03C1\u03B3\u03CC \u03C6\u03AF\u03BB\u03C4\u03C1\u03BF");
  },
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Αναζήτηση…',
  toolbarQuickFilterLabel: 'Αναζήτηση',
  toolbarQuickFilterDeleteIconLabel: 'Καθαρισμός',
  // Export selector toolbar button text
  toolbarExport: 'Εξαγωγή',
  toolbarExportLabel: 'Εξαγωγή',
  toolbarExportCSV: 'Λήψη ως CSV',
  toolbarExportPrint: 'Εκτύπωση',
  toolbarExportExcel: 'Λήψη ως Excel',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Εύρεση στήλης',
  columnsPanelTextFieldPlaceholder: 'Επικεφαλίδα στήλης',
  columnsPanelDragIconLabel: 'Αναδιάταξη στήλης',
  columnsPanelShowAllButton: 'Προβολή όλων',
  columnsPanelHideAllButton: 'Απόκρυψη όλων',
  // Filter panel text
  filterPanelAddFilter: 'Προσθήκη φίλτρου',
  filterPanelRemoveAll: 'Αφαίρεση όλων',
  filterPanelDeleteIconLabel: 'Διαγραφή',
  filterPanelLogicOperator: 'Λογικός τελεστής',
  filterPanelOperator: 'Τελεστές',
  filterPanelOperatorAnd: 'Καί',
  filterPanelOperatorOr: 'Ή',
  filterPanelColumns: 'Στήλες',
  filterPanelInputLabel: 'Τιμή',
  filterPanelInputPlaceholder: 'Τιμή φίλτρου',
  // Filter operators text
  filterOperatorContains: 'περιέχει',
  filterOperatorEquals: 'ισούται',
  filterOperatorStartsWith: 'ξεκινάει με',
  filterOperatorEndsWith: 'τελειώνει με',
  filterOperatorIs: 'είναι',
  filterOperatorNot: 'δεν είναι',
  filterOperatorAfter: 'είναι μετά',
  filterOperatorOnOrAfter: 'είναι ίσο ή μετά',
  filterOperatorBefore: 'είναι πριν',
  filterOperatorOnOrBefore: 'είναι ίσο ή πριν',
  filterOperatorIsEmpty: 'είναι κενό',
  filterOperatorIsNotEmpty: 'δεν είναι κενό',
  filterOperatorIsAnyOf: 'είναι οποιοδήποτε από',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: 'Περιέχει',
  headerFilterOperatorEquals: 'Ισούται',
  headerFilterOperatorStartsWith: 'Ξεκινάει με',
  headerFilterOperatorEndsWith: 'Τελειώνει με',
  headerFilterOperatorIs: 'Είναι',
  headerFilterOperatorNot: 'Δεν είναι',
  headerFilterOperatorAfter: 'Είναι μετά',
  headerFilterOperatorOnOrAfter: 'Είναι ίσο ή μετά',
  headerFilterOperatorBefore: 'Είναι πριν',
  headerFilterOperatorOnOrBefore: 'Είναι ίσο ή πριν',
  headerFilterOperatorIsEmpty: 'Είναι κενό',
  headerFilterOperatorIsNotEmpty: 'Δεν είναι κενό',
  headerFilterOperatorIsAnyOf: 'Είναι οποιοδήποτε από',
  'headerFilterOperator=': 'Ισούται',
  'headerFilterOperator!=': 'Δεν ισούται',
  'headerFilterOperator>': 'Μεγαλύτερο από',
  'headerFilterOperator>=': 'Μεγαλύτερο ή ίσο με',
  'headerFilterOperator<': 'Μικρότερο από',
  'headerFilterOperator<=': 'Μικρότερο ή ίσο με',
  // Filter values text
  filterValueAny: 'οποιοδήποτε',
  filterValueTrue: 'αληθές',
  filterValueFalse: 'ψευδές',
  // Column menu text
  columnMenuLabel: 'Μενού',
  columnMenuShowColumns: 'Εμφάνιση στηλών',
  columnMenuManageColumns: 'Διαχείριση στηλών',
  columnMenuFilter: 'Φίλτρο',
  columnMenuHideColumn: 'Απόκρυψη',
  columnMenuUnsort: 'Απενεργοποίηση ταξινόμησης',
  columnMenuSortAsc: 'Ταξινόμηση σε αύξουσα σειρά',
  columnMenuSortDesc: 'Ταξινόμηση σε φθίνουσα σειρά',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " \u03B5\u03BD\u03B5\u03C1\u03B3\u03AC \u03C6\u03AF\u03BB\u03C4\u03C1\u03B1") : "".concat(count, " \u03B5\u03BD\u03B5\u03C1\u03B3\u03CC \u03C6\u03AF\u03BB\u03C4\u03C1\u03BF");
  },
  columnHeaderFiltersLabel: 'Εμφάνιση φίλτρων',
  columnHeaderSortIconLabel: 'Ταξινόμηση',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "".concat(count.toLocaleString(), " \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B5\u03C2 \u03B3\u03C1\u03B1\u03BC\u03BC\u03AD\u03C2") : "".concat(count.toLocaleString(), " \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B7 \u03B3\u03C1\u03B1\u03BC\u03BC\u03AE");
  },
  // Total row amount footer text
  footerTotalRows: 'Σύνολο Γραμμών:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " \u03B1\u03C0\u03CC ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Επιλογή πλαισίου ελέγχου',
  checkboxSelectionSelectAllRows: 'Επιλέξτε όλες τις σειρές',
  checkboxSelectionUnselectAllRows: 'Καταργήση επιλογής όλων των σειρών',
  checkboxSelectionSelectRow: 'Επιλογή γραμμής',
  checkboxSelectionUnselectRow: 'Καταργήση επιλογής γραμμής',
  // Boolean cell text
  booleanCellTrueLabel: 'ναί',
  booleanCellFalseLabel: 'όχι',
  // Actions cell more text
  actionsCellMore: 'περισσότερα',
  // Column pinning text
  pinToLeft: 'Καρφιτσώμα στα αριστερά',
  pinToRight: 'Καρφιτσώμα στα δεξιά',
  unpin: 'Ξεκαρφίτσωμα',
  // Tree Data
  treeDataGroupingHeaderName: 'Ομαδοποίηση',
  treeDataExpand: 'εμφάνιση περιεχομένων',
  treeDataCollapse: 'απόκρυψη περιεχομένων',
  // Grouping columns
  groupingColumnHeaderName: 'Ομαδοποίηση',
  groupColumn: function groupColumn(name) {
    return "\u039F\u03BC\u03B1\u03B4\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 \u03BA\u03B1\u03C4\u03AC ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "\u0394\u03B9\u03B1\u03BA\u03BF\u03C0\u03AE \u03BF\u03BC\u03B1\u03B4\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7\u03C2 \u03BA\u03B1\u03C4\u03AC ".concat(name);
  },
  // Master/detail
  detailPanelToggle: 'Εναλλαγή πίνακα λεπτομερειών',
  expandDetailPanel: 'Ανάπτυξη',
  collapseDetailPanel: 'Σύμπτυξη',
  // Row reordering text
  rowReorderingHeaderName: 'Αναδιάταξη γραμμών',
  // Aggregation
  aggregationMenuItemHeader: 'Συσσωμάτωση',
  aggregationFunctionLabelSum: 'άθροισμα',
  aggregationFunctionLabelAvg: 'μέση τιμή',
  aggregationFunctionLabelMin: 'ελάχιστο',
  aggregationFunctionLabelMax: 'μέγιστο',
  aggregationFunctionLabelSize: 'μέγεθος'
};
export var elGR = getGridLocalization(elGRGrid, elGRCore);