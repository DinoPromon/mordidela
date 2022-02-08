export function getFormatedDate(timestamp: number) {
  const date = new Date(timestamp);
  const day = padDayOrMonth(date.getDate(), 2);
  const month = padDayOrMonth(date.getMonth() + 1, 2);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function padDayOrMonth(num: number, max: number) {
  return `${num}`.padStart(max, "0").slice(-max);
}

export const transformDateFromDBToClient = (databaseDate: string) => {
  const date = new Date(databaseDate);
  const day = padDayOrMonth(date.getDate(), 31);
  const month = padDayOrMonth(date.getMonth() + 1, 12);
  const year = date.getFullYear();

  const clientDate = `${day}/${month}/${year}`;

  return clientDate;
};

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

export function createDate(date: string | number) {
  if (typeof date === "string") {
    const dateParts = date.split(/\//gi);
    const [day, month, year] = dateParts.map((datePart) => Number(datePart));
    return new Date(year, month - 1, day, 0, 0, 0);
  }

  return new Date(date);
}
