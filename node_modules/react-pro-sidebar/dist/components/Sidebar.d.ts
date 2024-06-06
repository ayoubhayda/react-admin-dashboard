import React from 'react';
import { CSSObject } from '@emotion/styled';
declare type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'always' | 'all';
export interface SidebarProps extends React.HTMLAttributes<HTMLHtmlElement> {
    /**
     * sidebar collapsed status
     */
    collapsed?: boolean;
    /**
     * width of the sidebar
     * @default ```250px```
     */
    width?: string;
    /**
     * width of the sidebar when collapsed
     * @default ```80px```
     */
    collapsedWidth?: string;
    /**
     * initial collapsed status
     * @default ```false```
     *
     * @deprecated use ```collapsed``` instead
     */
    defaultCollapsed?: boolean;
    /**
     * set when the sidebar should trigger responsiveness behavior
     * @type `xs | sm | md | lg | xl | xxl | all | undefined`
     */
    breakPoint?: BreakPoint;
    /**
     * alternative breakpoint value that will be used to trigger responsiveness
     *
     */
    customBreakPoint?: string;
    /**
     * sidebar background color
     */
    backgroundColor?: string;
    /**
     * duration for the transition in milliseconds to be used in collapse and toggle behavior
     * @default ```300```
     */
    transitionDuration?: number;
    /**
     * sidebar background image
     */
    image?: string;
    /**
     * sidebar direction
     */
    rtl?: boolean;
    /**
     * sidebar toggled status
     */
    toggled?: boolean;
    /**
     * callback function to be called when backdrop is clicked
     */
    onBackdropClick?: () => void;
    /**
     * callback function to be called when sidebar's broken state changes
     */
    onBreakPoint?: (broken: boolean) => void;
    /**
     * sidebar styles to be applied from the root element
     */
    rootStyles?: CSSObject;
    children?: React.ReactNode;
}
interface SidebarContextProps {
    collapsed?: boolean;
    toggled?: boolean;
    rtl?: boolean;
    transitionDuration?: number;
}
export declare const SidebarContext: React.Context<SidebarContextProps>;
export declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLHtmlElement>>;
export {};
