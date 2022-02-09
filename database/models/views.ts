import ISabor from "./sabor";
import IPedido from "./pedido";
import IUsuario from "./usuario";
import ITelefone from "./telefone";
import IAdicional from "./adicional";
import IProdutoSabor from "./produto_sabor";
import Produto from "./produto";
import IPedidoProdutoAdicional from "./pedido_produto_adicional";
import IPedidoProdutoSabor from "./pedido_produto_sabor";
import IPedidoProduto from "./pedido_produto";

export type ViewUsuario = IUsuario & Omit<ITelefone, "id_telefone">;

export type ViewPedido = IPedido & { endereco: string; valor_total: number; troco: number };

export type ViewPedidoProduto = IPedidoProduto & Pick<Produto, "nome" | "tamanho">;

export type ViewProdutoSabor = IProdutoSabor & Pick<ISabor, "nome">;

export type ViewPedidoProdutoAdicional = IPedidoProdutoAdicional & Pick<IAdicional, "nome" | "preco">;

export type ViewPedidoProdutoSabor = IPedidoProdutoSabor & Pick<ISabor, "nome">;

export type PedidoProdutoForClient = Omit<ViewPedidoProduto, "id_pedido">;

export type ProdutoInViewPedidoForClient = PedidoProdutoForClient & {
  adds: IAdicional[];
  sabores: ISabor[];
};

export type ViewPedidoForClient = Omit<ViewPedido, "id_usuario" | "id_endereco" | "id_cupom" | "nome"> & {
  produtos: ProdutoInViewPedidoForClient;
};
