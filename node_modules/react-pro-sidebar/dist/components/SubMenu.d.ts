import React from 'react';
import { CSSObject } from '@emotion/styled';
export interface SubMenuProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'prefix'> {
    /**
     * The label to be displayed in the menu item
     */
    label?: string | React.ReactNode;
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
     * set open value to control the open state of the sub menu
     */
    open?: boolean;
    /**
     * set defaultOpen value to set the initial open state of the sub menu
     */
    defaultOpen?: boolean;
    /**
     * If set to true, the menu item will have an active state
     */
    active?: boolean;
    /**
     * If set to true, the menu item will be disabled
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
    /**
     * callback function to be called when the open state of the sub menu changes
     * @param open
     */
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
}
export declare const SubMenuFR: React.ForwardRefRenderFunction<HTMLLIElement, SubMenuProps>;
export declare const SubMenu: React.ForwardRefExoticComponent<SubMenuProps & React.RefAttributes<HTMLLIElement>>;
