export function pickBy<T extends object>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result = {} as Partial<T>;

  for (const key in object) {
    if (predicate(object[key], key as keyof T)) {
      result[key as keyof Partial<T>] = object[key];
    }
  }

  return result;
}
