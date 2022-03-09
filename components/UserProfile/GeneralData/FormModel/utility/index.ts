export async function validateDate(date: string) {
  const validator = (await import("validator")).default;
  const isDateValid = validator.isDate(date, { format: "DD/MM/YYYY", strictMode: true });
  return isDateValid;
}
