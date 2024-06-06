import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useLazyRef } from './useLazyRef';
import { useOnMount } from './useOnMount';
import { buildWarning } from '../../utils/warning';
import { fastObjectShallowCompare } from '../../utils/fastObjectShallowCompare';
var stateNotInitializedWarning = buildWarning(['MUI: `useGridSelector` has been called before the initialization of the state.', 'This hook can only be used inside the context of the grid.']);
function isOutputSelector(selector) {
  return selector.acceptsApiRef;
}
function applySelector(apiRef, selector) {
  if (isOutputSelector(selector)) {
    return selector(apiRef);
  }
  return selector(apiRef.current.state);
}
var defaultCompare = Object.is;
export var objectShallowCompare = fastObjectShallowCompare;
var createRefs = function createRefs() {
  return {
    state: null,
    equals: null,
    selector: null
  };
};
export var useGridSelector = function useGridSelector(apiRef, selector) {
  var equals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultCompare;
  if (process.env.NODE_ENV !== 'production') {
    if (!apiRef.current.state) {
      stateNotInitializedWarning();
    }
  }
  var refs = useLazyRef(createRefs);
  var didInit = refs.current.selector !== null;
  var _React$useState = React.useState(
    // We don't use an initialization function to avoid allocations
    didInit ? null : applySelector(apiRef, selector)),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    state = _React$useState2[0],
    setState = _React$useState2[1];
  refs.current.state = state;
  refs.current.equals = equals;
  refs.current.selector = selector;
  useOnMount(function () {
    return apiRef.current.store.subscribe(function () {
      var newState = applySelector(apiRef, refs.current.selector);
      if (!refs.current.equals(refs.current.state, newState)) {
        refs.current.state = newState;
        setState(newState);
      }
    });
  });
  return state;
};