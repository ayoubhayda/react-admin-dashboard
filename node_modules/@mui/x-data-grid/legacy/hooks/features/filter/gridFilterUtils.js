import _extends from "@babel/runtime/helpers/esm/extends";
import { GridLogicOperator } from '../../../models';
import { GLOBAL_API_REF, isInternalFilter } from '../../../colDef/utils';
import { getDefaultGridFilterModel } from './gridFilterState';
import { buildWarning } from '../../../utils/warning';
import { getPublicApiRef } from '../../../utils/getPublicApiRef';
import { gridColumnFieldsSelector, gridColumnLookupSelector, gridVisibleColumnFieldsSelector } from '../columns';
var hasEval;
function getHasEval() {
  if (hasEval !== undefined) {
    return hasEval;
  }
  try {
    hasEval = new Function('return true')();
  } catch (_) {
    hasEval = false;
  }
  return hasEval;
}
/**
 * Adds default values to the optional fields of a filter items.
 * @param {GridFilterItem} item The raw filter item.
 * @param {React.MutableRefObject<GridPrivateApiCommunity>} apiRef The API of the grid.
 * @return {GridFilterItem} The clean filter item with an uniq ID and an always-defined operator.
 * TODO: Make the typing reflect the different between GridFilterInputItem and GridFilterItem.
 */
export var cleanFilterItem = function cleanFilterItem(item, apiRef) {
  var cleanItem = _extends({}, item);
  if (cleanItem.id == null) {
    cleanItem.id = Math.round(Math.random() * 1e5);
  }
  if (cleanItem.operator == null) {
    // Selects a default operator
    // We don't use `apiRef.current.getColumn` because it is not ready during state initialization
    var column = gridColumnLookupSelector(apiRef)[cleanItem.field];
    cleanItem.operator = column && column.filterOperators[0].value;
  }
  return cleanItem;
};
var filterModelDisableMultiColumnsFilteringWarning = buildWarning(['MUI: The `filterModel` can only contain a single item when the `disableMultipleColumnsFiltering` prop is set to `true`.', 'If you are using the community version of the `DataGrid`, this prop is always `true`.'], 'error');
var filterModelMissingItemIdWarning = buildWarning('MUI: The `id` field is required on `filterModel.items` when you use multiple filters.', 'error');
var filterModelMissingItemOperatorWarning = buildWarning('MUI: The `operator` field is required on `filterModel.items`, one or more of your filtering item has no `operator` provided.', 'error');
export var sanitizeFilterModel = function sanitizeFilterModel(model, disableMultipleColumnsFiltering, apiRef) {
  var hasSeveralItems = model.items.length > 1;
  var items;
  if (hasSeveralItems && disableMultipleColumnsFiltering) {
    filterModelDisableMultiColumnsFilteringWarning();
    items = [model.items[0]];
  } else {
    items = model.items;
  }
  var hasItemsWithoutIds = hasSeveralItems && items.some(function (item) {
    return item.id == null;
  });
  var hasItemWithoutOperator = items.some(function (item) {
    return item.operator == null;
  });
  if (hasItemsWithoutIds) {
    filterModelMissingItemIdWarning();
  }
  if (hasItemWithoutOperator) {
    filterModelMissingItemOperatorWarning();
  }
  if (hasItemWithoutOperator || hasItemsWithoutIds) {
    return _extends({}, model, {
      items: items.map(function (item) {
        return cleanFilterItem(item, apiRef);
      })
    });
  }
  if (model.items !== items) {
    return _extends({}, model, {
      items: items
    });
  }
  return model;
};
export var mergeStateWithFilterModel = function mergeStateWithFilterModel(filterModel, disableMultipleColumnsFiltering, apiRef) {
  return function (filteringState) {
    return _extends({}, filteringState, {
      filterModel: sanitizeFilterModel(filterModel, disableMultipleColumnsFiltering, apiRef)
    });
  };
};
export var removeDiacritics = function removeDiacritics(value) {
  if (typeof value === 'string') {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  return value;
};
var getFilterCallbackFromItem = function getFilterCallbackFromItem(filterItem, apiRef) {
  if (!filterItem.field || !filterItem.operator) {
    return null;
  }
  var column = apiRef.current.getColumn(filterItem.field);
  if (!column) {
    return null;
  }
  var parsedValue;
  if (column.valueParser) {
    var _filterItem$value;
    var parser = column.valueParser;
    parsedValue = Array.isArray(filterItem.value) ? (_filterItem$value = filterItem.value) == null ? void 0 : _filterItem$value.map(function (x) {
      return parser(x);
    }) : parser(filterItem.value);
  } else {
    parsedValue = filterItem.value;
  }
  var ignoreDiacritics = apiRef.current.rootProps.ignoreDiacritics;
  if (ignoreDiacritics) {
    parsedValue = removeDiacritics(parsedValue);
  }
  var newFilterItem = _extends({}, filterItem, {
    value: parsedValue
  });
  var filterOperators = column.filterOperators;
  if (!(filterOperators != null && filterOperators.length)) {
    throw new Error("MUI: No filter operators found for column '".concat(column.field, "'."));
  }
  var filterOperator = filterOperators.find(function (operator) {
    return operator.value === newFilterItem.operator;
  });
  if (!filterOperator) {
    throw new Error("MUI: No filter operator found for column '".concat(column.field, "' and operator value '").concat(newFilterItem.operator, "'."));
  }
  var hasUserFunctionLegacy = !isInternalFilter(filterOperator.getApplyFilterFn);
  var hasUserFunctionV7 = !isInternalFilter(filterOperator.getApplyFilterFnV7);
  var publicApiRef = getPublicApiRef(apiRef);
  if (filterOperator.getApplyFilterFnV7 && !(hasUserFunctionLegacy && !hasUserFunctionV7)) {
    var _applyFilterOnRow = filterOperator.getApplyFilterFnV7(newFilterItem, column);
    if (typeof _applyFilterOnRow !== 'function') {
      return null;
    }
    return {
      v7: true,
      item: newFilterItem,
      fn: function fn(row) {
        var value = apiRef.current.getRowValue(row, column);
        if (ignoreDiacritics) {
          value = removeDiacritics(value);
        }
        return _applyFilterOnRow(value, row, column, publicApiRef);
      }
    };
  }
  var applyFilterOnRow = filterOperator.getApplyFilterFn(newFilterItem, column);
  if (typeof applyFilterOnRow !== 'function') {
    return null;
  }
  return {
    v7: false,
    item: newFilterItem,
    fn: function fn(rowId) {
      var params = apiRef.current.getCellParams(rowId, newFilterItem.field);
      GLOBAL_API_REF.current = publicApiRef;
      if (ignoreDiacritics) {
        params.value = removeDiacritics(params.value);
      }
      var result = applyFilterOnRow(params);
      GLOBAL_API_REF.current = null;
      return result;
    }
  };
};
var filterItemsApplierId = 1;

/**
 * Generates a method to easily check if a row is matching the current filter model.
 * @param {GridFilterModel} filterModel The model with which we want to filter the rows.
 * @param {React.MutableRefObject<GridPrivateApiCommunity>} apiRef The API of the grid.
 * @returns {GridAggregatedFilterItemApplier | null} A method that checks if a row is matching the current filter model. If `null`, we consider that all the rows are matching the filters.
 */
var buildAggregatedFilterItemsApplier = function buildAggregatedFilterItemsApplier(filterModel, apiRef, disableEval) {
  var items = filterModel.items;
  var appliers = items.map(function (item) {
    return getFilterCallbackFromItem(item, apiRef);
  }).filter(function (callback) {
    return !!callback;
  });
  if (appliers.length === 0) {
    return null;
  }
  if (disableEval || !getHasEval()) {
    // This is the original logic, which is used if `eval()` is not supported (aka prevented by CSP).
    return function (row, shouldApplyFilter) {
      var resultPerItemId = {};
      for (var i = 0; i < appliers.length; i += 1) {
        var applier = appliers[i];
        if (!shouldApplyFilter || shouldApplyFilter(applier.item.field)) {
          resultPerItemId[applier.item.id] = applier.v7 ? applier.fn(row) : applier.fn(apiRef.current.getRowId(row));
        }
      }
      return resultPerItemId;
    };
  }

  // We generate a new function with `new Function()` to avoid expensive patterns for JS engines
  // such as a dynamic object assignment, e.g. `{ [dynamicKey]: value }`.
  var filterItemCore = new Function('getRowId', 'appliers', 'row', 'shouldApplyFilter', "\"use strict\";\n".concat(appliers.map(function (applier, i) {
    return "const shouldApply".concat(i, " = !shouldApplyFilter || shouldApplyFilter(").concat(JSON.stringify(applier.item.field), ");");
  }).join('\n'), "\n\nconst result$$ = {\n").concat(appliers.map(function (applier, i) {
    return "  ".concat(JSON.stringify(String(applier.item.id)), ": !shouldApply").concat(i, "\n    ? false\n    : ").concat(applier.v7 ? "appliers[".concat(i, "].fn(row)") : "appliers[".concat(i, "].fn(getRowId(row))"), ",");
  }).join('\n'), "\n};\n\nreturn result$$;").replaceAll('$$', String(filterItemsApplierId)));
  filterItemsApplierId += 1;

  // Assign to the arrow function a name to help debugging
  var filterItem = function filterItem(row, shouldApplyItem) {
    return filterItemCore(apiRef.current.getRowId, appliers, row, shouldApplyItem);
  };
  return filterItem;
};

/**
 * Generates a method to easily check if a row is matching the current quick filter.
 * @param {any[]} filterModel The model with which we want to filter the rows.
 * @param {React.MutableRefObject<GridPrivateApiCommunity>} apiRef The API of the grid.
 * @returns {GridAggregatedFilterItemApplier | null} A method that checks if a row is matching the current filter model. If `null`, we consider that all the rows are matching the filters.
 */
var buildAggregatedQuickFilterApplier = function buildAggregatedQuickFilterApplier(filterModel, apiRef) {
  var _filterModel$quickFil, _filterModel$quickFil2, _filterModel$quickFil3;
  var quickFilterValues = (_filterModel$quickFil = (_filterModel$quickFil2 = filterModel.quickFilterValues) == null ? void 0 : _filterModel$quickFil2.filter(Boolean)) != null ? _filterModel$quickFil : [];
  if (quickFilterValues.length === 0) {
    return null;
  }
  var quickFilterExcludeHiddenColumns = (_filterModel$quickFil3 = filterModel.quickFilterExcludeHiddenColumns) != null ? _filterModel$quickFil3 : false;
  var columnFields = quickFilterExcludeHiddenColumns ? gridVisibleColumnFieldsSelector(apiRef) : gridColumnFieldsSelector(apiRef);
  var appliersPerField = [];
  var ignoreDiacritics = apiRef.current.rootProps.ignoreDiacritics;
  var publicApiRef = getPublicApiRef(apiRef);
  columnFields.forEach(function (field) {
    var column = apiRef.current.getColumn(field);
    var getApplyQuickFilterFn = column == null ? void 0 : column.getApplyQuickFilterFn;
    var getApplyQuickFilterFnV7 = column == null ? void 0 : column.getApplyQuickFilterFnV7;
    var hasUserFunctionLegacy = !isInternalFilter(getApplyQuickFilterFn);
    var hasUserFunctionV7 = !isInternalFilter(getApplyQuickFilterFnV7);
    if (getApplyQuickFilterFnV7 && !(hasUserFunctionLegacy && !hasUserFunctionV7)) {
      appliersPerField.push({
        column: column,
        appliers: quickFilterValues.map(function (quickFilterValue) {
          var value = ignoreDiacritics ? removeDiacritics(quickFilterValue) : quickFilterValue;
          return {
            v7: true,
            fn: getApplyQuickFilterFnV7(value, column, publicApiRef)
          };
        })
      });
    } else if (getApplyQuickFilterFn) {
      appliersPerField.push({
        column: column,
        appliers: quickFilterValues.map(function (quickFilterValue) {
          var value = ignoreDiacritics ? removeDiacritics(quickFilterValue) : quickFilterValue;
          return {
            v7: false,
            fn: getApplyQuickFilterFn(value, column, publicApiRef)
          };
        })
      });
    }
  });
  return function isRowMatchingQuickFilter(row, shouldApplyFilter) {
    var result = {};
    var usedCellParams = {};

    /* eslint-disable no-restricted-syntax, no-labels */
    outer: for (var v = 0; v < quickFilterValues.length; v += 1) {
      var filterValue = quickFilterValues[v];
      for (var i = 0; i < appliersPerField.length; i += 1) {
        var _appliersPerField$i = appliersPerField[i],
          column = _appliersPerField$i.column,
          appliers = _appliersPerField$i.appliers;
        var _field = column.field;
        if (shouldApplyFilter && !shouldApplyFilter(_field)) {
          continue;
        }
        var applier = appliers[v];
        var value = apiRef.current.getRowValue(row, column);
        if (applier.fn === null) {
          continue;
        }
        if (applier.v7) {
          if (ignoreDiacritics) {
            value = removeDiacritics(value);
          }
          var isMatching = applier.fn(value, row, column, publicApiRef);
          if (isMatching) {
            result[filterValue] = true;
            continue outer;
          }
        } else {
          var _usedCellParams$_fiel;
          var cellParams = (_usedCellParams$_fiel = usedCellParams[_field]) != null ? _usedCellParams$_fiel : apiRef.current.getCellParams(apiRef.current.getRowId(row), _field);
          if (ignoreDiacritics) {
            cellParams.value = removeDiacritics(cellParams.value);
          }
          usedCellParams[_field] = cellParams;
          var _isMatching = applier.fn(cellParams);
          if (_isMatching) {
            result[filterValue] = true;
            continue outer;
          }
        }
      }
      result[filterValue] = false;
    }
    /* eslint-enable no-restricted-syntax, no-labels */

    return result;
  };
};
export var buildAggregatedFilterApplier = function buildAggregatedFilterApplier(filterModel, apiRef, disableEval) {
  var isRowMatchingFilterItems = buildAggregatedFilterItemsApplier(filterModel, apiRef, disableEval);
  var isRowMatchingQuickFilter = buildAggregatedQuickFilterApplier(filterModel, apiRef);
  return function isRowMatchingFilters(row, shouldApplyFilter, result) {
    var _isRowMatchingFilterI, _isRowMatchingQuickFi;
    result.passingFilterItems = (_isRowMatchingFilterI = isRowMatchingFilterItems == null ? void 0 : isRowMatchingFilterItems(row, shouldApplyFilter)) != null ? _isRowMatchingFilterI : null;
    result.passingQuickFilterValues = (_isRowMatchingQuickFi = isRowMatchingQuickFilter == null ? void 0 : isRowMatchingQuickFilter(row, shouldApplyFilter)) != null ? _isRowMatchingQuickFi : null;
  };
};
var isNotNull = function isNotNull(result) {
  return result != null;
};
var filterModelItems = function filterModelItems(cache, apiRef, items) {
  if (!cache.cleanedFilterItems) {
    cache.cleanedFilterItems = items.filter(function (item) {
      return getFilterCallbackFromItem(item, apiRef) !== null;
    });
  }
  return cache.cleanedFilterItems;
};
export var passFilterLogic = function passFilterLogic(allFilterItemResults, allQuickFilterResults, filterModel, apiRef, cache) {
  var cleanedFilterItems = filterModelItems(cache, apiRef, filterModel.items);
  var cleanedFilterItemResults = allFilterItemResults.filter(isNotNull);
  var cleanedQuickFilterResults = allQuickFilterResults.filter(isNotNull);

  // get result for filter items model
  if (cleanedFilterItemResults.length > 0) {
    var _filterModel$logicOpe;
    // Return true if the item pass with one of the rows
    var filterItemPredicate = function filterItemPredicate(item) {
      return cleanedFilterItemResults.some(function (filterItemResult) {
        return filterItemResult[item.id];
      });
    };
    var logicOperator = (_filterModel$logicOpe = filterModel.logicOperator) != null ? _filterModel$logicOpe : getDefaultGridFilterModel().logicOperator;
    if (logicOperator === GridLogicOperator.And) {
      var passesAllFilters = cleanedFilterItems.every(filterItemPredicate);
      if (!passesAllFilters) {
        return false;
      }
    } else {
      var passesSomeFilters = cleanedFilterItems.some(filterItemPredicate);
      if (!passesSomeFilters) {
        return false;
      }
    }
  }

  // get result for quick filter model
  if (cleanedQuickFilterResults.length > 0 && filterModel.quickFilterValues != null) {
    var _filterModel$quickFil4;
    // Return true if the item pass with one of the rows
    var quickFilterValuePredicate = function quickFilterValuePredicate(value) {
      return cleanedQuickFilterResults.some(function (quickFilterValueResult) {
        return quickFilterValueResult[value];
      });
    };
    var quickFilterLogicOperator = (_filterModel$quickFil4 = filterModel.quickFilterLogicOperator) != null ? _filterModel$quickFil4 : getDefaultGridFilterModel().quickFilterLogicOperator;
    if (quickFilterLogicOperator === GridLogicOperator.And) {
      var passesAllQuickFilterValues = filterModel.quickFilterValues.every(quickFilterValuePredicate);
      if (!passesAllQuickFilterValues) {
        return false;
      }
    } else {
      var passesSomeQuickFilterValues = filterModel.quickFilterValues.some(quickFilterValuePredicate);
      if (!passesSomeQuickFilterValues) {
        return false;
      }
    }
  }
  return true;
};