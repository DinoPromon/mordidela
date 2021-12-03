import Sabor from "./sabor";
import Pedido from "./pedido";
import Usuario from "./usuario";
import Telefone from "./telefone";
import Adicional from "./adicional";
import ProdutoSabor from "./produto_sabor";
import CategoriaAdicional from "./categoria_adicional";

export type ViewUsuario = Usuario & Omit<Telefone, "id_telefone">;

export type ViewCategoriaAdicional = CategoriaAdicional & Pick<Adicional, "nome" | "preco">;

export type ViewProdutoSabor = ProdutoSabor & Pick<Sabor, "nome">;

export type ViewPedido = Pedido & { endereco: string; valor_total: number; troco: number };

export type ViewPedidoForClient = Omit<ViewPedido, "id_pedido" | "id_usuario" | "id_endereco" | "id_cupom" | "nome">;
