import Produto from "./produto";
import Sabor from "./sabor";

type ProdutoSabor = Pick<Produto, "id_produto"> & Pick<Sabor, "id_sabor">;

export default ProdutoSabor;
