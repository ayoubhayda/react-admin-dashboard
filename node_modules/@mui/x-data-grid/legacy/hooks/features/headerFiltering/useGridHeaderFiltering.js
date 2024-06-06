import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils';
import { gridColumnLookupSelector, gridColumnVisibilityModelSelector, gridColumnFieldsSelector } from '../columns/gridColumnsSelector';
export var headerFilteringStateInitializer = function headerFilteringStateInitializer(state) {
  return _extends({}, state, {
    headerFiltering: {
      editing: null,
      menuOpen: null
    }
  });
};
export var useGridHeaderFiltering = function useGridHeaderFiltering(apiRef, props) {
  var logger = useGridLogger(apiRef, 'useGridHeaderFiltering');
  var setHeaderFilterState = React.useCallback(function (headerFilterState) {
    apiRef.current.setState(function (state) {
      var _headerFilterState$ed, _headerFilterState$me;
      // Safety check to avoid MIT users from using it
      // This hook should ultimately be moved to the Pro package
      if (props.signature === 'DataGrid') {
        return state;
      }
      return _extends({}, state, {
        headerFiltering: {
          editing: (_headerFilterState$ed = headerFilterState.editing) != null ? _headerFilterState$ed : null,
          menuOpen: (_headerFilterState$me = headerFilterState.menuOpen) != null ? _headerFilterState$me : null
        }
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef, props.signature]);
  var startHeaderFilterEditMode = React.useCallback(function (field) {
    logger.debug("Starting edit mode on header filter for field: ".concat(field));
    apiRef.current.setHeaderFilterState({
      editing: field
    });
  }, [apiRef, logger]);
  var stopHeaderFilterEditMode = React.useCallback(function () {
    logger.debug("Stopping edit mode on header filter");
    apiRef.current.setHeaderFilterState({
      editing: null
    });
  }, [apiRef, logger]);
  var showHeaderFilterMenu = React.useCallback(function (field) {
    logger.debug("Opening header filter menu for field: ".concat(field));
    apiRef.current.setHeaderFilterState({
      menuOpen: field
    });
  }, [apiRef, logger]);
  var hideHeaderFilterMenu = React.useCallback(function () {
    logger.debug("Hiding header filter menu for active field");
    var fieldToFocus = apiRef.current.state.headerFiltering.menuOpen;
    if (fieldToFocus) {
      var columnLookup = gridColumnLookupSelector(apiRef);
      var columnVisibilityModel = gridColumnVisibilityModelSelector(apiRef);
      var orderedFields = gridColumnFieldsSelector(apiRef);

      // If the column was removed from the grid, we need to find the closest visible field
      if (!columnLookup[fieldToFocus]) {
        fieldToFocus = orderedFields[0];
      }

      // If the field to focus is hidden, we need to find the closest visible field
      if (columnVisibilityModel[fieldToFocus] === false) {
        // contains visible column fields + the field that was just hidden
        var visibleOrderedFields = orderedFields.filter(function (field) {
          if (field === fieldToFocus) {
            return true;
          }
          return columnVisibilityModel[field] !== false;
        });
        var fieldIndex = visibleOrderedFields.indexOf(fieldToFocus);
        fieldToFocus = visibleOrderedFields[fieldIndex + 1] || visibleOrderedFields[fieldIndex - 1];
      }
      apiRef.current.setHeaderFilterState({
        menuOpen: null
      });
      apiRef.current.setColumnHeaderFilterFocus(fieldToFocus);
    }
  }, [apiRef, logger]);
  var headerFilterPrivateApi = {
    setHeaderFilterState: setHeaderFilterState
  };
  var headerFilterApi = {
    startHeaderFilterEditMode: startHeaderFilterEditMode,
    stopHeaderFilterEditMode: stopHeaderFilterEditMode,
    showHeaderFilterMenu: showHeaderFilterMenu,
    hideHeaderFilterMenu: hideHeaderFilterMenu
  };
  useGridApiMethod(apiRef, headerFilterApi, 'public');
  useGridApiMethod(apiRef, headerFilterPrivateApi, 'private');
};