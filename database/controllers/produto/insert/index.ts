import Pedido from "@models/pedido";
import { CartProduto } from "@my-types/pedido";

import { insertPedidoProduto } from "@controllers/pedido_produto";
import { insertPedidoProdutoSabor } from "@controllers/pedido_produto_sabor";
import { insertPedidoProdutoAdicional } from "@controllers/pedido_produto_adicional";

export async function insertAllProdutosFromPedido(id_pedido: Pedido["id_pedido"], produtos: CartProduto[]) {
  for (const i in produtos) {
    if (produtos[i].adicionais.length) {
      await insertPedidoProdutoAdicional(id_pedido, produtos[i].id_produto, produtos[i].adicionais as string[]);
    }
    if (produtos[i].sabores.length) {
      await insertPedidoProdutoSabor(id_pedido, produtos[i].id_produto, produtos[i].sabores as string[]);
    }
    await insertPedidoProduto({
      id_pedido,
      id_produto: produtos[i].id_produto,
      quantidade: produtos[i].quantidade,
      observacao: produtos[i].observacao === "" ? null : produtos[i].observacao,
    });
  }
}
