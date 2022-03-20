import { getFormattedDate } from "@utils/transformation";
import { getFormattedHours, formatPhoneNumber } from "@utils/formatters";

import type ITelefone from "@models/telefone";
import type IEndereco from "@models/endereco";

export function getFormattedOrderDate(date: Date) {
  const parsedDate = new Date(date);

  return `${getFormattedDate(parsedDate)} - ${getFormattedHours(parsedDate)}`;
}

export function getFormattedOrderPhone(phone: ITelefone) {
  return formatPhoneNumber(phone.ddd.concat(phone.numero));
}

export function getFormattedAddress(address: IEndereco) {
  return `${address.logradouro} Nº ${address.numero}, ${address.bairro}`;
}
