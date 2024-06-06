/// <reference types="react" />
import { InheritedColorConfigCustomFunction } from '@nivo/colors';
import { StreamCommonProps, StreamLayerData, StreamDatum } from './types';
interface StreamLayersProps<RawDatum extends StreamDatum> {
    layers: StreamLayerData[];
    fillOpacity: number;
    borderWidth: number;
    getBorderColor: InheritedColorConfigCustomFunction<StreamLayerData>;
    isInteractive: boolean;
    tooltip: StreamCommonProps<RawDatum>['tooltip'];
}
export declare const StreamLayers: <RawDatum extends StreamDatum>({ layers, fillOpacity, borderWidth, getBorderColor, isInteractive, tooltip, }: StreamLayersProps<RawDatum>) => JSX.Element;
export {};
//# sourceMappingURL=StreamLayers.d.ts.map