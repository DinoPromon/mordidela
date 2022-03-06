import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { Prisma } from "backend";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        const user = await Prisma.usuario.findFirst({
          where: {
            AND: [
              {
                email: credentials.email,
              },
              {
                senha: credentials.password,
              },
            ],
          },
        });
        if (!user) {
          return null;
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
