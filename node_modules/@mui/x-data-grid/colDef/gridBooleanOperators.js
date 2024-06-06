import { GridFilterInputBoolean } from '../components/panel/filterPanel/GridFilterInputBoolean';
import { convertLegacyOperators } from './utils';
export const getGridBooleanOperators = () => convertLegacyOperators([{
  value: 'is',
  getApplyFilterFnV7: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const valueAsBoolean = filterItem.value === 'true';
    return value => {
      return Boolean(value) === valueAsBoolean;
    };
  },
  InputComponent: GridFilterInputBoolean
}]);