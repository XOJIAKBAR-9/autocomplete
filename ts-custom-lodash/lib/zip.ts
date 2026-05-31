export function zip<T>(...arrays: T[][]): (T | undefined)[][] {
  const result: (T | undefined)[][] = [];
  let maxLength = 0;

  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length > maxLength) {
      maxLength = arrays[i].length;
    }
  }

  for (let i = 0; i < maxLength; i++) {
    const group: (T | undefined)[] = [];
    for (let j = 0; j < arrays.length; j++) {
      group[group.length] = arrays[j][i];
    }
    result[result.length] = group;
  }

  return result;
}
