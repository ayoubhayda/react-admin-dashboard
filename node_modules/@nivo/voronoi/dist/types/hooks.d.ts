import { Delaunay } from 'd3-delaunay';
import { XYAccessor } from './computeMesh';
import { VoronoiCommonProps, VoronoiDatum, VoronoiCustomLayerProps } from './types';
export declare const useVoronoiMesh: <Datum>({ points, x, y, width, height, debug, }: {
    points: Datum[];
    x?: XYAccessor<Datum> | undefined;
    y?: XYAccessor<Datum> | undefined;
    width: number;
    height: number;
    debug?: boolean | undefined;
}) => {
    delaunay: Delaunay<Delaunay.Point>;
    voronoi: import("d3-delaunay").Voronoi<Delaunay.Point> | undefined;
};
export declare const useVoronoi: ({ data, width, height, xDomain, yDomain, }: {
    data: VoronoiDatum[];
    width: number;
    height: number;
    xDomain: VoronoiCommonProps['xDomain'];
    yDomain: VoronoiCommonProps['yDomain'];
}) => {
    points: {
        x: number;
        y: number;
        data: VoronoiDatum;
    }[];
    delaunay: Delaunay<Delaunay.Point>;
    voronoi: import("d3-delaunay").Voronoi<Delaunay.Point>;
};
/**
 * Memoize the context to pass to custom layers.
 */
export declare const useVoronoiLayerContext: ({ points, delaunay, voronoi, }: VoronoiCustomLayerProps) => VoronoiCustomLayerProps;
//# sourceMappingURL=hooks.d.ts.map