import { isObject } from "./utils/helpers";

export function filter<T>(
  collection: T[],
  predicate: (value: T, index: number, array: T[]) => boolean,
): T[];
export function filter<T extends Record<string, unknown>>(
  collection: T,
  predicate: (value: T[keyof T], key: string, collection: T) => boolean,
): T[keyof T][];
export function filter(
  collection: unknown,
  predicate: (value: unknown, key: unknown, col: unknown) => boolean,
): unknown[] {
  const result: unknown[] = [];

  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i], i, collection)) {
        result[result.length] = collection[i];
      }
    }
  } else if (isObject(collection)) {
    for (const key in collection) {
      if (predicate(collection[key], key, collection)) {
        result[result.length] = collection[key];
      }
    }
  }

  return result;
}
