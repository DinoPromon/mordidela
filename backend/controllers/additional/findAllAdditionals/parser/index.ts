import type { RawFindAllAdditionalsArg, FindAllAdditionalsArg } from "../types";

enum GetDeleted {
  TRUE = "1",
  FALSE = "0",
}

export class FindAllAdditionalsParser {
  private rawFindAllArg: RawFindAllAdditionalsArg;

  constructor(rawFindAllArg: RawFindAllAdditionalsArg) {
    this.rawFindAllArg = rawFindAllArg;
  }

  public parse(): FindAllAdditionalsArg {
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
