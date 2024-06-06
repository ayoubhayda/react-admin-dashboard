interface ProSidebarResult {
    /**
     * a function that enables you to update the sidebar's collapsed status
     */
    collapseSidebar: (collapsed?: boolean) => void;
    /**
     * a function that enables you to update the sidebar's toggled status
     */
    toggleSidebar: (toggled?: boolean) => void;
    /**
     * sidebar breakpoint status
     * value is set to true when screen size reaches the breakpoint
     */
    broken: boolean;
    /**
     * sidebar collapsed status
     */
    collapsed: boolean;
    /**
     * sidebar toggled status
     */
    toggled: boolean;
    /**
     * sidebar rtl status
     */
    rtl: boolean;
}
/**
 * @deprecated
 * `useProSidebar` is deprecated and will be removed in the next major release.
 *  please use Sidebar props instead.
 */
export declare const useProSidebar: () => ProSidebarResult;
export {};
