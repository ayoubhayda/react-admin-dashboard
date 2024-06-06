/// <reference types="react" />
import { StreamSvgProps, StreamLayerDatum, StreamDatum } from './types';
interface StreamDotsProps<RawDatum extends StreamDatum> {
    id: string | number;
    color: string;
    data: StreamLayerDatum[];
    dotComponent: Exclude<StreamSvgProps<RawDatum>['dotComponent'], undefined>;
    position: 'start' | 'center' | 'end';
    getSize: (datum: StreamLayerDatum) => number;
    getColor: (datum: StreamLayerDatum) => string;
    getBorderWidth: (datum: StreamLayerDatum) => number;
    getBorderColor: (datum: StreamLayerDatum) => string;
}
export declare const StreamDots: <RawDatum extends StreamDatum>({ data, dotComponent, position, getSize, getColor, getBorderWidth, getBorderColor, }: StreamDotsProps<RawDatum>) => JSX.Element;
export {};
//# sourceMappingURL=StreamDots.d.ts.map