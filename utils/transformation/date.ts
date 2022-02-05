// class CustomDate {
//   private date: Date;

//   constructor(date: Date) {
//     this.date = date;
//   }

//   private padDayOrMonth(number: number) {
//     const paddedNumber = `${number}`.padStart(2, "0").slice(-2);

//     return paddedNumber;
//   }

//   public getFormatedHours() {
//     const hours = this.date.getHours();
//     const minutes = this.date.getMinutes();

//     return `${hours}:${minutes}`;
//   }

//   public static;
// }

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

function getDayOrMonthAsNumber(str: string, maxValue: number) {
  let number = parseInt(str);
  if (isNaN(number) || number <= 0 || number > maxValue) return 1;
  return number;
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
  if (subStr[0] !== "0" || subStr === "00") {
    const number = getDayOrMonthAsNumber(subStr, maxValue);
    subStr = padDayOrMonth(number, maxValue);
  }
  return subStr;
};

export const transformDate = (date: string) => {
  const fragmentedDate = date.split("/");
  fragmentedDate.reverse();
  const formatedDate = fragmentedDate.join("-");

  return formatedDate;
};
