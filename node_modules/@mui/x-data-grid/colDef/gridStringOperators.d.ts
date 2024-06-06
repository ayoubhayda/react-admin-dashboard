import type { GridApplyQuickFilterV7 } from '../models/colDef/gridColDef';
import { GridFilterOperator } from '../models/gridFilterOperator';
export declare const getGridStringQuickFilterFn: (value: any) => GridApplyQuickFilterV7 | null;
export declare const getGridStringOperators: (disableTrim?: boolean) => GridFilterOperator<any, number | string | null, any>[];
