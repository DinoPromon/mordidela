import type IPedido from "./index";
import type ICupom from "@models/cupom";
import type ISabor from "@models/sabor";
import type IUsuario from "@models/usuario";
import type IProduto from "@models/produto";
import type ITelefone from "@models/telefone";
import type IEndereco from "@models/endereco";
import type IAdicional from "@models/adicional";
import type IPedidoProduto from "@models/pedido_produto";
import type IPedidoProdutoAdicional from "@models/pedido_produto_adicional";
import type IPedidoProdutoSabor from "@models/pedido_produto_sabor";

export interface IOrderFullData extends IPedido {
  usuario: IUsuario & {
    telefone: ITelefone[];
  };
  cupom: ICupom | null;
  endereco: IEndereco | null;
  pedido_produto: (IPedidoProduto & {
    produto: IProduto;
  })[];
  pedido_produto_adicional:
    | (IPedidoProdutoAdicional & {
        adicional: IAdicional;
      })[]
    | null;
  pedido_produto_sabor: (IPedidoProdutoSabor & {
    sabor: ISabor;
  })[];
}
