export function chunk<T>(array: T[], size: number = 1): T[][] {
  const result: T[][] = [];
  let currentChunk: T[] = [];
  const safeSize = size < 1 ? 1 : size;

  for (let i = 0; i < array.length; i++) {
    currentChunk[currentChunk.length] = array[i];
    if (currentChunk.length === safeSize || i === array.length - 1) {
      result[result.length] = currentChunk;
      currentChunk = [];
    }
  }

  return result;
}
