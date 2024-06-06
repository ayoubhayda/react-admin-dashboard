import { useLazyRef } from './useLazyRef';
import { useOnMount } from './useOnMount';
class Timeout {
  constructor() {
    this.currentId = 0;
    this.clear = () => {
      if (this.currentId !== 0) {
        clearTimeout(this.currentId);
        this.currentId = 0;
      }
    };
    this.disposeEffect = () => {
      return this.clear;
    };
  }
  static create() {
    return new Timeout();
  }
  start(delay, fn) {
    this.clear();
    this.currentId = setTimeout(fn, delay);
  }
}
export function useTimeout() {
  const timeout = useLazyRef(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}