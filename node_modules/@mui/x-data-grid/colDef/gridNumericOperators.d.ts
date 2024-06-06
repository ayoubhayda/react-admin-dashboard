import { GridFilterOperator } from '../models/gridFilterOperator';
import type { GridApplyQuickFilterV7 } from '../models/colDef/gridColDef';
export declare const getGridNumericQuickFilterFn: (value: any) => GridApplyQuickFilterV7 | null;
export declare const getGridNumericOperators: () => GridFilterOperator<any, number | string | null, any>[];
