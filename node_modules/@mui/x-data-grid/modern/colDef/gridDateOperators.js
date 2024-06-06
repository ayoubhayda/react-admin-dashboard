import { GridFilterInputDate } from '../components/panel/filterPanel/GridFilterInputDate';
import { convertLegacyOperators } from './utils';
const dateRegex = /(\d+)-(\d+)-(\d+)/;
const dateTimeRegex = /(\d+)-(\d+)-(\d+)T(\d+):(\d+)/;
function buildApplyFilterFn(filterItem, compareFn, showTime, keepHours) {
  if (!filterItem.value) {
    return null;
  }
  const [year, month, day, hour, minute] = filterItem.value.match(showTime ? dateTimeRegex : dateRegex).slice(1).map(Number);
  const time = new Date(year, month - 1, day, hour || 0, minute || 0).getTime();
  return value => {
    if (!value) {
      return false;
    }
    if (keepHours) {
      return compareFn(value.getTime(), time);
    }

    // Make a copy of the date to not reset the hours in the original object
    const dateCopy = new Date(value);
    const timeToCompare = dateCopy.setHours(showTime ? value.getHours() : 0, showTime ? value.getMinutes() : 0, 0, 0);
    return compareFn(timeToCompare, time);
  };
}
export const getGridDateOperators = showTime => convertLegacyOperators([{
  value: 'is',
  getApplyFilterFnV7: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 === value2, showTime);
  },
  InputComponent: GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'not',
  getApplyFilterFnV7: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 !== value2, showTime);
  },
  InputComponent: GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'after',
  getApplyFilterFnV7: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 > value2, showTime);
  },
  InputComponent: GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'onOrAfter',
  getApplyFilterFnV7: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 >= value2, showTime);
  },
  InputComponent: GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'before',
  getApplyFilterFnV7: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 < value2, showTime, !showTime);
  },
  InputComponent: GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'onOrBefore',
  getApplyFilterFnV7: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 <= value2, showTime);
  },
  InputComponent: GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'isEmpty',
  getApplyFilterFnV7: () => {
    return value => {
      return value == null;
    };
  },
  requiresFilterValue: false
}, {
  value: 'isNotEmpty',
  getApplyFilterFnV7: () => {
    return value => {
      return value != null;
    };
  },
  requiresFilterValue: false
}]);