import { Produto } from "./produto";
import { Sabor } from "./sabor";

export type ProdutoSabor = Pick<Produto, "id_produto"> & Pick<Sabor, "id_sabor">;
