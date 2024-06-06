/// <reference types="react" />
import { CSSObject } from '@emotion/styled';
interface StyledMenuSuffixProps {
    firstLevel?: boolean;
    collapsed?: boolean;
    transitionDuration?: number;
    rootStyles?: CSSObject;
}
export declare const StyledMenuSuffix: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & StyledMenuSuffixProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export {};
