import { GridFilterInputSingleSelect } from '../components/panel/filterPanel/GridFilterInputSingleSelect';
import { GridFilterInputMultipleSingleSelect } from '../components/panel/filterPanel/GridFilterInputMultipleSingleSelect';
import { isObject } from '../utils/utils';
import { convertLegacyOperators } from './utils';
const parseObjectValue = value => {
  if (value == null || !isObject(value)) {
    return value;
  }
  return value.value;
};
export const getGridSingleSelectOperators = () => convertLegacyOperators([{
  value: 'is',
  getApplyFilterFnV7: filterItem => {
    if (filterItem.value == null || filterItem.value === '') {
      return null;
    }
    return value => parseObjectValue(value) === parseObjectValue(filterItem.value);
  },
  InputComponent: GridFilterInputSingleSelect
}, {
  value: 'not',
  getApplyFilterFnV7: filterItem => {
    if (filterItem.value == null || filterItem.value === '') {
      return null;
    }
    return value => parseObjectValue(value) !== parseObjectValue(filterItem.value);
  },
  InputComponent: GridFilterInputSingleSelect
}, {
  value: 'isAnyOf',
  getApplyFilterFnV7: filterItem => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
      return null;
    }
    const filterItemValues = filterItem.value.map(parseObjectValue);
    return value => filterItemValues.includes(parseObjectValue(value));
  },
  InputComponent: GridFilterInputMultipleSingleSelect
}]);