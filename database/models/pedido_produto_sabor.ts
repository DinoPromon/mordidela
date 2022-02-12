import type IPedido from "./pedido";
import type IProduto from "./produto";
import type ISabor from "./sabor";

interface IPedidoProdutoSabor {
  id_pedido: IPedido["id_pedido"];
  id_produto: IProduto["id_produto"];
  id_sabor: ISabor["id_sabor"];
}

export default IPedidoProdutoSabor;
