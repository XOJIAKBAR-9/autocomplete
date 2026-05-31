export function drop<T>(array: T[], n: number = 1): T[] {
  const result: T[] = [];
  const start = n < 0 ? 0 : n;

  for (let i = start; i < array.length; i++) {
    result[result.length] = array[i];
  }

  return result;
}
