import type { RawFindAllFlavorsArg, FindAllFlavorsArg } from "../types";

enum GetDeleted {
  TRUE = "1",
  FALSE = "0",
}

export class FindAllFlavorsParser {
  private rawFindAllArg: RawFindAllFlavorsArg;

  constructor(rawFindAllArg: RawFindAllFlavorsArg) {
    this.rawFindAllArg = rawFindAllArg;
  }

  public parse(): FindAllFlavorsArg {
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
