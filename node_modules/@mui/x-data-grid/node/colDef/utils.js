"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GLOBAL_API_REF = void 0;
exports.convertFilterV7ToLegacy = convertFilterV7ToLegacy;
exports.convertLegacyOperators = convertLegacyOperators;
exports.convertQuickFilterV7ToLegacy = convertQuickFilterV7ToLegacy;
exports.isInternalFilter = isInternalFilter;
exports.tagInternalFilter = tagInternalFilter;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
/**
 * A global API ref, for v7-to-legacy converter
 */
const GLOBAL_API_REF = exports.GLOBAL_API_REF = {
  current: null
};

/**
 * A tagger to determine if the filter is internal or custom user-supplied.
 * To be a valid internal filter, the v7 function *must* be defined/redefined at
 * the same time as the legacy one.
 * https://github.com/mui/mui-x/pull/9254#discussion_r1231095551
 */
function tagInternalFilter(fn) {
  fn.isInternal = true;
  return fn;
}
function isInternalFilter(fn) {
  return fn !== undefined && fn.isInternal === true;
}
function convertFilterV7ToLegacy(fn) {
  return tagInternalFilter((filterItem, column) => {
    const filterFn = fn(filterItem, column);
    if (!filterFn) {
      return filterFn;
    }
    return cellParams => {
      return filterFn(cellParams.value, cellParams.row, column, GLOBAL_API_REF.current);
    };
  });
}
function convertLegacyOperators(ops) {
  return ops.map(op => {
    return (0, _extends2.default)({}, op, {
      getApplyFilterFn: convertFilterV7ToLegacy(op.getApplyFilterFnV7),
      getApplyFilterFnV7: tagInternalFilter(op.getApplyFilterFnV7)
    });
  });
}
function convertQuickFilterV7ToLegacy(fn) {
  return tagInternalFilter((filterItem, column, apiRef) => {
    const filterFn = fn(filterItem, column, apiRef);
    if (!filterFn) {
      return filterFn;
    }
    return cellParams => {
      return filterFn(cellParams.value, cellParams.row, column, apiRef);
    };
  });
}