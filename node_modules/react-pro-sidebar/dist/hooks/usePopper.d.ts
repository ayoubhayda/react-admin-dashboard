import React from 'react';
import { createPopper } from '@popperjs/core';
interface PopperOptions {
    level: number;
    buttonRef: React.RefObject<HTMLAnchorElement>;
    contentRef: React.RefObject<HTMLDivElement>;
}
interface PopperResult {
    popperInstance?: ReturnType<typeof createPopper>;
}
export declare const usePopper: (options: PopperOptions) => PopperResult;
export {};
