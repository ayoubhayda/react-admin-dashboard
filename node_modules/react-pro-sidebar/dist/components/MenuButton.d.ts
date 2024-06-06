import React from 'react';
interface MenuButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'prefix'> {
    component?: string | React.ReactElement;
    children?: React.ReactNode;
}
interface MenuButtonStylesProps {
    level: number;
    collapsed?: boolean;
    rtl?: boolean;
    disabled?: boolean;
    active?: boolean;
}
export declare const menuButtonStyles: (props: MenuButtonStylesProps) => string;
export declare const MenuButtonRef: React.ForwardRefRenderFunction<HTMLAnchorElement, MenuButtonProps>;
export declare const MenuButton: React.ForwardRefExoticComponent<MenuButtonProps & React.RefAttributes<HTMLAnchorElement>>;
export {};
