import type ISabor from "@models/sabor";
import type IProduto from "@models/produto";
import type IAdicional from "@models/adicional";
import type IPedidoProduto from "@models/pedido_produto";
import type IPedidoProdutoSabor from "@models/pedido_produto_sabor";
import type IPedidoProdutoAdicional from "@models/pedido_produto_adicional";

export type OrderProductFlavorRelation = IPedidoProdutoSabor & {
  sabor: ISabor;
};

export type OrderProductAddRelation = IPedidoProdutoAdicional & {
  adicional: IAdicional;
};

export type OrderProductRelation = IPedidoProduto & {
  produto: IProduto;
};
