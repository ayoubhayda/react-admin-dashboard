import * as React from 'react';
import { GridApiCommunity } from '../models/api/gridApiCommunity';
import { GetApplyFilterFnV7, GetApplyFilterFnLegacy, GridFilterOperator } from '../models';
import { GetApplyQuickFilterFnV7, GetApplyQuickFilterFnLegacy } from '../models/colDef/gridColDef';
/**
 * A global API ref, for v7-to-legacy converter
 */
export declare const GLOBAL_API_REF: {
    current: React.MutableRefObject<GridApiCommunity> | null;
};
/**
 * A tagger to determine if the filter is internal or custom user-supplied.
 * To be a valid internal filter, the v7 function *must* be defined/redefined at
 * the same time as the legacy one.
 * https://github.com/mui/mui-x/pull/9254#discussion_r1231095551
 */
export declare function tagInternalFilter<T>(fn: T): T;
export declare function isInternalFilter(fn: Function | undefined): boolean;
export declare function convertFilterV7ToLegacy(fn: GetApplyFilterFnV7): GetApplyFilterFnLegacy;
export declare function convertLegacyOperators(ops: Omit<GridFilterOperator, 'getApplyFilterFn'>[]): GridFilterOperator[];
export declare function convertQuickFilterV7ToLegacy(fn: GetApplyQuickFilterFnV7): GetApplyQuickFilterFnLegacy<any, any, any>;
