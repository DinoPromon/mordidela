import type ISabor from "./sabor";
import type IPedido from "./pedido";
import type IProduto from "./produto";
import type IUsuario from "./usuario";
import type ITelefone from "./telefone";
import type IAdicional from "./adicional";
import type IProdutoSabor from "./produto_sabor";
import type IPedidoProdutoAdicional from "./pedido_produto_adicional";
import type IPedidoProdutoSabor from "./pedido_produto_sabor";
import type IPedidoProduto from "./pedido_produto";

export type ViewUsuario = IUsuario & Omit<ITelefone, "id_telefone">;

export type ViewPedido = IPedido & { endereco: string; valor_total: number; troco: number };

export type ViewPedidoProduto = IPedidoProduto & Pick<IProduto, "nome" | "tamanho">;

export type ViewProdutoSabor = IProdutoSabor & Pick<ISabor, "nome">;

export type ViewPedidoProdutoAdicional = IPedidoProdutoAdicional &
  Pick<IAdicional, "nome" | "preco">;

export type ViewPedidoProdutoSabor = IPedidoProdutoSabor & Pick<ISabor, "nome">;

export type PedidoProdutoForClient = Omit<ViewPedidoProduto, "id_pedido">;

export type ProdutoInViewPedidoForClient = PedidoProdutoForClient & {
  adds: IAdicional[];
  sabores: ISabor[];
};

export type ViewPedidoForClient = Omit<
  ViewPedido,
  "id_usuario" | "id_endereco" | "id_cupom" | "nome"
> & {
  produtos: ProdutoInViewPedidoForClient;
};
