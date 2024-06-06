'use client';

import useLazyRef from '../useLazyRef/useLazyRef';
import useOnMount from '../useOnMount/useOnMount';
export class Timeout {
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
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = 0;
      fn();
    }, delay);
  }
}
export default function useTimeout() {
  const timeout = useLazyRef(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}