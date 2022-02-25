import { transformDate, transformDayOrMonth, getFormattedDate } from "./date";
import { treatErrorMessage } from "./error";
import { transformDeliveryType } from "./delivery";
import { getHourFromDate } from "./date";
import { clearPhoneNumber, getDDDFromTelefone, getNumberFromTelefone } from "./phone";
import { toCamelCase } from "./string";
import { transformPriceStringToNumber, transformPriceToString } from "./price";

import { removeSpaces } from "./string";

export {
  toCamelCase,
  removeSpaces,
  transformDate,
  getHourFromDate,
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
