import type { RawFindAllCategoriesArg, FindAllCategoriesArg } from "../types";

enum GetDeleted {
  TRUE = "1",
  FALSE = "0",
}

export class FindAllCategoriesParser {
  private rawFindAllArg: RawFindAllCategoriesArg;

  constructor(rawFindAllArg: RawFindAllCategoriesArg) {
    this.rawFindAllArg = rawFindAllArg;
  }

  public parse(): FindAllCategoriesArg {
    return {
      getDeleted: this.parseGetDeleted(),
    };
  }

  private parseGetDeleted() {
    const { getDeleted } = this.rawFindAllArg;

    if (!getDeleted || Array.isArray(getDeleted)) return false;

    return getDeleted === GetDeleted.TRUE;
  }
}
