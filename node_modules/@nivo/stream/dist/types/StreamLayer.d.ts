/// <reference types="react" />
import { InheritedColorConfigCustomFunction } from '@nivo/colors';
import { StreamCommonProps, StreamDatum, StreamLayerData } from './types';
interface StreamLayerProps<RawDatum extends StreamDatum> {
    layer: StreamLayerData;
    fillOpacity: number;
    borderWidth: number;
    getBorderColor: InheritedColorConfigCustomFunction<StreamLayerData>;
    isInteractive: boolean;
    tooltip: StreamCommonProps<RawDatum>['tooltip'];
}
export declare const StreamLayer: <RawDatum extends StreamDatum>({ layer, fillOpacity, borderWidth, getBorderColor, isInteractive, tooltip, }: StreamLayerProps<RawDatum>) => JSX.Element;
export {};
//# sourceMappingURL=StreamLayer.d.ts.map