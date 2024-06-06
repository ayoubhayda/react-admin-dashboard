import { Delaunay } from 'd3-delaunay';
type NumberPropertyNames<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];
export type XYAccessor<Datum> = NumberPropertyNames<Datum> | ((datum: Datum) => number);
/**
 * The delaunay generator requires an array
 * where each point is defined as an array
 * of 2 elements: [x: number, y: number].
 *
 * Points represent the raw input data
 * and x/y represent accessors to x & y.
 */
export declare const computeMeshPoints: <Datum>({ points, x, y, }: {
    points: Datum[];
    x?: XYAccessor<Datum> | undefined;
    y?: XYAccessor<Datum> | undefined;
}) => [number, number][];
export declare const computeMesh: ({ points, width, height, debug, }: {
    points: [number, number][];
    width: number;
    height: number;
    debug?: boolean | undefined;
}) => {
    delaunay: Delaunay<Delaunay.Point>;
    voronoi: import("d3-delaunay").Voronoi<Delaunay.Point> | undefined;
};
export {};
//# sourceMappingURL=computeMesh.d.ts.map