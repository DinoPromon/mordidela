import { Validation } from "@my-types/validation";

export const dateValidation: Validation = (date: string) => {
  const [day, month, year] = date.split("/").map((value) => parseInt(value));
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

  const dateAsTimestamp = Date.parse(`${year}-${month}-${day}`);

  if (isNaN(dateAsTimestamp)) return false;

  if (dateAsTimestamp > Date.now()) return false;

  return true;
};