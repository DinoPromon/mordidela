import Adicional from "./adicional";
import Pedido from "./pedido";
import Produto from "./produto";

type PedidoProdutoAdicional = {
  id_pedido: Pedido["id_pedido"];
  id_produto: Produto["id_produto"];
  id_adicional: Adicional["id_adicional"];
};

export default PedidoProdutoAdicional;
