import { transformDate, transformDayOrMonth, getFormattedDate } from "./date";
import { treatErrorMessage } from "./error";
import { transformDeliveryType } from "./delivery";
import { clearPhoneNumber, getDDDFromTelefone, getNumberFromTelefone } from "./phone";
import { toCamelCase } from "./string";
import { transformPriceStringToNumber, transformPriceToString } from "./price";

import { removeSpaces } from "./string";

export {
  toCamelCase,
  removeSpaces,
  transformDate,
  clearPhoneNumber,
  getFormattedDate,
  treatErrorMessage,
  getDDDFromTelefone,
  transformDayOrMonth,
  getNumberFromTelefone,
  transformDeliveryType,
  transformPriceToString,
  transformPriceStringToNumber,
};

export { getNumberAsCurrency } from "./currency";
