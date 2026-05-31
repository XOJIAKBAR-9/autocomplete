import { isObject } from "./utils/helpers";

export function includes<T>(
  collection: T[] | Record<string, T> | string,
  value: T,
  fromIndex: number = 0,
): boolean {
  if (Array.isArray(collection) || typeof collection === "string") {
    const start = fromIndex < 0 ? collection.length + fromIndex : fromIndex;
    const actualStart = start < 0 ? 0 : start;

    for (let i = actualStart; i < collection.length; i++) {
      if (collection[i as keyof typeof collection] === value) {
        return true;
      }
      if (Number.isNaN(collection[i as keyof typeof collection]) && Number.isNaN(value)) {
        return true;
      }
    }
    return false;
  }

  if (isObject(collection)) {
    for (const key in collection) {
      if (collection[key as keyof typeof collection] === value) {
        return true;
      }
    }
  }

  return false;
}
