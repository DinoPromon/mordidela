import type IPedido from "./index";
import type IUsuario from "@models/usuario";
import type IEndereco from "@models/endereco";
import type ITelefone from "@models/telefone";

export interface IOrderGeneralData extends IPedido {
  endereco: IEndereco | null;
  usuario: Pick<IUsuario, "nome" | "id_usuario"> & {
    telefone: ITelefone[];
  };
}
