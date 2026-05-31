import { ArrayPredicate } from "./types";

export function dropWhile<T>(array: T[], predicate: ArrayPredicate<T>): T[] {
  const result: T[] = [];
  let dropping = true;

  for (let i = 0; i < array.length; i++) {
    if (dropping && predicate(array[i], i, array)) {
      continue;
    }
    dropping = false;
    result[result.length] = array[i];
  }

  return result;
}
