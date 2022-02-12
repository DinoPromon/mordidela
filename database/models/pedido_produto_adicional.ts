import type IPedido from "./pedido";
import type Produto from "./produto";
import type IAdicional from "./adicional";

interface IPedidoProdutoAdicional {
  id_pedido: IPedido["id_pedido"];
  id_produto: Produto["id_produto"];
  id_adicional: IAdicional["id_adicional"];
}

export default IPedidoProdutoAdicional;
