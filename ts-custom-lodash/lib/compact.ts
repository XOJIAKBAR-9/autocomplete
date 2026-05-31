type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;

export function compact<T>(array: T[]): Truthy<T>[] {
  const result: Truthy<T>[] = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      result[result.length] = array[i] as Truthy<T>;
    }
  }

  return result;
}
