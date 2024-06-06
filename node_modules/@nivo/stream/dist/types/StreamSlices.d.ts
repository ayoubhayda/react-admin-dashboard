/// <reference types="react" />
import { StreamSliceData, StreamDatum, StreamCommonProps } from './types';
interface StreamSlicesProps<RawDatum extends StreamDatum> {
    slices: StreamSliceData[];
    height: number;
    tooltip: StreamCommonProps<RawDatum>['stackTooltip'];
}
export declare const StreamSlices: <RawDatum extends StreamDatum>({ slices, height, tooltip, }: StreamSlicesProps<RawDatum>) => JSX.Element;
export {};
//# sourceMappingURL=StreamSlices.d.ts.map