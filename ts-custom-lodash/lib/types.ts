export type ArrayPredicate<T> = (value: T, index: number, array: T[]) => boolean;

export type ObjectPredicate<T> = (value: T[keyof T], key: keyof T, collection: T) => boolean;
