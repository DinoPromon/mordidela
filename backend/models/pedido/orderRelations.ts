import type ICupom from "../cupom";
import type IPedido from "./index";
import type IEndereco from "../endereco";
import type IUsuarioCupom from "../usuario_cupom";
import type { IOrderProductRelations } from "../pedido_produto";
import type { IOrderProductAddRelations } from "../pedido_produto_adicional";
import type { IOrderProductFlavorRelations } from "../pedido_produto_sabor";

export interface IOrderRelations extends IPedido {
  cupom: ICupom | null;
  endereco: IEndereco | null;
  pedido_produto: IOrderProductRelations[];
  pedido_produto_adicional: IOrderProductAddRelations[];
  pedido_produto_sabor: IOrderProductFlavorRelations[];
  usuario_cupom: IUsuarioCupom[];
}
