import dateFormatter from "date-and-time";

export function createDate(date: string | number | Date) {
  if (date instanceof Date) return date;
  if (typeof date === "string") {
    const dateParts = date.split(/\//gi);
    const [day, month, year] = dateParts.map((datePart) => Number(datePart));
    return new Date(year, month - 1, day, 0, 0, 0);
  }

  return new Date(date);
}

export function getFormattedDate(unformattedDate: string | number | Date) {
  const newDate = createDate(unformattedDate);
  const formattedDate = dateFormatter.format(newDate, "DD/MM/YYYY");

  return formattedDate;
}

export function getHourFromDate(dateAsString: string) {
  const date = new Date(dateAsString);
  const hours = date.getHours();
  const minute = date.getMinutes();
  return `${hours}:${minute}`;
}

export const transformDayOrMonth = (subStr: string, maxValue: number) => {
  const numberDayOrMonth = Number(subStr);
  if (numberDayOrMonth > maxValue) String(maxValue);

  return subStr;
};

export const transformDate = (date: string) => {
  const fragmentedDate = date.split("/");
  fragmentedDate.reverse();
  const formatedDate = fragmentedDate.join("-");

  return formatedDate;
};
