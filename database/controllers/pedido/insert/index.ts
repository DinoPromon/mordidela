import Pedido from "@models/pedido";
import mysql, { serialize } from "database";
import { CartPedido } from "@models/pedido";
import { getCupomById } from "@controllers/cupom";
import { getDeliveryPriceByUserId } from "@controllers/entrega";

export async function insertPedido(pedido: CartPedido) {
  const { id_cupom, id_usuario, tipo_entrega, tipo_pagamento, troco_para } = pedido;
  const cupom = await getCupomById(id_cupom);

  const preco_entrega = await getDeliveryPriceByUserId(id_usuario);
  const shouldRemoveDeliveryPrice = tipo_entrega === "balcao" || (cupom && cupom.tipo === "entrega");
  const query = shouldRemoveDeliveryPrice
    ? "SELECT f_insert_pedido(?, ?, (SELECT id_endereco FROM endereco WHERE id_usuario = ?), ?, ?, ?, ?)"
    : "SELECT f_insert_pedido(?, ?, (SELECT id_endereco FROM endereco WHERE id_usuario = ?), ?, ?, ?, ?)";

  const codigoCupom = cupom ? cupom.codigo : undefined;

  const params = shouldRemoveDeliveryPrice
    ? [codigoCupom, id_usuario, id_usuario, 0.0, tipo_entrega, tipo_pagamento, troco_para || 0]
    : [codigoCupom, id_usuario, id_usuario, preco_entrega, tipo_entrega, tipo_pagamento, troco_para || 0];

  const result = (await mysql.query(query, params)) as Pick<Pedido, "id_pedido">[];

  const serializedResult = serialize(result);
  return Object.values(serializedResult[0])[0];
}
