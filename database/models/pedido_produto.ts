import type IPedido from "./pedido";
import type IProduto from "./produto";

interface IPedidoProduto {
  id_pedido: IPedido["id_pedido"];
  id_produto: IProduto["id_produto"];
  quantidade: number;
  preco_pedido: number;
  observacao: string | null;
}

export default IPedidoProduto;
