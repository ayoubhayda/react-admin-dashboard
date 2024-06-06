import { GridFilterInputBoolean } from '../components/panel/filterPanel/GridFilterInputBoolean';
import { convertLegacyOperators } from './utils';
export var getGridBooleanOperators = function getGridBooleanOperators() {
  return convertLegacyOperators([{
    value: 'is',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      if (!filterItem.value) {
        return null;
      }
      var valueAsBoolean = filterItem.value === 'true';
      return function (value) {
        return Boolean(value) === valueAsBoolean;
      };
    },
    InputComponent: GridFilterInputBoolean
  }]);
};