import { transformDayOrMonth } from "@utils/transformation";

export function formatDateInput(date: string) {
  let input = date;
  if (/\D\/$/.test(date)) {
    input = date.substring(0, date.length - 3);
  }
  const values = input.split("/").map((value) => {
    return value.replace(/\D/g, "");
  });

  console.log(values);

  if (values[0]) values[0] = transformDayOrMonth(values[0], 31);
  if (values[1]) values[1] = transformDayOrMonth(values[1], 12);

  const outputDate = values.map((value, index) => {
    return value.length === 2 && index < 2 ? `${value}/` : value;
  });

  return outputDate.join("").substring(0, 14);
}

export function maskDate(dateInput: string) {
  if (dateInput.match(/^\d{2}$/) !== null) {
    return `${dateInput}/`;
  } else if (dateInput.match(/^\d{2}\/\d{2}$/) !== null) {
    return `${dateInput}/`;
  }
  return dateInput;
}

export function dateChangeHandler(curDate: string, prevDate: string) {
  let changedDate = curDate;
  if (curDate + "/" === prevDate) {
    changedDate = curDate.substring(0, curDate.length - 1);
  } else {
    changedDate = formatDateInput(curDate);
  }
  return changedDate;
}
