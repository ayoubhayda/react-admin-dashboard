import { GridFilterInputSingleSelect } from '../components/panel/filterPanel/GridFilterInputSingleSelect';
import { GridFilterInputMultipleSingleSelect } from '../components/panel/filterPanel/GridFilterInputMultipleSingleSelect';
import { isObject } from '../utils/utils';
import { convertLegacyOperators } from './utils';
var parseObjectValue = function parseObjectValue(value) {
  if (value == null || !isObject(value)) {
    return value;
  }
  return value.value;
};
export var getGridSingleSelectOperators = function getGridSingleSelectOperators() {
  return convertLegacyOperators([{
    value: 'is',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (filterItem.value == null || filterItem.value === '') {
        return null;
      }
      return function (value) {
        return parseObjectValue(value) === parseObjectValue(filterItem.value);
      };
    },
    InputComponent: GridFilterInputSingleSelect
  }, {
    value: 'not',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (filterItem.value == null || filterItem.value === '') {
        return null;
      }
      return function (value) {
        return parseObjectValue(value) !== parseObjectValue(filterItem.value);
      };
    },
    InputComponent: GridFilterInputSingleSelect
  }, {
    value: 'isAnyOf',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }
      var filterItemValues = filterItem.value.map(parseObjectValue);
      return function (value) {
        return filterItemValues.includes(parseObjectValue(value));
      };
    },
    InputComponent: GridFilterInputMultipleSingleSelect
  }]);
};