import type IProduto from "./produto";
import type IAdicional from "./adicional";

interface IProdutoAdicional {
  id_produto: IProduto["id_produto"];
  id_adicional: IAdicional["id_adicional"];
}

export default IProdutoAdicional;
