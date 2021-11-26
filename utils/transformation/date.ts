export const padDayOrMonth = (num: number, max: number) => {
  return num > parseInt(max.toString()[0]) && num.toString().length === 1 ? "0" + num : num.toString();
};

export const transformDateFromDBToClient = (databaseDate: string) => {
  const date = new Date(databaseDate);
  const day = padDayOrMonth(date.getDate(), 31);
  const month = padDayOrMonth(date.getMonth() + 1, 12);
  const year = date.getFullYear();

  const clientDate = `${day}/${month}/${year}`;

  return clientDate;
};

export const transformDayOrMonth = (subStr: string, maxValue: number) => {
  if (subStr[0] !== "0" || subStr === "00") {
    const number = getDayOrMonthAsNumber(subStr, maxValue);
    subStr = padDayOrMonth(number, maxValue);
  }
  return subStr;
};

const getDayOrMonthAsNumber = (str: string, maxValue: number) => {
  let number = parseInt(str);
  if (isNaN(number) || number <= 0 || number > maxValue) return 1;
  return number;
};

export const transformDate = (date: string) => {
  const fragmentedDate = date.split('/');
  fragmentedDate.reverse();
  const formatedDate = fragmentedDate.join('-');

  return formatedDate;
};