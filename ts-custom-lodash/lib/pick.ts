export function pick<T extends object, K extends keyof T>(object: T, ...paths: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];
    if (key in object) {
      result[key] = object[key];
    }
  }

  return result;
}
