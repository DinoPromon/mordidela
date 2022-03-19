import type IPedido from "./index";
import type ICupom from "@models/cupom";
import type IEndereco from "@models/endereco";
import type ITelefone from "@models/telefone";
import type IUsuario from "@models/usuario";
import type IPedidoProduto from "@models/pedido_produto";
import type IPedidoProdutoAdicional from "@models/pedido_produto_adicional";
import type IPedidoProdutoSabor from "@models/pedido_produto_sabor";

export interface IOrderFullData extends IPedido {
  usuario: IUsuario & {
    telefone: ITelefone[];
  };
  cupom: ICupom | null;
  endereco: IEndereco | null;
  pedido_produto: IPedidoProduto[];
  pedido_produto_adicional: IPedidoProdutoAdicional[] | null;
  pedido_produto_sabor: IPedidoProdutoSabor[];
}
