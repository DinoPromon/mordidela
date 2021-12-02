import { transformPriceStringToNumber } from "@utils/transformation/price";
import { transformPriceToString } from "@utils/transformation/price";

export function formatPrice(inputText: string) {
  const pattern = /\d$/;

  if (pattern.test(inputText)) {
    const price = transformPriceStringToNumber(inputText);
    return transformPriceToString(price);
  }
  return inputText.slice(0, inputText.length - 1);
}
