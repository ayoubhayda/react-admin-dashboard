declare class Timeout {
    static create(): Timeout;
    currentId: number;
    start(delay: number, fn: Function): void;
    clear: () => void;
    disposeEffect: () => () => void;
}
export declare function useTimeout(): Timeout;
export {};
