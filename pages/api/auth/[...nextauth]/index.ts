import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { Prisma } from "database";
import { MyUser } from "@my-types/next-auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      credentials: {
        email: {
          type: "email",
        },
        senha: {
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const user = await Prisma.usuario.findFirst({
          where: {
            AND: [
              {
                email: credentials.email,
              },
              {
                senha: credentials.senha,
              },
            ],
          },
        });
        if (!user) {
          throw new Error("Dados incorretos! Verifique seu email ou senha.");
        }
        return {
          nome: user.nome,
          email: user.email,
          id_usuario: user.id_usuario,
        };
      },
    }),
  ],
  callbacks: {
    jwt(token, user, account, profile, isNewUser) {
      return token;
    },
    session(session, user) {
      session.user = user.user as MyUser;
      return session;
    },
  },
});
