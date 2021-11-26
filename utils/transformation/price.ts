export function transformPriceToString(price: number) {
  const fixedPrice = price.toFixed(2);
  return fixedPrice.replace('.', ',');
}