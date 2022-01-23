import NextAuth from "next-auth";

import Usuario from "@models/usuario";

export interface MyUser {
  nome: Usuario["nome"];
  email: Usuario["email"];
  id_usuario: Usuario["id_usuario"];
}

declare module "next-auth" {
  interface Session {
    user: MyUser;
  }
}
