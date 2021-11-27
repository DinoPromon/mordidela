import Usuario from "./usuario";

type Endereco = {
  id_endereco: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  id_usuario: Usuario['id_usuario'];
  id_entrega: 1;
};

export default Endereco;