import { TipoPagamento } from "@models/pedido";
import { getNumberAsCurrency } from "@utils/transformation";

import type { IOrderRelations } from "@models/pedido";

export function getOrderPaymentTypeText(orderRelations: IOrderRelations) {
  switch (orderRelations.tipo_pagamento) {
    case TipoPagamento.CREDITO:
      return "crédito";
    case TipoPagamento.DEBITO:
      return "débito";
    case TipoPagamento.DINHEIRO:
      if (orderRelations.troco_para)
        return `dinheiro (troco para ${getNumberAsCurrency(orderRelations.troco_para)})`;
      return `dinheiro`;
    default:
      const exhaustiveCheck = orderRelations.tipo_pagamento;
      return exhaustiveCheck;
  }
}
