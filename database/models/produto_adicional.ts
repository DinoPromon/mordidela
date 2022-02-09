import Produto from "./produto";
import IAdicional from "./adicional";

interface IProdutoAdicional {
  id_produto: Produto["id_produto"];
  id_adicional: IAdicional["id_adicional"];
}

export default IProdutoAdicional;
