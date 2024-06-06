/// <reference types="react" />
import { StreamCommonProps, StreamDatum, StreamSliceData } from './types';
interface StreamSlicesItemProps<RawDatum extends StreamDatum> {
    slice: StreamSliceData;
    height: number;
    tooltip: StreamCommonProps<RawDatum>['stackTooltip'];
}
export declare const StreamSlicesItem: <RawDatum extends StreamDatum>({ slice, height, tooltip, }: StreamSlicesItemProps<RawDatum>) => JSX.Element;
export {};
//# sourceMappingURL=StreamSlicesItem.d.ts.map