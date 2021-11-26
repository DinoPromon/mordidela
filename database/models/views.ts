import Usuario from "./usuario";
import Telefone from "./telefone";

type ViewUsuario = Usuario & Omit<Telefone, 'id_telefone'>;

export default ViewUsuario;
