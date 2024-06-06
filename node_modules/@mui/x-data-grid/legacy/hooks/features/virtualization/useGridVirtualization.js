import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
export var virtualizationStateInitializer = function virtualizationStateInitializer(state, props) {
  var virtualization = {
    enabled: !props.disableVirtualization,
    enabledForColumns: true
  };
  return _extends({}, state, {
    virtualization: virtualization
  });
};
export function useGridVirtualization(apiRef, props) {
  /*
   * API METHODS
   */

  var setVirtualization = function setVirtualization(enabled) {
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        virtualization: _extends({}, state.virtualization, {
          enabled: enabled
        })
      });
    });
  };
  var setColumnVirtualization = function setColumnVirtualization(enabled) {
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        virtualization: _extends({}, state.virtualization, {
          enabledForColumns: enabled
        })
      });
    });
  };
  var api = {
    unstable_setVirtualization: setVirtualization,
    unstable_setColumnVirtualization: setColumnVirtualization
  };
  useGridApiMethod(apiRef, api, 'public');

  /*
   * EFFECTS
   */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(function () {
    setVirtualization(!props.disableVirtualization);
  }, [props.disableVirtualization]);
  /* eslint-enable react-hooks/exhaustive-deps */
}