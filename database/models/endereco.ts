import type IEntrega from "./entrega";
import type IUsuario from "./usuario";

interface IEndereco {
  id_endereco: number;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string | null;
  id_usuario: IUsuario["id_usuario"];
  id_entrega: IEntrega["id_entrega"];
}

export type AddressOnCart = IEndereco & {
  entrega: {
    preco_entrega: IEntrega["preco_entrega"];
  };
};

export default IEndereco;
