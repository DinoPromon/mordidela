import { transformDate, transformDateFromDBToClient, transformDayOrMonth } from "./date";
import { treatErrorMessage } from "./error";
import { clearPhoneNumber, getDDDFromTelefone, getNumberFromTelefone } from "./phone";
import { transformPriceStringToNumber, transformPriceToString } from "./price";
import { removeSpaces } from "./string";

export {
  transformDate,
  transformDateFromDBToClient,
  transformDayOrMonth,
  treatErrorMessage,
  clearPhoneNumber,
  getDDDFromTelefone,
  getNumberFromTelefone,
  transformPriceStringToNumber,
  transformPriceToString,
  removeSpaces,
};
