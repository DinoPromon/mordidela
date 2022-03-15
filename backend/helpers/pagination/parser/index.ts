import { InputParser } from "@helpers/input";
import type { PaginatedSearchArg, PaginationData } from "../types";

type DataParserArg = {
  [key in keyof PaginatedSearchArg]: string | string[];
};

export class PaginationHelperParser extends InputParser {
  private dataParserArg: DataParserArg;

  constructor(dataParserArg: DataParserArg) {
    super();
    this.dataParserArg = this.parse(dataParserArg);
  }

  protected getParsedArg() {
    const findAllOrdersGeneralData: PaginationData = {
      itemsAmount: this.dataParserArg.itemsAmount
        ? Number(this.dataParserArg.itemsAmount)
        : undefined,
      skip: this.dataParserArg.skip ? Number(this.dataParserArg.skip) : undefined,
    };

    return findAllOrdersGeneralData;
  }
}
