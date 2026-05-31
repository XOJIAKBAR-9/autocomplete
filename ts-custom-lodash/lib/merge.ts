import { isObject } from "./utils/helpers";

export function merge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  object: T,
  source: U,
): T & U {
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = object[key as unknown as keyof T];

    if (isObject(sourceValue) && isObject(targetValue)) {
      merge(targetValue as Record<string, unknown>, sourceValue);
    } else {
      (object as unknown as Record<string, unknown>)[key] = sourceValue;
    }
  }

  return object as T & U;
}
