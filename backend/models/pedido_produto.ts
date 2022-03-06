import type IPedido from "./pedido";
import type IProduto from "./produto";

interface IPedidoProduto {
  id_pedido_produto: number;
  id_pedido: IPedido["id_pedido"];
  id_produto: IProduto["id_produto"];
  quantidade: number;
  preco_pedido: number;
  observacao: string | null;
}

export interface IOrderProductRelations extends IPedidoProduto {
  pedido?: IPedido;
  produto?: IProduto;
}

export default IPedidoProduto;
