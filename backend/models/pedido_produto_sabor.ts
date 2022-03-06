import type IPedido from "./pedido";
import type IProduto from "./produto";
import type ISabor from "./sabor";
import type IPedidoProduto from "./pedido_produto";

interface IPedidoProdutoSabor {
  id_pedido_produto: IPedidoProduto["id_pedido_produto"];
  id_pedido: IPedido["id_pedido"];
  id_produto: IProduto["id_produto"];
  id_sabor: ISabor["id_sabor"];
}

export interface IOrderProductFlavorRelations extends IPedidoProdutoSabor {
  pedido?: IPedido;
  produto?: IProduto;
  sabor?: ISabor;
}

export default IPedidoProdutoSabor;
