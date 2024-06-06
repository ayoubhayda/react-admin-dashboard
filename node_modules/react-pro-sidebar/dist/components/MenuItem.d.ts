import React from 'react';
import { CSSObject } from '@emotion/styled';
export interface MenuItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'prefix'> {
    /**
     * The icon to be displayed in the menu item
     */
    icon?: React.ReactNode;
    /**
     * The prefix to be displayed in the menu item
     */
    prefix?: React.ReactNode;
    /**
     * The suffix to be displayed in the menu item
     */
    suffix?: React.ReactNode;
    /**
     * If set to true, the menu item will have an active state
     * @default ```false```
     */
    active?: boolean;
    /**
     * If set to true, the menu item will be disabled
     * @default ```false```
     */
    disabled?: boolean;
    /**
     * The component to be rendered as the menu item button
     */
    component?: string | React.ReactElement;
    /**
     * Apply styles from the root element
     */
    rootStyles?: CSSObject;
    children?: React.ReactNode;
}
export declare const MenuItemFR: React.ForwardRefRenderFunction<HTMLLIElement, MenuItemProps>;
export declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLLIElement>>;
