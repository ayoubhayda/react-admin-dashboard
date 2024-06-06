"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridDensityValueSelector = exports.gridDensitySelector = exports.gridDensityFactorSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
const gridDensitySelector = state => state.density;
exports.gridDensitySelector = gridDensitySelector;
const gridDensityValueSelector = exports.gridDensityValueSelector = (0, _createSelector.createSelector)(gridDensitySelector, density => density.value);
const gridDensityFactorSelector = exports.gridDensityFactorSelector = (0, _createSelector.createSelector)(gridDensitySelector, density => density.factor);