import type ICupom from "../cupom";
import type IPedido from "./index";
import type ISabor from "@models/sabor";
import type IEndereco from "../endereco";
import type IProduto from "@models/produto";
import type IAdicional from "@models/adicional";
import type IUsuarioCupom from "../usuario_cupom";
import type IPedidoProduto from "../pedido_produto";
import type IPedidoProdutoSabor from "../pedido_produto_sabor";
import type IPedidoProdutoAdicional from "../pedido_produto_adicional";

export interface IOrderRelations extends IPedido {
  cupom: ICupom | null;
  endereco: IEndereco | null;
  pedido_produto: (IPedidoProduto & { produto: IProduto })[];
  pedido_produto_adicional: (IPedidoProdutoAdicional & { adicional: IAdicional })[];
  pedido_produto_sabor: (IPedidoProdutoSabor & { sabor: ISabor })[];
  usuario_cupom: IUsuarioCupom[];
}
