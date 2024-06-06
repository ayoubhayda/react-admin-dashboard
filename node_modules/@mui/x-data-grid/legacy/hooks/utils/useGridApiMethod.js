import * as React from 'react';
export function useGridApiMethod(privateApiRef, apiMethods, visibility) {
  var isFirstRender = React.useRef(true);
  React.useEffect(function () {
    isFirstRender.current = false;
    privateApiRef.current.register(visibility, apiMethods);
  }, [privateApiRef, visibility, apiMethods]);
  if (isFirstRender.current) {
    privateApiRef.current.register(visibility, apiMethods);
  }
}