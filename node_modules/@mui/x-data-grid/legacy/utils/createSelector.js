import { createSelector as reselectCreateSelector } from 'reselect';
import { buildWarning } from './warning';
var cacheContainer = {
  cache: new WeakMap()
};
var missingInstanceIdWarning = buildWarning(['MUI: A selector was called without passing the instance ID, which may impact the performance of the grid.', 'To fix, call it with `apiRef`, e.g. `mySelector(apiRef)`, or pass the instance ID explicitly, e.g. `mySelector(state, apiRef.current.instanceId)`.']);
function checkIsAPIRef(value) {
  return 'current' in value && 'instanceId' in value.current;
}
var DEFAULT_INSTANCE_ID = {
  id: 'default'
};
export var createSelector = function createSelector(a, b, c, d, e, f) {
  if ((arguments.length <= 6 ? 0 : arguments.length - 6) > 0) {
    throw new Error('Unsupported number of selectors');
  }
  var selector;
  if (a && b && c && d && e && f) {
    selector = function selector(stateOrApiRef, instanceIdParam) {
      var isAPIRef = checkIsAPIRef(stateOrApiRef);
      var instanceId = instanceIdParam != null ? instanceIdParam : isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID;
      var state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      var va = a(state, instanceId);
      var vb = b(state, instanceId);
      var vc = c(state, instanceId);
      var vd = d(state, instanceId);
      var ve = e(state, instanceId);
      return f(va, vb, vc, vd, ve);
    };
  } else if (a && b && c && d && e) {
    selector = function selector(stateOrApiRef, instanceIdParam) {
      var isAPIRef = checkIsAPIRef(stateOrApiRef);
      var instanceId = instanceIdParam != null ? instanceIdParam : isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID;
      var state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      var va = a(state, instanceId);
      var vb = b(state, instanceId);
      var vc = c(state, instanceId);
      var vd = d(state, instanceId);
      return e(va, vb, vc, vd);
    };
  } else if (a && b && c && d) {
    selector = function selector(stateOrApiRef, instanceIdParam) {
      var isAPIRef = checkIsAPIRef(stateOrApiRef);
      var instanceId = instanceIdParam != null ? instanceIdParam : isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID;
      var state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      var va = a(state, instanceId);
      var vb = b(state, instanceId);
      var vc = c(state, instanceId);
      return d(va, vb, vc);
    };
  } else if (a && b && c) {
    selector = function selector(stateOrApiRef, instanceIdParam) {
      var isAPIRef = checkIsAPIRef(stateOrApiRef);
      var instanceId = instanceIdParam != null ? instanceIdParam : isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID;
      var state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      var va = a(state, instanceId);
      var vb = b(state, instanceId);
      return c(va, vb);
    };
  } else if (a && b) {
    selector = function selector(stateOrApiRef, instanceIdParam) {
      var isAPIRef = checkIsAPIRef(stateOrApiRef);
      var instanceId = instanceIdParam != null ? instanceIdParam : isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID;
      var state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      var va = a(state, instanceId);
      return b(va);
    };
  } else {
    throw new Error('Missing arguments');
  }

  // We use this property to detect if the selector was created with createSelector
  // or it's only a simple function the receives the state and returns part of it.
  selector.acceptsApiRef = true;
  return selector;
};
export var createSelectorMemoized = function createSelectorMemoized() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var selector = function selector() {
    var _cache$get, _cache$get3;
    for (var _len2 = arguments.length, selectorArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      selectorArgs[_key2] = arguments[_key2];
    }
    var stateOrApiRef = selectorArgs[0],
      instanceId = selectorArgs[1];
    var isAPIRef = checkIsAPIRef(stateOrApiRef);
    var cacheKey = isAPIRef ? stateOrApiRef.current.instanceId : instanceId != null ? instanceId : DEFAULT_INSTANCE_ID;
    var state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
    if (process.env.NODE_ENV !== 'production') {
      if (cacheKey.id === 'default') {
        missingInstanceIdWarning();
      }
    }
    var cache = cacheContainer.cache;
    if (cache.get(cacheKey) && (_cache$get = cache.get(cacheKey)) != null && _cache$get.get(args)) {
      var _cache$get2;
      // We pass the cache key because the called selector might have as
      // dependency another selector created with this `createSelector`.
      return (_cache$get2 = cache.get(cacheKey)) == null ? void 0 : _cache$get2.get(args)(state, cacheKey);
    }
    var newSelector = reselectCreateSelector.apply(void 0, args);
    if (!cache.get(cacheKey)) {
      cache.set(cacheKey, new Map());
    }
    (_cache$get3 = cache.get(cacheKey)) == null || _cache$get3.set(args, newSelector);
    return newSelector(state, cacheKey);
  };

  // We use this property to detect if the selector was created with createSelector
  // or it's only a simple function the receives the state and returns part of it.
  selector.acceptsApiRef = true;
  return selector;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export var unstable_resetCreateSelectorCache = function unstable_resetCreateSelectorCache() {
  cacheContainer.cache = new WeakMap();
};