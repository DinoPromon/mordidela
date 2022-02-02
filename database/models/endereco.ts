import Entrega from "./entrega";
import Usuario from "./usuario";

type Endereco = {
  id_endereco: number;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento?: string | null;
  id_usuario: Usuario["id_usuario"];
  id_entrega: Entrega["id_entrega"];
};

export type AddressOnCart = Endereco & {
  entrega: {
    preco_entrega: Entrega["preco_entrega"];
  };
};

export default Endereco;
