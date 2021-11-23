import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { arePasswordsEquals } from "@utils/validations";
import { getUserByEmail } from "database/users";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        const user = await getUserByEmail(credentials.email);
        if (!user) {
          throw new Error("Dados incorretos! Verifique seu email ou senha.");
        }

        const areEquals = arePasswordsEquals(credentials.senha, user.senha);
        if (!areEquals) {
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
    async jwt(token, user, account, profile, isNewUser) {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    async session(session, user, sessionToken) {
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
});
