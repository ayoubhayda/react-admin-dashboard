import * as React from 'react';
export declare function useLazyRef<T, U>(init: (arg?: U) => T, initArg?: U): React.MutableRefObject<T>;
