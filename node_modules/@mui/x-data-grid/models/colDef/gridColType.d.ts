type LiteralUnion<LiteralType, BaseType> = LiteralType | (BaseType & Record<never, never>);
export type GridNativeColTypes = 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';
export type GridColType = LiteralUnion<GridNativeColTypes, string>;
export {};
