import NextAuth from "next-auth";

import Usuario from "@models/usuario";

declare module "next-auth" {
  interface Session {
    user: { nome: Usuario["nome"]; email: Usuario["email"]; id_usuario: Usuario["id_usuario"] };
  }
}
