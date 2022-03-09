import validator from "validator";

import { createDate } from "@utils/transformation/date";

export class InputParser {
  protected parse<T extends {}>(object: T) {
    const newObject: Partial<T> = {};

    for (const [key, value] of Object.entries(object || {})) {
      Object.defineProperty(newObject, key, {
        value: typeof value === "string" ? this.parseString(value) : value,
        configurable: false,
        enumerable: true,
      });
    }

    return newObject as T;
  }

  private parseString(string: string) {
    if (validator.isDate(string || "", { format: "DD/MM/YYYY", strictMode: true })) {
      return createDate(string);
    }

    return string.trim();
  }
}
