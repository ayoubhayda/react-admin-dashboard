import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["groupId", "children"];
import * as React from 'react';
import { isLeaf } from '../../../models/gridColumnGrouping';
import { gridColumnGroupsLookupSelector, gridColumnGroupsUnwrappedModelSelector } from './gridColumnGroupsSelector';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { getColumnGroupsHeaderStructure, unwrapGroupingColumnModel } from './gridColumnGroupsUtils';
import { useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { gridColumnFieldsSelector, gridVisibleColumnFieldsSelector } from '../columns';
var createGroupLookup = function createGroupLookup(columnGroupingModel) {
  var groupLookup = {};
  columnGroupingModel.forEach(function (node) {
    if (isLeaf(node)) {
      return;
    }
    var groupId = node.groupId,
      children = node.children,
      other = _objectWithoutProperties(node, _excluded);
    if (!groupId) {
      throw new Error('MUI: An element of the columnGroupingModel does not have either `field` or `groupId`.');
    }
    if (!children) {
      console.warn("MUI: group groupId=".concat(groupId, " has no children."));
    }
    var groupParam = _extends({}, other, {
      groupId: groupId
    });
    var subTreeLookup = createGroupLookup(children);
    if (subTreeLookup[groupId] !== undefined || groupLookup[groupId] !== undefined) {
      throw new Error("MUI: The groupId ".concat(groupId, " is used multiple times in the columnGroupingModel."));
    }
    groupLookup = _extends({}, groupLookup, subTreeLookup, _defineProperty({}, groupId, groupParam));
  });
  return _extends({}, groupLookup);
};
export var columnGroupsStateInitializer = function columnGroupsStateInitializer(state, props, apiRef) {
  var _props$experimentalFe, _props$columnGrouping, _props$columnGrouping2, _apiRef$current$state;
  if (!((_props$experimentalFe = props.experimentalFeatures) != null && _props$experimentalFe.columnGrouping)) {
    return state;
  }
  var columnFields = gridColumnFieldsSelector(apiRef);
  var visibleColumnFields = gridVisibleColumnFieldsSelector(apiRef);
  var groupLookup = createGroupLookup((_props$columnGrouping = props.columnGroupingModel) != null ? _props$columnGrouping : []);
  var unwrappedGroupingModel = unwrapGroupingColumnModel((_props$columnGrouping2 = props.columnGroupingModel) != null ? _props$columnGrouping2 : []);
  var columnGroupsHeaderStructure = getColumnGroupsHeaderStructure(columnFields, unwrappedGroupingModel, // @ts-expect-error Move this part to `Pro` package
  (_apiRef$current$state = apiRef.current.state.pinnedColumns) != null ? _apiRef$current$state : {});
  var maxDepth = visibleColumnFields.length === 0 ? 0 : Math.max.apply(Math, _toConsumableArray(visibleColumnFields.map(function (field) {
    var _unwrappedGroupingMod, _unwrappedGroupingMod2;
    return (_unwrappedGroupingMod = (_unwrappedGroupingMod2 = unwrappedGroupingModel[field]) == null ? void 0 : _unwrappedGroupingMod2.length) != null ? _unwrappedGroupingMod : 0;
  })));
  return _extends({}, state, {
    columnGrouping: {
      lookup: groupLookup,
      unwrappedGroupingModel: unwrappedGroupingModel,
      headerStructure: columnGroupsHeaderStructure,
      maxDepth: maxDepth
    }
  });
};

/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 */
export var useGridColumnGrouping = function useGridColumnGrouping(apiRef, props) {
  var _props$experimentalFe3;
  /**
   * API METHODS
   */
  var getColumnGroupPath = React.useCallback(function (field) {
    var _unwrappedGroupingMod3;
    var unwrappedGroupingModel = gridColumnGroupsUnwrappedModelSelector(apiRef);
    return (_unwrappedGroupingMod3 = unwrappedGroupingModel[field]) != null ? _unwrappedGroupingMod3 : [];
  }, [apiRef]);
  var getAllGroupDetails = React.useCallback(function () {
    var columnGroupLookup = gridColumnGroupsLookupSelector(apiRef);
    return columnGroupLookup;
  }, [apiRef]);
  var columnGroupingApi = {
    unstable_getColumnGroupPath: getColumnGroupPath,
    unstable_getAllGroupDetails: getAllGroupDetails
  };
  useGridApiMethod(apiRef, columnGroupingApi, 'public');
  var handleColumnIndexChange = React.useCallback(function () {
    var _props$columnGrouping3;
    var unwrappedGroupingModel = unwrapGroupingColumnModel((_props$columnGrouping3 = props.columnGroupingModel) != null ? _props$columnGrouping3 : []);
    apiRef.current.setState(function (state) {
      var _state$columns$ordere, _state$columns, _state$pinnedColumns;
      var orderedFields = (_state$columns$ordere = (_state$columns = state.columns) == null ? void 0 : _state$columns.orderedFields) != null ? _state$columns$ordere : [];

      // @ts-expect-error Move this logic to `Pro` package
      var pinnedColumns = (_state$pinnedColumns = state.pinnedColumns) != null ? _state$pinnedColumns : {};
      var columnGroupsHeaderStructure = getColumnGroupsHeaderStructure(orderedFields, unwrappedGroupingModel, pinnedColumns);
      return _extends({}, state, {
        columnGrouping: _extends({}, state.columnGrouping, {
          headerStructure: columnGroupsHeaderStructure
        })
      });
    });
  }, [apiRef, props.columnGroupingModel]);
  var updateColumnGroupingState = React.useCallback(function (columnGroupingModel) {
    var _props$experimentalFe2, _apiRef$current$getPi, _apiRef$current$getPi2, _apiRef$current;
    if (!((_props$experimentalFe2 = props.experimentalFeatures) != null && _props$experimentalFe2.columnGrouping)) {
      return;
    }
    // @ts-expect-error Move this logic to `Pro` package
    var pinnedColumns = (_apiRef$current$getPi = (_apiRef$current$getPi2 = (_apiRef$current = apiRef.current).getPinnedColumns) == null ? void 0 : _apiRef$current$getPi2.call(_apiRef$current)) != null ? _apiRef$current$getPi : {};
    var columnFields = gridColumnFieldsSelector(apiRef);
    var visibleColumnFields = gridVisibleColumnFieldsSelector(apiRef);
    var groupLookup = createGroupLookup(columnGroupingModel != null ? columnGroupingModel : []);
    var unwrappedGroupingModel = unwrapGroupingColumnModel(columnGroupingModel != null ? columnGroupingModel : []);
    var columnGroupsHeaderStructure = getColumnGroupsHeaderStructure(columnFields, unwrappedGroupingModel, pinnedColumns);
    var maxDepth = visibleColumnFields.length === 0 ? 0 : Math.max.apply(Math, _toConsumableArray(visibleColumnFields.map(function (field) {
      var _unwrappedGroupingMod4, _unwrappedGroupingMod5;
      return (_unwrappedGroupingMod4 = (_unwrappedGroupingMod5 = unwrappedGroupingModel[field]) == null ? void 0 : _unwrappedGroupingMod5.length) != null ? _unwrappedGroupingMod4 : 0;
    })));
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        columnGrouping: {
          lookup: groupLookup,
          unwrappedGroupingModel: unwrappedGroupingModel,
          headerStructure: columnGroupsHeaderStructure,
          maxDepth: maxDepth
        }
      });
    });
  }, [apiRef, (_props$experimentalFe3 = props.experimentalFeatures) == null ? void 0 : _props$experimentalFe3.columnGrouping]);
  useGridApiEventHandler(apiRef, 'columnIndexChange', handleColumnIndexChange);
  useGridApiEventHandler(apiRef, 'columnsChange', function () {
    updateColumnGroupingState(props.columnGroupingModel);
  });
  useGridApiEventHandler(apiRef, 'columnVisibilityModelChange', function () {
    updateColumnGroupingState(props.columnGroupingModel);
  });

  /**
   * EFFECTS
   */
  React.useEffect(function () {
    updateColumnGroupingState(props.columnGroupingModel);
  }, [updateColumnGroupingState, props.columnGroupingModel]);
};