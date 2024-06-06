import * as React from 'react';
import { GridPanelWrapperProps } from './GridPanelWrapper';
import type { GridColDef } from '../../models/colDef/gridColDef';
export interface GridColumnsPanelProps extends GridPanelWrapperProps {
    sort?: 'asc' | 'desc';
    searchPredicate?: (column: GridColDef, searchValue: string) => boolean;
    /**
     * If `true`, the column search field will be focused automatically.
     * If `false`, the first column switch input will be focused automatically.
     * This helps to avoid input keyboard panel to popup automatically on touch devices.
     * @default true
     */
    autoFocusSearchField?: boolean;
    /**
     * If `true`, the `Hide all` button will not be displayed.
     * @default false
     */
    disableHideAllButton?: boolean;
    /**
     * If `true`, the `Show all` button will be disabled
     * @default false
     */
    disableShowAllButton?: boolean;
    /**
     * Returns the list of togglable columns.
     * If used, only those columns will be displayed in the panel
     * which are passed as the return value of the function.
     * @param {GridColDef[]} columns The `ColDef` list of all columns.
     * @returns {GridColDef['field'][]} The list of togglable columns' field names.
     */
    getTogglableColumns?: (columns: GridColDef[]) => GridColDef['field'][];
}
declare function GridColumnsPanel(props: GridColumnsPanelProps): React.JSX.Element;
declare namespace GridColumnsPanel {
    var propTypes: any;
}
export { GridColumnsPanel };
