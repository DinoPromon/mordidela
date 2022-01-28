import mysql, { Prisma, serialize } from "database";
import Usuario from "@models/usuario";
import { ProdutoInViewPedidoForClient, ViewPedidoForClient } from "@models/views";
import { getAllProdutoInPedido } from "@controllers/pedido_produto";
import Cupom from "@models/cupom";

export async function findOrdersCountByUserId(userId: Usuario["id_usuario"]) {
  const count = await Prisma.pedido.count({
    where: {
      id_usuario: userId,
    },
  });

  return count;
}

export async function findCountOrdersWithCupomId(cupomId: Cupom["id_cupom"]) {
  const usedAmountCupom = await Prisma.pedido.count({
    where: {
      id_cupom: cupomId,
    },
  });

  return usedAmountCupom;
}

export async function getAllPedidosFromUsuario(id_usuario: Usuario["id_usuario"]) {
  const query = `
    SELECT id_pedido, endereco, data_pedido, data_confirmacao, status_pedido, tipo_entrega, tipo_pagamento, troco_para, valor_total, troco
    FROM vw_pedido
    WHERE id_usuario = ?
  `;
  const result = (await mysql.query(query, [id_usuario])) as ViewPedidoForClient[];

  const produtos: ProdutoInViewPedidoForClient[] = [];

  result.forEach(async (item) => {
    const pedido_produto = await getAllProdutoInPedido(item.id_pedido);
  });
  await mysql.end();
  return serialize(result);
}
