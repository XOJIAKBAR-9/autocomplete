export function take<T>(array: T[], n: number = 1): T[] {
  const result: T[] = [];
  const limit = n > array.length ? array.length : n < 0 ? 0 : n;

  for (let i = 0; i < limit; i++) {
    result[result.length] = array[i];
  }

  return result;
}
