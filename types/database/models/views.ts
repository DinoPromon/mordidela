import Usuario from "./usuario";
import Telefone from "./telefone";

export type ViewUsuario = Usuario & Omit<Telefone, 'id_telefone'>;
