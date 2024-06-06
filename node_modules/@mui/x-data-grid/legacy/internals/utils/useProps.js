import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["components", "componentsProps"];
import * as React from 'react';
/** Gathers props for the root element into a single `.forwardedProps` field */
function groupForwardedProps(props) {
  var _props$forwardedProps;
  var keys = Object.keys(props);
  if (!keys.some(function (key) {
    return key.startsWith('aria-') || key.startsWith('data-');
  })) {
    return props;
  }
  var newProps = {};
  var forwardedProps = (_props$forwardedProps = props.forwardedProps) != null ? _props$forwardedProps : {};
  for (var i = 0; i < keys.length; i += 1) {
    var _key = keys[i];
    if (_key.startsWith('aria-') || _key.startsWith('data-')) {
      forwardedProps[_key] = props[_key];
    } else {
      newProps[_key] = props[_key];
    }
  }
  newProps.forwardedProps = forwardedProps;
  return newProps;
}
export function useProps(allProps) {
  return React.useMemo(function () {
    var components = allProps.components,
      componentsProps = allProps.componentsProps,
      themedProps = _objectWithoutProperties(allProps, _excluded);
    return [components, componentsProps, groupForwardedProps(themedProps)];
  }, [allProps]);
}