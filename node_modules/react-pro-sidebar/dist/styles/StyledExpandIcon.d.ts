/// <reference types="react" />
import { CSSObject } from '@emotion/styled';
interface StyledExpandIconProps {
    open?: boolean;
    rtl?: boolean;
}
interface StyledExpandIconWrapperProps {
    collapsed?: boolean;
    level?: number;
    rtl?: boolean;
    rootStyles?: CSSObject;
}
export declare const StyledExpandIconWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & StyledExpandIconWrapperProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export declare const StyledExpandIcon: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & StyledExpandIconProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export declare const StyledExpandIconCollapsed: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export {};
