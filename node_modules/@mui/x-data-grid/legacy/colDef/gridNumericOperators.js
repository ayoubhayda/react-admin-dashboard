import { GridFilterInputValue } from '../components/panel/filterPanel/GridFilterInputValue';
import { GridFilterInputMultipleValue } from '../components/panel/filterPanel/GridFilterInputMultipleValue';
import { convertLegacyOperators, tagInternalFilter } from './utils';
var parseNumericValue = function parseNumericValue(value) {
  if (value == null) {
    return null;
  }
  return Number(value);
};
export var getGridNumericQuickFilterFn = tagInternalFilter(function (value) {
  if (value == null || Number.isNaN(value) || value === '') {
    return null;
  }
  return function (columnValue) {
    return parseNumericValue(columnValue) === parseNumericValue(value);
  };
});
export var getGridNumericOperators = function getGridNumericOperators() {
  return convertLegacyOperators([{
    value: '=',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }
      return function (value) {
        return parseNumericValue(value) === filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    value: '!=',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }
      return function (value) {
        return parseNumericValue(value) !== filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    value: '>',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }
      return function (value) {
        if (value == null) {
          return false;
        }
        return parseNumericValue(value) > filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    value: '>=',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }
      return function (value) {
        if (value == null) {
          return false;
        }
        return parseNumericValue(value) >= filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    value: '<',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }
      return function (value) {
        if (value == null) {
          return false;
        }
        return parseNumericValue(value) < filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    value: '<=',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }
      return function (value) {
        if (value == null) {
          return false;
        }
        return parseNumericValue(value) <= filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    value: 'isEmpty',
    getApplyFilterFnV7: function getApplyFilterFnV7() {
      return function (value) {
        return value == null;
      };
    },
    requiresFilterValue: false
  }, {
    value: 'isNotEmpty',
    getApplyFilterFnV7: function getApplyFilterFnV7() {
      return function (value) {
        return value != null;
      };
    },
    requiresFilterValue: false
  }, {
    value: 'isAnyOf',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }
      return function (value) {
        return value != null && filterItem.value.includes(Number(value));
      };
    },
    InputComponent: GridFilterInputMultipleValue,
    InputComponentProps: {
      type: 'number'
    }
  }]);
};