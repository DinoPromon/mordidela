export class StringSerializer {
  public static exec<T extends {}>(object: T) {
    const newObject: Partial<T> = {};
    for (const [key, value] of Object.entries(object || {})) {
      Object.defineProperty(newObject, key, {
        value: typeof value === "string" ? value.trim() : value,
        configurable: false,
        enumerable: true,
      });
    }

    return newObject as T;
  }
}
