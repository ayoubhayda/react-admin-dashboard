type UseRootElementNameParameters = {
    /**
     * The HTML element expected to be rendered, e.g. 'div', 'button' etc
     * @default ''
     */
    rootElementName?: keyof HTMLElementTagNameMap;
    /**
     * The name of the component using useRootElementName.
     * For debugging purposes.
     */
    componentName?: string;
};
/**
 * @ignore - do not document.
 *
 * Use this function determine the host element correctly on the server (in a SSR context, e.g. Next.js)
 */
export declare function useRootElementName(parameters: UseRootElementNameParameters): [string, (instance: HTMLElement | null) => void];
export {};
