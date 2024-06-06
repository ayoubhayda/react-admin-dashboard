import { StreamCommonProps, StreamCustomLayerProps, StreamDataProps, StreamDatum, StreamLayerData, StreamLayerDatum, StreamSliceData } from './types';
export declare const useStream: <RawDatum extends StreamDatum>({ width, height, data, keys, label, valueFormat, offsetType, order, curve, colors, borderColor, dotSize, dotColor, dotBorderWidth, dotBorderColor, }: {
    width: number;
    height: number;
    data: RawDatum[];
    keys: Exclude<keyof RawDatum, symbol>[];
    label?: import("@nivo/core").PropertyAccessor<Omit<StreamLayerData, "label" | "color" | "data">, string | number> | undefined;
    valueFormat?: import("@nivo/core").ValueFormat<number, void> | undefined;
    offsetType?: import("@nivo/core").StackOffset | undefined;
    order?: import("@nivo/core").StackOrder | undefined;
    curve?: import("@nivo/core").AreaCurve | undefined;
    colors?: import("@nivo/colors").OrdinalColorScaleConfig<Omit<StreamLayerData, "label" | "color" | "data">> | undefined;
    dotSize?: number | ((datum: StreamLayerDatum) => number) | undefined;
    dotColor?: import("@nivo/colors").InheritedColorConfig<StreamLayerDatum> | undefined;
    dotBorderWidth?: number | ((datum: StreamLayerDatum) => number) | undefined;
    dotBorderColor?: import("@nivo/colors").InheritedColorConfig<StreamLayerDatum> | undefined;
    borderColor?: import("@nivo/colors").InheritedColorConfig<StreamLayerData> | undefined;
}) => {
    xScale: import("@nivo/scales").ScalePoint<number>;
    yScale: import("@nivo/scales").ScaleLinear<number>;
    layers: StreamLayerData[];
    slices: StreamSliceData[];
    getBorderColor: import("@nivo/colors").InheritedColorConfigCustomFunction<StreamLayerData> | ((d: StreamLayerData) => any);
    getDotSize: (datum: StreamLayerDatum) => number;
    getDotColor: import("@nivo/colors").InheritedColorConfigCustomFunction<StreamLayerDatum> | ((d: StreamLayerDatum) => any);
    getDotBorderWidth: (datum: StreamLayerDatum) => number;
    getDotBorderColor: import("@nivo/colors").InheritedColorConfigCustomFunction<StreamLayerDatum> | ((d: StreamLayerDatum) => any);
    layerContext: StreamCustomLayerProps;
};
//# sourceMappingURL=hooks.d.ts.map