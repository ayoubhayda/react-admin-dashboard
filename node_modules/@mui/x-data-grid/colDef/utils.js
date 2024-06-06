import _extends from "@babel/runtime/helpers/esm/extends";
/**
 * A global API ref, for v7-to-legacy converter
 */
export const GLOBAL_API_REF = {
  current: null
};

/**
 * A tagger to determine if the filter is internal or custom user-supplied.
 * To be a valid internal filter, the v7 function *must* be defined/redefined at
 * the same time as the legacy one.
 * https://github.com/mui/mui-x/pull/9254#discussion_r1231095551
 */
export function tagInternalFilter(fn) {
  fn.isInternal = true;
  return fn;
}
export function isInternalFilter(fn) {
  return fn !== undefined && fn.isInternal === true;
}
export function convertFilterV7ToLegacy(fn) {
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
export function convertLegacyOperators(ops) {
  return ops.map(op => {
    return _extends({}, op, {
      getApplyFilterFn: convertFilterV7ToLegacy(op.getApplyFilterFnV7),
      getApplyFilterFnV7: tagInternalFilter(op.getApplyFilterFnV7)
    });
  });
}
export function convertQuickFilterV7ToLegacy(fn) {
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