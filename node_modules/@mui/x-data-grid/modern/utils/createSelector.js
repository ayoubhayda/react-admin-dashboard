import { createSelector as reselectCreateSelector } from 'reselect';
import { buildWarning } from './warning';
const cacheContainer = {
  cache: new WeakMap()
};
const missingInstanceIdWarning = buildWarning(['MUI: A selector was called without passing the instance ID, which may impact the performance of the grid.', 'To fix, call it with `apiRef`, e.g. `mySelector(apiRef)`, or pass the instance ID explicitly, e.g. `mySelector(state, apiRef.current.instanceId)`.']);
function checkIsAPIRef(value) {
  return 'current' in value && 'instanceId' in value.current;
}
const DEFAULT_INSTANCE_ID = {
  id: 'default'
};
export const createSelector = (a, b, c, d, e, f, ...rest) => {
  if (rest.length > 0) {
    throw new Error('Unsupported number of selectors');
  }
  let selector;
  if (a && b && c && d && e && f) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
      const vb = b(state, instanceId);
      const vc = c(state, instanceId);
      const vd = d(state, instanceId);
      const ve = e(state, instanceId);
      return f(va, vb, vc, vd, ve);
    };
  } else if (a && b && c && d && e) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
      const vb = b(state, instanceId);
      const vc = c(state, instanceId);
      const vd = d(state, instanceId);
      return e(va, vb, vc, vd);
    };
  } else if (a && b && c && d) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
      const vb = b(state, instanceId);
      const vc = c(state, instanceId);
      return d(va, vb, vc);
    };
  } else if (a && b && c) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
      const vb = b(state, instanceId);
      return c(va, vb);
    };
  } else if (a && b) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
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
export const createSelectorMemoized = (...args) => {
  const selector = (...selectorArgs) => {
    const [stateOrApiRef, instanceId] = selectorArgs;
    const isAPIRef = checkIsAPIRef(stateOrApiRef);
    const cacheKey = isAPIRef ? stateOrApiRef.current.instanceId : instanceId ?? DEFAULT_INSTANCE_ID;
    const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
    if (process.env.NODE_ENV !== 'production') {
      if (cacheKey.id === 'default') {
        missingInstanceIdWarning();
      }
    }
    const {
      cache
    } = cacheContainer;
    if (cache.get(cacheKey) && cache.get(cacheKey)?.get(args)) {
      // We pass the cache key because the called selector might have as
      // dependency another selector created with this `createSelector`.
      return cache.get(cacheKey)?.get(args)(state, cacheKey);
    }
    const newSelector = reselectCreateSelector(...args);
    if (!cache.get(cacheKey)) {
      cache.set(cacheKey, new Map());
    }
    cache.get(cacheKey)?.set(args, newSelector);
    return newSelector(state, cacheKey);
  };

  // We use this property to detect if the selector was created with createSelector
  // or it's only a simple function the receives the state and returns part of it.
  selector.acceptsApiRef = true;
  return selector;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_resetCreateSelectorCache = () => {
  cacheContainer.cache = new WeakMap();
};