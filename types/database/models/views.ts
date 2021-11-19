import Usuario from "./Usuario";
import Telefone from "./telefone";

export type ViewUsuario = Usuario & Omit<Telefone, 'id_telefone'>;
