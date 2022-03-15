import type IUsuario from "@models/usuario";

export type FindAllOrderRelationsByUserIdArg = {
  userId: IUsuario["id_usuario"];
};
