import NextAuth from "next-auth";

import type IUsuario from "@models/usuario";

interface MyUser {
  nome: IUsuario["nome"];
  email: IUsuario["email"];
  id_usuario: IUsuario["id_usuario"];
  autorizacao: IUsuario["autorizacao"];
}

declare module "next-auth" {
  interface Session {
    user: MyUser;
  }
  interface User {
    nome: string;
    email: string;
  }
  interface Credentials {
    email: string;
    password: string;
  }
  interface Provider extends MyUser {}
}
