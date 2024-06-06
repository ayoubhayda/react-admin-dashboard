import * as React from 'react';
import { GridRenderContext, GridRowEntry } from '../../../models';
import { GridRowId, GridRowModel } from '../../../models/gridRows';
export declare function binarySearch(offset: number, positions: number[], sliceStart?: number, sliceEnd?: number): number;
export declare const getRenderableIndexes: ({ firstIndex, lastIndex, buffer, minFirstIndex, maxLastIndex, }: {
    firstIndex: number;
    lastIndex: number;
    buffer: number;
    minFirstIndex: number;
    maxLastIndex: number;
}) => number[];
export declare const areRenderContextsEqual: (context1: GridRenderContext, context2: GridRenderContext) => boolean;
interface UseGridVirtualScrollerProps {
    ref: React.Ref<HTMLDivElement>;
    renderZoneMinColumnIndex?: number;
    renderZoneMaxColumnIndex?: number;
    onRenderZonePositioning?: (params: {
        top: number;
        left: number;
    }) => void;
    getRowProps?: (id: GridRowId, model: GridRowModel) => any;
}
export declare const useGridVirtualScroller: (props: UseGridVirtualScrollerProps) => {
    renderContext: GridRenderContext | null;
    updateRenderZonePosition: (nextRenderContext: GridRenderContext) => void;
    getRows: (params?: {
        renderContext: GridRenderContext | null;
        position?: string | undefined;
        minFirstColumn?: number | undefined;
        maxLastColumn?: number | undefined;
        availableSpace?: number | null | undefined;
        rows?: GridRowEntry<import("../../../models").GridValidRowModel>[] | undefined;
        rowIndexOffset?: number | undefined;
        onRowRender?: ((rowId: GridRowId) => void) | undefined;
    }) => React.JSX.Element[] | null;
    getRootProps: (inputProps?: {
        style?: object;
    }) => {
        style: React.CSSProperties;
        role: string;
        ref: ((instance: HTMLDivElement | null) => void) | null;
        onScroll: (event: React.UIEvent) => void;
        onWheel: (event: React.WheelEvent) => void;
        onTouchMove: (event: React.TouchEvent) => void;
    };
    getContentProps: ({ style }?: {
        style?: object | undefined;
    }) => {
        style: React.CSSProperties;
        role: string;
    };
    getRenderZoneProps: () => {
        ref: React.RefObject<HTMLDivElement>;
        role: string;
    };
};
export {};
