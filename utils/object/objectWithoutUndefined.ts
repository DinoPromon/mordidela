export function getObjectWithouUndefined<T>(values: T) {
  const valuesWithoutUndefined: Partial<T> = {};

  for (const k in values) {
    const key = k as keyof T;
    if (values[key] !== undefined) {
      Object.defineProperty(valuesWithoutUndefined, key, {
        value: values[key],
        enumerable: true,
      });
    }
  }

  return valuesWithoutUndefined;
}
