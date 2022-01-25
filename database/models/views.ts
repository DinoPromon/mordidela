import Sabor from "./sabor";
import Pedido from "./pedido";
import Usuario from "./usuario";
import Telefone from "./telefone";
import Adicional from "./adicional";
import ProdutoSabor from "./produto_sabor";
import Produto from "./produto";
import PedidoProdutoAdicional from "./pedido_produto_adicional";
import PedidoProdutoSabor from "./pedido_produto_sabor";
import PedidoProduto from "./pedido_produto";

export type ViewUsuario = Usuario & Omit<Telefone, "id_telefone">;

export type ViewPedido = Pedido & { endereco: string; valor_total: number; troco: number };

export type ViewPedidoProduto = PedidoProduto & Pick<Produto, "nome" | "tamanho">;

export type ViewProdutoSabor = ProdutoSabor & Pick<Sabor, "nome">;

export type ViewPedidoProdutoAdicional = PedidoProdutoAdicional & Pick<Adicional, "nome" | "preco">;

export type ViewPedidoProdutoSabor = PedidoProdutoSabor & Pick<Sabor, "nome">;

export type PedidoProdutoForClient = Omit<ViewPedidoProduto, "id_pedido">;

export type ProdutoInViewPedidoForClient = PedidoProdutoForClient & {
  adds: Adicional[];
  sabores: Sabor[];
};

export type ViewPedidoForClient = Omit<ViewPedido, "id_usuario" | "id_endereco" | "id_cupom" | "nome"> & {
  produtos: ProdutoInViewPedidoForClient;
};
