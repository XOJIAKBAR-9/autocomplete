export function map<T, U>(array: T[], iteratee: (value: T, index: number, array: T[]) => U): U[] {
  const result: U[] = [];

  for (let i = 0; i < array.length; i++) {
    result[result.length] = iteratee(array[i], i, array);
  }

  return result;
}
