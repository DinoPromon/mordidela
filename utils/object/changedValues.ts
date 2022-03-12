export function getChangedValues<T>(initialState: T, currentState: T) {
  const changedValues: Partial<T> = {};

  for (const k in initialState) {
    const key = k as keyof T;

    if (
      initialState[key] !== null &&
      currentState[key] !== null &&
      typeof initialState[key] === "object" &&
      typeof currentState[key] === "object"
    ) {
      Object.defineProperty(changedValues, key, {
        value: getChangedValues(initialState[key], currentState[key]),
        enumerable: true,
      });
    } else {
      if (initialState[key] !== currentState[key]) {
        Object.defineProperty(changedValues, key, {
          value: currentState[key],
          enumerable: true,
        });
      }
    }
  }

  return changedValues;
}
