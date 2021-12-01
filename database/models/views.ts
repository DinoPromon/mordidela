import Usuario from "./usuario";
import Telefone from "./telefone";
import CategoriaAdicional from "./categoria_adicional";
import Adicional from "./adicional";
import ProdutoSabor from "./produto_sabor";
import Sabor from "./sabor";

export type ViewUsuario = Usuario & Omit<Telefone, "id_telefone">;

export type ViewCategoriaAdicional = CategoriaAdicional & Pick<Adicional, "nome" | "preco">;

export type ViewProdutoSabor = ProdutoSabor & Pick<Sabor, "nome">;
