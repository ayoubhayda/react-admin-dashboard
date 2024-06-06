import * as React from 'react';
interface GridColumnGroupHeaderProps {
    groupId: string | null;
    width: number;
    fields: string[];
    colIndex: number;
    isLastColumn: boolean;
    depth: number;
    maxDepth: number;
    height: number;
    hasFocus?: boolean;
    tabIndex: 0 | -1;
}
declare function GridColumnGroupHeader(props: GridColumnGroupHeaderProps): React.JSX.Element;
export { GridColumnGroupHeader };
