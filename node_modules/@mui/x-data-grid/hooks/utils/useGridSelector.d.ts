import * as React from 'react';
import { GridApiCommon } from '../../models/api/gridApiCommon';
import { OutputSelector } from '../../utils/createSelector';
import { fastObjectShallowCompare } from '../../utils/fastObjectShallowCompare';
export declare const objectShallowCompare: typeof fastObjectShallowCompare;
export declare const useGridSelector: <Api extends GridApiCommon<any, any>, T>(apiRef: React.MutableRefObject<Api>, selector: OutputSelector<Api["state"], T> | ((state: Api["state"]) => T), equals?: (a: T, b: T) => boolean) => T;
