import * as React from 'react';
var UNINITIALIZED = {};

// See https://github.com/facebook/react/issues/14490 for when to use this.
export function useLazyRef(init, initArg) {
  var ref = React.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}