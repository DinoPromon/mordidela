import {
  transformDate,
  transformDateFromDBToClient,
  transformDayOrMonth,
  getFormatedDate,
} from "./date";
import { treatErrorMessage } from "./error";
import { transformDeliveryType } from "./delivery";
import { getHourFromDate } from "./date";
import { clearPhoneNumber, getDDDFromTelefone, getNumberFromTelefone } from "./phone";
import { toCamelCase } from "./string";
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
  transformDeliveryType,
  toCamelCase,
  transformPriceToString,
  getHourFromDate,
  removeSpaces,
  getFormatedDate,
};
