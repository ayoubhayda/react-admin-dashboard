"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridBooleanOperators = void 0;
var _GridFilterInputBoolean = require("../components/panel/filterPanel/GridFilterInputBoolean");
var _utils = require("./utils");
const getGridBooleanOperators = () => (0, _utils.convertLegacyOperators)([{
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
  InputComponent: _GridFilterInputBoolean.GridFilterInputBoolean
}]);
exports.getGridBooleanOperators = getGridBooleanOperators;