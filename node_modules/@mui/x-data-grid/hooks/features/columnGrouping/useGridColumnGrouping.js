import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["groupId", "children"];
import * as React from 'react';
import { isLeaf } from '../../../models/gridColumnGrouping';
import { gridColumnGroupsLookupSelector, gridColumnGroupsUnwrappedModelSelector } from './gridColumnGroupsSelector';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { getColumnGroupsHeaderStructure, unwrapGroupingColumnModel } from './gridColumnGroupsUtils';
import { useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { gridColumnFieldsSelector, gridVisibleColumnFieldsSelector } from '../columns';
const createGroupLookup = columnGroupingModel => {
  let groupLookup = {};
  columnGroupingModel.forEach(node => {
    if (isLeaf(node)) {
      return;
    }
    const {
        groupId,
        children
      } = node,
      other = _objectWithoutPropertiesLoose(node, _excluded);
    if (!groupId) {
      throw new Error('MUI: An element of the columnGroupingModel does not have either `field` or `groupId`.');
    }
    if (!children) {
      console.warn(`MUI: group groupId=${groupId} has no children.`);
    }
    const groupParam = _extends({}, other, {
      groupId
    });
    const subTreeLookup = createGroupLookup(children);
    if (subTreeLookup[groupId] !== undefined || groupLookup[groupId] !== undefined) {
      throw new Error(`MUI: The groupId ${groupId} is used multiple times in the columnGroupingModel.`);
    }
    groupLookup = _extends({}, groupLookup, subTreeLookup, {
      [groupId]: groupParam
    });
  });
  return _extends({}, groupLookup);
};
export const columnGroupsStateInitializer = (state, props, apiRef) => {
  var _props$experimentalFe, _props$columnGrouping, _props$columnGrouping2, _apiRef$current$state;
  if (!((_props$experimentalFe = props.experimentalFeatures) != null && _props$experimentalFe.columnGrouping)) {
    return state;
  }
  const columnFields = gridColumnFieldsSelector(apiRef);
  const visibleColumnFields = gridVisibleColumnFieldsSelector(apiRef);
  const groupLookup = createGroupLookup((_props$columnGrouping = props.columnGroupingModel) != null ? _props$columnGrouping : []);
  const unwrappedGroupingModel = unwrapGroupingColumnModel((_props$columnGrouping2 = props.columnGroupingModel) != null ? _props$columnGrouping2 : []);
  const columnGroupsHeaderStructure = getColumnGroupsHeaderStructure(columnFields, unwrappedGroupingModel, // @ts-expect-error Move this part to `Pro` package
  (_apiRef$current$state = apiRef.current.state.pinnedColumns) != null ? _apiRef$current$state : {});
  const maxDepth = visibleColumnFields.length === 0 ? 0 : Math.max(...visibleColumnFields.map(field => {
    var _unwrappedGroupingMod, _unwrappedGroupingMod2;
    return (_unwrappedGroupingMod = (_unwrappedGroupingMod2 = unwrappedGroupingModel[field]) == null ? void 0 : _unwrappedGroupingMod2.length) != null ? _unwrappedGroupingMod : 0;
  }));
  return _extends({}, state, {
    columnGrouping: {
      lookup: groupLookup,
      unwrappedGroupingModel,
      headerStructure: columnGroupsHeaderStructure,
      maxDepth
    }
  });
};

/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 */
export const useGridColumnGrouping = (apiRef, props) => {
  var _props$experimentalFe3;
  /**
   * API METHODS
   */
  const getColumnGroupPath = React.useCallback(field => {
    var _unwrappedGroupingMod3;
    const unwrappedGroupingModel = gridColumnGroupsUnwrappedModelSelector(apiRef);
    return (_unwrappedGroupingMod3 = unwrappedGroupingModel[field]) != null ? _unwrappedGroupingMod3 : [];
  }, [apiRef]);
  const getAllGroupDetails = React.useCallback(() => {
    const columnGroupLookup = gridColumnGroupsLookupSelector(apiRef);
    return columnGroupLookup;
  }, [apiRef]);
  const columnGroupingApi = {
    unstable_getColumnGroupPath: getColumnGroupPath,
    unstable_getAllGroupDetails: getAllGroupDetails
  };
  useGridApiMethod(apiRef, columnGroupingApi, 'public');
  const handleColumnIndexChange = React.useCallback(() => {
    var _props$columnGrouping3;
    const unwrappedGroupingModel = unwrapGroupingColumnModel((_props$columnGrouping3 = props.columnGroupingModel) != null ? _props$columnGrouping3 : []);
    apiRef.current.setState(state => {
      var _state$columns$ordere, _state$columns, _state$pinnedColumns;
      const orderedFields = (_state$columns$ordere = (_state$columns = state.columns) == null ? void 0 : _state$columns.orderedFields) != null ? _state$columns$ordere : [];

      // @ts-expect-error Move this logic to `Pro` package
      const pinnedColumns = (_state$pinnedColumns = state.pinnedColumns) != null ? _state$pinnedColumns : {};
      const columnGroupsHeaderStructure = getColumnGroupsHeaderStructure(orderedFields, unwrappedGroupingModel, pinnedColumns);
      return _extends({}, state, {
        columnGrouping: _extends({}, state.columnGrouping, {
          headerStructure: columnGroupsHeaderStructure
        })
      });
    });
  }, [apiRef, props.columnGroupingModel]);
  const updateColumnGroupingState = React.useCallback(columnGroupingModel => {
    var _props$experimentalFe2, _apiRef$current$getPi, _apiRef$current$getPi2, _apiRef$current;
    if (!((_props$experimentalFe2 = props.experimentalFeatures) != null && _props$experimentalFe2.columnGrouping)) {
      return;
    }
    // @ts-expect-error Move this logic to `Pro` package
    const pinnedColumns = (_apiRef$current$getPi = (_apiRef$current$getPi2 = (_apiRef$current = apiRef.current).getPinnedColumns) == null ? void 0 : _apiRef$current$getPi2.call(_apiRef$current)) != null ? _apiRef$current$getPi : {};
    const columnFields = gridColumnFieldsSelector(apiRef);
    const visibleColumnFields = gridVisibleColumnFieldsSelector(apiRef);
    const groupLookup = createGroupLookup(columnGroupingModel != null ? columnGroupingModel : []);
    const unwrappedGroupingModel = unwrapGroupingColumnModel(columnGroupingModel != null ? columnGroupingModel : []);
    const columnGroupsHeaderStructure = getColumnGroupsHeaderStructure(columnFields, unwrappedGroupingModel, pinnedColumns);
    const maxDepth = visibleColumnFields.length === 0 ? 0 : Math.max(...visibleColumnFields.map(field => {
      var _unwrappedGroupingMod4, _unwrappedGroupingMod5;
      return (_unwrappedGroupingMod4 = (_unwrappedGroupingMod5 = unwrappedGroupingModel[field]) == null ? void 0 : _unwrappedGroupingMod5.length) != null ? _unwrappedGroupingMod4 : 0;
    }));
    apiRef.current.setState(state => {
      return _extends({}, state, {
        columnGrouping: {
          lookup: groupLookup,
          unwrappedGroupingModel,
          headerStructure: columnGroupsHeaderStructure,
          maxDepth
        }
      });
    });
  }, [apiRef, (_props$experimentalFe3 = props.experimentalFeatures) == null ? void 0 : _props$experimentalFe3.columnGrouping]);
  useGridApiEventHandler(apiRef, 'columnIndexChange', handleColumnIndexChange);
  useGridApiEventHandler(apiRef, 'columnsChange', () => {
    updateColumnGroupingState(props.columnGroupingModel);
  });
  useGridApiEventHandler(apiRef, 'columnVisibilityModelChange', () => {
    updateColumnGroupingState(props.columnGroupingModel);
  });

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    updateColumnGroupingState(props.columnGroupingModel);
  }, [updateColumnGroupingState, props.columnGroupingModel]);
};