import { GridFilterInputValue } from '../components/panel/filterPanel/GridFilterInputValue';
import { escapeRegExp } from '../utils/utils';
import { GridFilterInputMultipleValue } from '../components/panel/filterPanel/GridFilterInputMultipleValue';
import { convertLegacyOperators, tagInternalFilter } from './utils';
import { removeDiacritics } from '../hooks/features/filter/gridFilterUtils';
export var getGridStringQuickFilterFn = tagInternalFilter(function (value) {
  if (!value) {
    return null;
  }
  var filterRegex = new RegExp(escapeRegExp(value), 'i');
  return function (_, row, column, apiRef) {
    var columnValue = apiRef.current.getRowFormattedValue(row, column);
    if (apiRef.current.ignoreDiacritics) {
      columnValue = removeDiacritics(columnValue);
    }
    return columnValue != null ? filterRegex.test(columnValue.toString()) : false;
  };
});
export var getGridStringOperators = function getGridStringOperators() {
  var disableTrim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return convertLegacyOperators([{
    value: 'contains',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (!filterItem.value) {
        return null;
      }
      var filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
      var filterRegex = new RegExp(escapeRegExp(filterItemValue), 'i');
      return function (value) {
        return value != null ? filterRegex.test(String(value)) : false;
      };
    },
    InputComponent: GridFilterInputValue
  }, {
    value: 'equals',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (!filterItem.value) {
        return null;
      }
      var filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
      var collator = new Intl.Collator(undefined, {
        sensitivity: 'base',
        usage: 'search'
      });
      return function (value) {
        return value != null ? collator.compare(filterItemValue, value.toString()) === 0 : false;
      };
    },
    InputComponent: GridFilterInputValue
  }, {
    value: 'startsWith',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (!filterItem.value) {
        return null;
      }
      var filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
      var filterRegex = new RegExp("^".concat(escapeRegExp(filterItemValue), ".*$"), 'i');
      return function (value) {
        return value != null ? filterRegex.test(value.toString()) : false;
      };
    },
    InputComponent: GridFilterInputValue
  }, {
    value: 'endsWith',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (!filterItem.value) {
        return null;
      }
      var filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
      var filterRegex = new RegExp(".*".concat(escapeRegExp(filterItemValue), "$"), 'i');
      return function (value) {
        return value != null ? filterRegex.test(value.toString()) : false;
      };
    },
    InputComponent: GridFilterInputValue
  }, {
    value: 'isEmpty',
    getApplyFilterFnV7: function getApplyFilterFnV7() {
      return function (value) {
        return value === '' || value == null;
      };
    },
    requiresFilterValue: false
  }, {
    value: 'isNotEmpty',
    getApplyFilterFnV7: function getApplyFilterFnV7() {
      return function (value) {
        return value !== '' && value != null;
      };
    },
    requiresFilterValue: false
  }, {
    value: 'isAnyOf',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }
      var filterItemValue = disableTrim ? filterItem.value : filterItem.value.map(function (val) {
        return val.trim();
      });
      var collator = new Intl.Collator(undefined, {
        sensitivity: 'base',
        usage: 'search'
      });
      return function (value) {
        return value != null ? filterItemValue.some(function (filterValue) {
          return collator.compare(filterValue, value.toString() || '') === 0;
        }) : false;
      };
    },
    InputComponent: GridFilterInputMultipleValue
  }]);
};