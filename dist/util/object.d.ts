export declare function isObjectInclude<ObjectType>(object: ObjectType, query: {
    [key: string]: unknown;
}): boolean;
export declare function getMapFromObject<MapType>(object: {
    [key: string]: unknown;
}, keyMap: MapType): MapType;
