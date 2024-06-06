import React from 'react';
interface SidebarState {
    collapsed?: boolean;
    toggled?: boolean;
    broken?: boolean;
    rtl?: boolean;
    transitionDuration?: number;
}
export interface LegacySidebarContextProps extends SidebarState {
    updateSidebarState: (values: SidebarState) => void;
    updateCollapseState: () => void;
    updateToggleState: () => void;
}
interface SidebarProviderProps {
    children?: React.ReactNode;
}
export declare const LegacySidebarContext: React.Context<LegacySidebarContextProps | undefined>;
export declare const SidebarProvider: React.FC<SidebarProviderProps>;
export {};
