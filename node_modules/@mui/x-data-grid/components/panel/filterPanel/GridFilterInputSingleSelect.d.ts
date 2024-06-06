import * as React from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { GridFilterInputValueProps } from './GridFilterInputValueProps';
import { GridSingleSelectColDef } from '../../../models/colDef/gridColDef';
export type GridFilterInputSingleSelectProps = GridFilterInputValueProps & TextFieldProps & Pick<GridSingleSelectColDef, 'getOptionLabel' | 'getOptionValue'> & {
    clearButton?: React.ReactNode | null;
    /**
     * It is `true` if the filter either has a value or an operator with no value
     * required is selected (e.g. `isEmpty`)
     */
    isFilterActive?: boolean;
    type?: 'singleSelect';
};
declare function GridFilterInputSingleSelect(props: GridFilterInputSingleSelectProps): React.JSX.Element | null;
declare namespace GridFilterInputSingleSelect {
    var propTypes: any;
}
export { GridFilterInputSingleSelect };
