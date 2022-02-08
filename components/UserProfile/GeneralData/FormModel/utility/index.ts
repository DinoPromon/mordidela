import validator from "validator";

export function validateDate(date: string) {
  const isDateValid = validator.isDate(date, { format: "DD/MM/YYYY", strictMode: true });
  return isDateValid;
}
