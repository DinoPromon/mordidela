import { transformPriceToString, transformPriceStringToNumber } from "@utils/transformation";

export function formatCurrency(inputText: string) {
  const pattern = /\d$/;

  if (pattern.test(inputText)) {
    const price = transformPriceStringToNumber(inputText);
    return transformPriceToString(price);
  }
  return inputText.slice(0, inputText.length - 1);
}
