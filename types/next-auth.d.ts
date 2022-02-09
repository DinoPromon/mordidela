import NextAuth from "next-auth";

import IUsuario from "@models/usuario";

interface MyUser {
  nome: IUsuario["nome"];
  email: IUsuario["email"];
  id_usuario: number;
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
    senha: string;
  }
  interface Provider extends MyUser {}
}
