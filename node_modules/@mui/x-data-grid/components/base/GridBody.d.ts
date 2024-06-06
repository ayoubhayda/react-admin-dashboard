import * as React from 'react';
interface GridBodyProps {
    children?: React.ReactNode;
    ColumnHeadersProps?: Record<string, any>;
    VirtualScrollerComponent: React.JSXElementConstructor<React.HTMLAttributes<HTMLDivElement> & {
        ref: React.Ref<HTMLDivElement>;
    }>;
}
declare function GridBody(props: GridBodyProps): React.JSX.Element;
declare namespace GridBody {
    var propTypes: any;
}
export { GridBody };
