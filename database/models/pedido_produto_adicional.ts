import IAdicional from "./adicional";
import IPedido from "./pedido";
import Produto from "./produto";

interface IPedidoProdutoAdicional{
  id_pedido: IPedido["id_pedido"];
  id_produto: Produto["id_produto"];
  id_adicional: IAdicional["id_adicional"];
};

export default IPedidoProdutoAdicional;
