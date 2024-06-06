import * as React from 'react';
import { UseGridColumnHeadersProps } from '../hooks/features/columnHeaders/useGridColumnHeaders';
interface GridColumnHeadersProps extends React.HTMLAttributes<HTMLDivElement>, Omit<UseGridColumnHeadersProps, 'innerRef'> {
    innerRef?: React.Ref<HTMLDivElement>;
}
declare const MemoizedGridColumnHeaders: React.ForwardRefExoticComponent<GridColumnHeadersProps & React.RefAttributes<HTMLDivElement>>;
export { MemoizedGridColumnHeaders as GridColumnHeaders };
