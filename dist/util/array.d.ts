export declare function arrayMove(list: Array<unknown>, fromIndex: number, toIndex: number): void;
export declare function findInArray<ItemType>(list: Array<ItemType>, query: {
    [key: string]: unknown;
}): ItemType | null;
export declare function findInArrayEnsure<ItemType>(list: Array<ItemType>, query: {
    [key: string]: unknown;
}, defaultValue: ItemType): ItemType;
export declare function findManyInArray<ItemType>(list: Array<ItemType>, query: {
    [key: string]: unknown;
}): Array<ItemType>;
export declare function findByValue<ItemType>(list: Array<ItemType>, value: unknown): ItemType | null;
export declare function findByValueEnsure<ItemType>(list: Array<ItemType>, value: unknown, defaultValue: ItemType): ItemType;
