import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { GridFilterInputDate } from '../components/panel/filterPanel/GridFilterInputDate';
import { convertLegacyOperators } from './utils';
var dateRegex = /(\d+)-(\d+)-(\d+)/;
var dateTimeRegex = /(\d+)-(\d+)-(\d+)T(\d+):(\d+)/;
function buildApplyFilterFn(filterItem, compareFn, showTime, keepHours) {
  if (!filterItem.value) {
    return null;
  }
  var _slice$map = filterItem.value.match(showTime ? dateTimeRegex : dateRegex).slice(1).map(Number),
    _slice$map2 = _slicedToArray(_slice$map, 5),
    year = _slice$map2[0],
    month = _slice$map2[1],
    day = _slice$map2[2],
    hour = _slice$map2[3],
    minute = _slice$map2[4];
  var time = new Date(year, month - 1, day, hour || 0, minute || 0).getTime();
  return function (value) {
    if (!value) {
      return false;
    }
    if (keepHours) {
      return compareFn(value.getTime(), time);
    }

    // Make a copy of the date to not reset the hours in the original object
    var dateCopy = new Date(value);
    var timeToCompare = dateCopy.setHours(showTime ? value.getHours() : 0, showTime ? value.getMinutes() : 0, 0, 0);
    return compareFn(timeToCompare, time);
  };
}
export var getGridDateOperators = function getGridDateOperators(showTime) {
  return convertLegacyOperators([{
    value: 'is',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 === value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'not',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 !== value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'after',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 > value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'onOrAfter',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 >= value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'before',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 < value2;
      }, showTime, !showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'onOrBefore',
    getApplyFilterFnV7: function getApplyFilterFnV7(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 <= value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
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
  }]);
};