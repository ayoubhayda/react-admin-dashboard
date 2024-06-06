import * as React from 'react';
import { DataGridProps } from '../models/props/DataGridProps';
import { GridValidRowModel } from '../models/gridRows';
interface DataGridComponent {
    <R extends GridValidRowModel = any>(props: DataGridProps<R> & React.RefAttributes<HTMLDivElement>): React.JSX.Element;
    propTypes?: any;
}
/**
 * Demos:
 * - [DataGrid](https://mui.com/x/react-data-grid/demo/)
 *
 * API:
 * - [DataGrid API](https://mui.com/x/api/data-grid/data-grid/)
 */
export declare const DataGrid: DataGridComponent;
/**
 * Remove at v7
 * @deprecated
 */
export declare const SUBMIT_FILTER_STROKE_TIME: number;
/**
 * Remove at v7
 * @deprecated
 */
export declare const SUBMIT_FILTER_DATE_STROKE_TIME: number;
export {};
