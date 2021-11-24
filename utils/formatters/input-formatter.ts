import { transformDayOrMonth } from "@utils/transformation/date";
import { removeSpaces } from "@utils/transformation/string";

export const formatDateInput = (date: string) => {
  let input = date;
  if (/\D\/$/.test(date)) {
    input = date.substr(0, date.length - 3);
  }
  const values = input.split("/").map((value) => {
    return value.replace(/\D/g, "");
  });

  if (values[0]) values[0] = transformDayOrMonth(values[0], 31);
  if (values[1]) values[1] = transformDayOrMonth(values[1], 12);

  const outputDate = values.map((value, index) => {
    return value.length === 2 && index < 2 ? `${value}/` : value;
  });
  return outputDate.join("").substr(0, 14);
};

export const removeAditionalSpaces = (input: string) => {
  input = input.trim();
  const duplicateSpacePattern = /\s+/g;
  return input.replace(duplicateSpacePattern, " ");
};

export const dateChangeHandler = (curDate: string, prevDate: string) => {
  let changedDate = curDate;
  if (curDate + "/" === prevDate) {
    changedDate = curDate.substr(0, curDate.length - 1);
  } else {
    changedDate = formatDateInput(curDate);
  }
  return changedDate;
};

export const cupomFormat = (text: string) => {
  return text.toLocaleUpperCase();
};

export const formatProductId = (name: string, addsAmount: number, flavorsAmount: number, id: string) => {
  return `${removeSpaces(name)}-${addsAmount}-${flavorsAmount}-${id}`;
};
