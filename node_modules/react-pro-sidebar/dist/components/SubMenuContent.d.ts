import React from 'react';
import { CSSObject } from '@emotion/styled';
interface SubMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    transitionDuration?: number;
    open?: boolean;
    openWhenCollapsed?: boolean;
    firstLevel?: boolean;
    collapsed?: boolean;
    defaultOpen?: boolean;
    rootStyles?: CSSObject;
    children?: React.ReactNode;
}
export declare const SubMenuContent: React.ForwardRefExoticComponent<SubMenuContentProps & React.RefAttributes<HTMLDivElement>>;
export {};
