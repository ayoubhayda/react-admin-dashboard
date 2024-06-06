import { GridSlotsComponentsProps } from '../../models/gridSlotsComponentsProps';
import { GridSlotsComponent } from '../../models';
interface WithComponents {
    components?: Partial<GridSlotsComponent>;
    componentsProps?: GridSlotsComponentsProps;
}
export declare function useProps<T extends WithComponents>(allProps: T): readonly [Partial<GridSlotsComponent> | undefined, GridSlotsComponentsProps | undefined, Omit<T, "components" | "componentsProps">];
export {};
