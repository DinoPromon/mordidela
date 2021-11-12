const padDayOrMonth = (num: number, max: number) => {
  return num > parseInt(max.toString()[0]) && num.toString().length === 1 ? "0" + num : num.toString();
};

const getDayOrMonthAsNumber = (str: string, maxValue: number) => {
  let number = parseInt(str);
  if (isNaN(number) || number <= 0 || number > maxValue) return 1;
  return number;
};


const transformDayOrMonth = (subStr: string, maxValue: number) => {
  if (subStr[0] !== "0" || subStr === "00") {
    const number = getDayOrMonthAsNumber(subStr, maxValue);
    subStr = padDayOrMonth(number, maxValue);
  }
  return subStr;
};

export const formatDate = (date: string) => {
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