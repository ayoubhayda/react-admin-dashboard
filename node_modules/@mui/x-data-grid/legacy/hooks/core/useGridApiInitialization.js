import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { Store } from '../../utils/Store';
import { useGridApiMethod } from '../utils/useGridApiMethod';
import { GridSignature } from '../utils/useGridApiEventHandler';
import { EventManager } from '../../utils/EventManager';
var SYMBOL_API_PRIVATE = Symbol('mui.api_private');
var isSyntheticEvent = function isSyntheticEvent(event) {
  return event.isPropagationStopped !== undefined;
};
export function unwrapPrivateAPI(publicApi) {
  return publicApi[SYMBOL_API_PRIVATE];
}
var globalId = 0;
function createPrivateAPI(publicApiRef) {
  var _publicApiRef$current;
  var existingPrivateApi = (_publicApiRef$current = publicApiRef.current) == null ? void 0 : _publicApiRef$current[SYMBOL_API_PRIVATE];
  if (existingPrivateApi) {
    return existingPrivateApi;
  }
  var state = {};
  var privateApi = {
    state: state,
    store: Store.create(state),
    instanceId: {
      id: globalId
    }
  };
  globalId += 1;
  privateApi.getPublicApi = function () {
    return publicApiRef.current;
  };
  privateApi.register = function (visibility, methods) {
    Object.keys(methods).forEach(function (methodName) {
      var method = methods[methodName];
      var currentPrivateMethod = privateApi[methodName];
      if ((currentPrivateMethod == null ? void 0 : currentPrivateMethod.spying) === true) {
        currentPrivateMethod.target = method;
      } else {
        privateApi[methodName] = method;
      }
      if (visibility === 'public') {
        var publicApi = publicApiRef.current;
        var currentPublicMethod = publicApi[methodName];
        if ((currentPublicMethod == null ? void 0 : currentPublicMethod.spying) === true) {
          currentPublicMethod.target = method;
        } else {
          publicApi[methodName] = method;
        }
      }
    });
  };
  privateApi.register('private', {
    caches: {},
    eventManager: new EventManager()
  });
  return privateApi;
}
function createPublicAPI(privateApiRef) {
  var publicApi = _defineProperty({
    get state() {
      return privateApiRef.current.state;
    },
    get store() {
      return privateApiRef.current.store;
    },
    get instanceId() {
      return privateApiRef.current.instanceId;
    }
  }, SYMBOL_API_PRIVATE, privateApiRef.current);
  return publicApi;
}
export function useGridApiInitialization(inputApiRef, props) {
  var publicApiRef = React.useRef();
  var privateApiRef = React.useRef();
  if (!privateApiRef.current) {
    privateApiRef.current = createPrivateAPI(publicApiRef);
  }
  if (!publicApiRef.current) {
    publicApiRef.current = createPublicAPI(privateApiRef);
  }
  var publishEvent = React.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var name = args[0],
      params = args[1],
      _args$ = args[2],
      event = _args$ === void 0 ? {} : _args$;
    event.defaultMuiPrevented = false;
    if (isSyntheticEvent(event) && event.isPropagationStopped()) {
      return;
    }
    var details = props.signature === GridSignature.DataGridPro ? {
      api: privateApiRef.current.getPublicApi()
    } : {};
    privateApiRef.current.eventManager.emit(name, params, event, details);
  }, [privateApiRef, props.signature]);
  var subscribeEvent = React.useCallback(function (event, handler, options) {
    privateApiRef.current.eventManager.on(event, handler, options);
    var api = privateApiRef.current;
    return function () {
      api.eventManager.removeListener(event, handler);
    };
  }, [privateApiRef]);
  useGridApiMethod(privateApiRef, {
    subscribeEvent: subscribeEvent,
    publishEvent: publishEvent
  }, 'public');
  React.useImperativeHandle(inputApiRef, function () {
    return publicApiRef.current;
  }, [publicApiRef]);
  React.useEffect(function () {
    var api = privateApiRef.current;
    return function () {
      api.publishEvent('unmount');
    };
  }, [privateApiRef]);
  return privateApiRef;
}