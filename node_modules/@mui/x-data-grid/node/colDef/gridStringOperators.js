"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridStringQuickFilterFn = exports.getGridStringOperators = void 0;
var _GridFilterInputValue = require("../components/panel/filterPanel/GridFilterInputValue");
var _utils = require("../utils/utils");
var _GridFilterInputMultipleValue = require("../components/panel/filterPanel/GridFilterInputMultipleValue");
var _utils2 = require("./utils");
var _gridFilterUtils = require("../hooks/features/filter/gridFilterUtils");
const getGridStringQuickFilterFn = exports.getGridStringQuickFilterFn = (0, _utils2.tagInternalFilter)(value => {
  if (!value) {
    return null;
  }
  const filterRegex = new RegExp((0, _utils.escapeRegExp)(value), 'i');
  return (_, row, column, apiRef) => {
    let columnValue = apiRef.current.getRowFormattedValue(row, column);
    if (apiRef.current.ignoreDiacritics) {
      columnValue = (0, _gridFilterUtils.removeDiacritics)(columnValue);
    }
    return columnValue != null ? filterRegex.test(columnValue.toString()) : false;
  };
});
const getGridStringOperators = (disableTrim = false) => (0, _utils2.convertLegacyOperators)([{
  value: 'contains',
  getApplyFilterFnV7: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
    const filterRegex = new RegExp((0, _utils.escapeRegExp)(filterItemValue), 'i');
    return value => {
      return value != null ? filterRegex.test(String(value)) : false;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue
}, {
  value: 'equals',
  getApplyFilterFnV7: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
    const collator = new Intl.Collator(undefined, {
      sensitivity: 'base',
      usage: 'search'
    });
    return value => {
      return value != null ? collator.compare(filterItemValue, value.toString()) === 0 : false;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue
}, {
  value: 'startsWith',
  getApplyFilterFnV7: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
    const filterRegex = new RegExp(`^${(0, _utils.escapeRegExp)(filterItemValue)}.*$`, 'i');
    return value => {
      return value != null ? filterRegex.test(value.toString()) : false;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue
}, {
  value: 'endsWith',
  getApplyFilterFnV7: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.trim();
    const filterRegex = new RegExp(`.*${(0, _utils.escapeRegExp)(filterItemValue)}$`, 'i');
    return value => {
      return value != null ? filterRegex.test(value.toString()) : false;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue
}, {
  value: 'isEmpty',
  getApplyFilterFnV7: () => {
    return value => {
      return value === '' || value == null;
    };
  },
  requiresFilterValue: false
}, {
  value: 'isNotEmpty',
  getApplyFilterFnV7: () => {
    return value => {
      return value !== '' && value != null;
    };
  },
  requiresFilterValue: false
}, {
  value: 'isAnyOf',
  getApplyFilterFnV7: filterItem => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
      return null;
    }
    const filterItemValue = disableTrim ? filterItem.value : filterItem.value.map(val => val.trim());
    const collator = new Intl.Collator(undefined, {
      sensitivity: 'base',
      usage: 'search'
    });
    return value => value != null ? filterItemValue.some(filterValue => {
      return collator.compare(filterValue, value.toString() || '') === 0;
    }) : false;
  },
  InputComponent: _GridFilterInputMultipleValue.GridFilterInputMultipleValue
}]);
exports.getGridStringOperators = getGridStringOperators;