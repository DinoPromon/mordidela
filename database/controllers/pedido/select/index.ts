import mysql, { serialize } from "database";
import Usuario from "@models/usuario";
import { ProdutoInViewPedidoForClient, ViewPedidoForClient } from "@models/views";
import { getAllProdutoInPedido } from "@controllers/pedido_produto";
import { getAllddsInPedidoProduto } from "@controllers/pedido_produto_adicional";

export async function getAllPedidosFromUsuario(id_usuario: Usuario["id_usuario"]) {
  const query = `
    SELECT id_pedido, endereco, data_pedido, data_confirmacao, status_pedido, tipo_entrega, tipo_pagamento, troco_para, valor_total, troco
    FROM vw_pedido
    WHERE id_usuario = ?
  `;
  const result = (await mysql.query(query, [id_usuario])) as ViewPedidoForClient[];

  const produtos: ProdutoInViewPedidoForClient[] = [];

  result.forEach(async (item) => {
    const pedido_produto = (await getAllProdutoInPedido(item.id_pedido))
  });
  await mysql.end();
  return serialize(result);
}
