export function omit<T extends object, K extends keyof T>(object: T, ...paths: K[]): Omit<T, K> {
  const result = {} as Record<string, unknown>;

  for (const key in object) {
    let shouldOmit = false;
    for (let i = 0; i < paths.length; i++) {
      if ((key as unknown as K) === paths[i]) {
        shouldOmit = true;
        break;
      }
    }
    if (!shouldOmit) {
      result[key as string] = object[key];
    }
  }

  return result as Omit<T, K>;
}
