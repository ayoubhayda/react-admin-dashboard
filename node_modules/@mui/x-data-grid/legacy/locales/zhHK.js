import { zhHK as zhHKCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var zhHKGrid = {
  // Root
  noRowsLabel: '沒有行',
  noResultsOverlayLabel: '未找到結果。',
  // Density selector toolbar button text
  toolbarDensity: '密度',
  toolbarDensityLabel: '密度',
  toolbarDensityCompact: '袖珍的',
  toolbarDensityStandard: '標準',
  toolbarDensityComfortable: '舒服的',
  // Columns selector toolbar button text
  toolbarColumns: '列',
  toolbarColumnsLabel: '選擇列',
  // Filters toolbar button text
  toolbarFilters: '過濾器',
  toolbarFiltersLabel: '顯示過濾器',
  toolbarFiltersTooltipHide: '隱藏過濾器',
  toolbarFiltersTooltipShow: '顯示過濾器',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " \u500B\u6709\u6548\u904E\u6FFE\u5668") : "".concat(count, " \u500B\u6D3B\u52D5\u904E\u6FFE\u5668");
  },
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: '搜尋…',
  toolbarQuickFilterLabel: '搜尋',
  toolbarQuickFilterDeleteIconLabel: '清除',
  // Export selector toolbar button text
  toolbarExport: '出口',
  toolbarExportLabel: '出口',
  toolbarExportCSV: '下載為 CSV',
  toolbarExportPrint: '列印',
  toolbarExportExcel: '下載為 Excel',
  // Columns panel text
  columnsPanelTextFieldLabel: '查找欄目',
  columnsPanelTextFieldPlaceholder: '欄目標題',
  columnsPanelDragIconLabel: '重新排序列',
  columnsPanelShowAllButton: '顯示所有',
  columnsPanelHideAllButton: '全部藏起來',
  // Filter panel text
  filterPanelAddFilter: '新增過濾器',
  filterPanelRemoveAll: '移除所有',
  filterPanelDeleteIconLabel: '刪除',
  filterPanelLogicOperator: '邏輯運算符',
  filterPanelOperator: '操作員',
  filterPanelOperatorAnd: '和',
  filterPanelOperatorOr: '或者',
  filterPanelColumns: '列',
  filterPanelInputLabel: '價值',
  filterPanelInputPlaceholder: '過濾值',
  // Filter operators text
  filterOperatorContains: '包含',
  filterOperatorEquals: '等於',
  filterOperatorStartsWith: '以。。開始',
  filterOperatorEndsWith: '以。。結束',
  filterOperatorIs: '是',
  filterOperatorNot: '不是',
  filterOperatorAfter: '是在之後',
  filterOperatorOnOrAfter: '是在或之後',
  filterOperatorBefore: '是在之前',
  filterOperatorOnOrBefore: '是在或之前',
  filterOperatorIsEmpty: '是空的',
  filterOperatorIsNotEmpty: '不為空',
  filterOperatorIsAnyOf: '是以下任一個',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',
  // Header filter operators text
  headerFilterOperatorContains: '包含',
  headerFilterOperatorEquals: '等於',
  headerFilterOperatorStartsWith: '以。。開始',
  headerFilterOperatorEndsWith: '以。。結束',
  headerFilterOperatorIs: '是',
  headerFilterOperatorNot: '不是',
  headerFilterOperatorAfter: '是在之後',
  headerFilterOperatorOnOrAfter: '是在或之後',
  headerFilterOperatorBefore: '是之前',
  headerFilterOperatorOnOrBefore: '是在或之前',
  headerFilterOperatorIsEmpty: '是空的',
  headerFilterOperatorIsNotEmpty: '不為空',
  headerFilterOperatorIsAnyOf: '是以下任一個',
  'headerFilterOperator=': '等於',
  'headerFilterOperator!=': '不等於',
  'headerFilterOperator>': '比...更棒',
  'headerFilterOperator>=': '大於或等於',
  'headerFilterOperator<': '少於',
  'headerFilterOperator<=': '小於或等於',
  // Filter values text
  filterValueAny: '任何',
  filterValueTrue: '真的',
  filterValueFalse: '錯誤的',
  // Column menu text
  columnMenuLabel: '選單',
  columnMenuShowColumns: '顯示欄目',
  columnMenuManageColumns: '管理欄目',
  columnMenuFilter: '篩選',
  columnMenuHideColumn: '隱藏列',
  columnMenuUnsort: '取消排序',
  columnMenuSortAsc: '按升序排序',
  columnMenuSortDesc: '按降序排序',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " \u500B\u6709\u6548\u904E\u6FFE\u5668") : "".concat(count, " \u500B\u6D3B\u52D5\u904E\u6FFE\u5668");
  },
  columnHeaderFiltersLabel: '顯示過濾器',
  columnHeaderSortIconLabel: '種類',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "\u5DF2\u9078\u64C7 ".concat(count.toLocaleString(), " \u884C") : "\u5DF2\u9078\u64C7 ".concat(count.toLocaleString(), " \u884C");
  },
  // Total row amount footer text
  footerTotalRows: '總行數：',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(totalCount.toLocaleString(), " \u7684 ").concat(visibleCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: '複選框選擇',
  checkboxSelectionSelectAllRows: '選擇所有行',
  checkboxSelectionUnselectAllRows: '取消選擇所有行',
  checkboxSelectionSelectRow: '選擇行',
  checkboxSelectionUnselectRow: '取消選擇行',
  // Boolean cell text
  booleanCellTrueLabel: '是的',
  booleanCellFalseLabel: '不',
  // Actions cell more text
  actionsCellMore: '更多的',
  // Column pinning text
  pinToLeft: '固定到左側',
  pinToRight: '固定到右側',
  unpin: '取消固定',
  // Tree Data
  treeDataGroupingHeaderName: 'Group',
  treeDataExpand: '看看孩子們',
  treeDataCollapse: '隱藏孩子',
  // Grouping columns
  groupingColumnHeaderName: '團體',
  groupColumn: function groupColumn(name) {
    return "\u6309 ".concat(name, " \u5206\u7D44");
  },
  unGroupColumn: function unGroupColumn(name) {
    return "\u505C\u6B62\u4EE5 ".concat(name, " \u5206\u7D44");
  },
  // Master/detail
  detailPanelToggle: '詳細資訊面板切換',
  expandDetailPanel: '擴張',
  collapseDetailPanel: '坍塌',
  // Row reordering text
  rowReorderingHeaderName: '行重新排序',
  // Aggregation
  aggregationMenuItemHeader: '聚合',
  aggregationFunctionLabelSum: '和',
  aggregationFunctionLabelAvg: '平均',
  aggregationFunctionLabelMin: '分分鐘',
  aggregationFunctionLabelMax: '最大限度',
  aggregationFunctionLabelSize: '尺寸'
};
export var zhHK = getGridLocalization(zhHKGrid, zhHKCore);