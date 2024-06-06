import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import { GRID_STRING_COL_DEF } from './gridStringColDef';
import { renderEditSingleSelectCell } from '../components/cell/GridEditSingleSelectCell';
import { getGridSingleSelectOperators } from './gridSingleSelectOperators';
import { isSingleSelectColDef } from '../components/panel/filterPanel/filterPanelUtils';
import { isObject } from '../utils/utils';
var isArrayOfObjects = function isArrayOfObjects(options) {
  return _typeof(options[0]) === 'object';
};
var defaultGetOptionValue = function defaultGetOptionValue(value) {
  return isObject(value) ? value.value : value;
};
var defaultGetOptionLabel = function defaultGetOptionLabel(value) {
  return isObject(value) ? value.label : String(value);
};
export var GRID_SINGLE_SELECT_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'singleSelect',
  getOptionLabel: defaultGetOptionLabel,
  getOptionValue: defaultGetOptionValue,
  valueFormatter: function valueFormatter(params) {
    var id = params.id,
      field = params.field,
      value = params.value,
      api = params.api;
    var colDef = params.api.getColumn(field);
    if (!isSingleSelectColDef(colDef)) {
      return '';
    }
    var valueOptions;
    if (typeof colDef.valueOptions === 'function') {
      valueOptions = colDef.valueOptions({
        id: id,
        row: id ? api.getRow(id) : null,
        field: field
      });
    } else {
      valueOptions = colDef.valueOptions;
    }
    if (value == null) {
      return '';
    }
    if (!valueOptions) {
      return value;
    }
    if (!isArrayOfObjects(valueOptions)) {
      return colDef.getOptionLabel(value);
    }
    var valueOption = valueOptions.find(function (option) {
      return colDef.getOptionValue(option) === value;
    });
    return valueOption ? colDef.getOptionLabel(valueOption) : '';
  },
  renderEditCell: renderEditSingleSelectCell,
  filterOperators: getGridSingleSelectOperators(),
  // @ts-ignore
  pastedValueParser: function pastedValueParser(value, params) {
    var colDef = params.colDef;
    var colDefValueOptions = colDef.valueOptions;
    var valueOptions = typeof colDefValueOptions === 'function' ? colDefValueOptions({
      field: colDef.field
    }) : colDefValueOptions || [];
    var getOptionValue = colDef.getOptionValue;
    var valueOption = valueOptions.find(function (option) {
      if (getOptionValue(option) === value) {
        return true;
      }
      return false;
    });
    if (valueOption) {
      return value;
    }
    // do not paste the value if it is not in the valueOptions
    return undefined;
  }
});