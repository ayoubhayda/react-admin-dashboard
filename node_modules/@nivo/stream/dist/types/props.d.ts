/// <reference types="react" />
import { StackOrder, StackOffset, AreaCurve } from '@nivo/core';
import { StreamLayerId } from './types';
export declare const defaultProps: {
    label: string;
    order: StackOrder;
    offsetType: StackOffset;
    curve: AreaCurve;
    axisBottom: {};
    axisLeft: {};
    enableGridX: boolean;
    enableGridY: boolean;
    colors: import("@nivo/colors").OrdinalColorScaleConfig<Omit<import("./types").StreamLayerData, "label" | "color" | "data">>;
    fillOpacity: number;
    borderWidth: number;
    borderColor: import("@nivo/colors").InheritedColorConfig<import("./types").StreamLayerData>;
    enableDots: boolean;
    dotPosition: "start" | "center" | "end";
    dotComponent: ({ x, y, size, color, borderWidth, borderColor, }: import("./StreamDotsItem").StreamDotsItemProps) => JSX.Element;
    dotSize: number;
    dotColor: {
        from: string;
    };
    dotBorderWidth: number;
    dotBorderColor: {
        from: string;
    };
    isInteractive: boolean;
    tooltip: ({ layer }: import("./types").TooltipProps) => JSX.Element;
    enableStackTooltip: boolean;
    stackTooltip: ({ slice }: import("./types").StackTooltipProps) => JSX.Element;
    legends: never[];
    legendLabel: string;
    role: string;
};
export declare const svgDefaultProps: {
    layers: StreamLayerId[];
    defs: never[];
    fill: never[];
    animate: boolean;
    motionConfig: string;
    role: string;
    isFocusable: boolean;
    label: string;
    order: StackOrder;
    offsetType: StackOffset;
    curve: AreaCurve;
    axisBottom: {};
    axisLeft: {};
    enableGridX: boolean;
    enableGridY: boolean;
    colors: import("@nivo/colors").OrdinalColorScaleConfig<Omit<import("./types").StreamLayerData, "label" | "color" | "data">>;
    fillOpacity: number;
    borderWidth: number;
    borderColor: import("@nivo/colors").InheritedColorConfig<import("./types").StreamLayerData>;
    enableDots: boolean;
    dotPosition: "start" | "center" | "end";
    dotComponent: ({ x, y, size, color, borderWidth, borderColor, }: import("./StreamDotsItem").StreamDotsItemProps) => JSX.Element;
    dotSize: number;
    dotColor: {
        from: string;
    };
    dotBorderWidth: number;
    dotBorderColor: {
        from: string;
    };
    isInteractive: boolean;
    tooltip: ({ layer }: import("./types").TooltipProps) => JSX.Element;
    enableStackTooltip: boolean;
    stackTooltip: ({ slice }: import("./types").StackTooltipProps) => JSX.Element;
    legends: never[];
    legendLabel: string;
};
//# sourceMappingURL=props.d.ts.map