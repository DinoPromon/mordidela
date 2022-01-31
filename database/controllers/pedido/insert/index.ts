import { Prisma } from "database";
import { CartPedido } from "@models/pedido";
import { CupomRepo } from "@controllers/cupom";

export async function createOrder(order: CartPedido) {
  const { id_cupom, id_endereco, id_usuario, tipo_entrega, tipo_pagamento, troco_para } = order;
  const cupom = id_cupom ? await CupomRepo.findByCupomId(id_cupom) : null;
  const cupomCode = cupom ? cupom.codigo : null;

  const [result] = (await Prisma.$queryRaw`
    SELECT f_insert_pedido(${cupomCode}, ${id_usuario}, ${id_endereco}, ${tipo_entrega}, ${tipo_pagamento}, ${troco_para})
  `) as unknown[];

  const createdOrderId = Object.values(result as { [key: string]: unknown })[0] as number;
  return createdOrderId;
}
