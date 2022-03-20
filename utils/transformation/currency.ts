export function getNumberAsCurrency(number: number) {
  const formatedDefaultPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);

  return formatedDefaultPrice;
}