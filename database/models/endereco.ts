import Usuario from "./usuario";

type Endereco = {
  id_endereco: number;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  id_usuario: Usuario["id_usuario"];
  id_entrega: number;
};

export default Endereco;
