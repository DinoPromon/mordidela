import type IPedido from "./pedido";
import type Produto from "./produto";
import type IAdicional from "./adicional";
import type IPedidoProduto from "./pedido_produto";
import type IProduto from "./produto";

interface IPedidoProdutoAdicional {
  id_pedido_produto: IPedidoProduto["id_pedido_produto"];
  id_pedido: IPedido["id_pedido"];
  id_produto: Produto["id_produto"];
  id_adicional: IAdicional["id_adicional"];
  preco_adicional: number;
}

export interface IOrderProductAddRelations extends IPedidoProdutoAdicional {
  pedido?: IPedido;
  produto?: IProduto;
  adicional?: IAdicional;
}

export default IPedidoProdutoAdicional;
