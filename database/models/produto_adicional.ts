import Produto from "./produto";
import Adicional from "./adicional";

type ProdutoAdicional = Pick<Produto, "id_produto"> & Pick<Adicional, "id_adicional">

export default ProdutoAdicional;