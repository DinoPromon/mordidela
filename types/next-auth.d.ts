import NextAuth from "next-auth";

import Usuario from "@models/usuario";

interface MyUser {
  nome: Usuario["nome"];
  email: Usuario["email"];
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
