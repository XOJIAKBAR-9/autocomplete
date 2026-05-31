export function toPairs<T extends object>(object: T): [keyof T, T[keyof T]][] {
  const result: [keyof T, T[keyof T]][] = [];

  for (const key in object) {
    result[result.length] = [key, object[key]];
  }

  return result;
}
