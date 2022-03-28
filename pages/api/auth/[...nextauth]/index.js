import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { LoginUser } from "@controllers/users";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 2 * 60 * 60,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/",
    newUser: "/",
    verifyRequest: "/login",
  },
  cookies: {
    sessionToken: {
      name: "_promon-session",
      options: {
        httpOnly: true,
      },
    },
    callbackUrl: {
      name: "_promon-callback-url",
    },
    csrfToken: {
      name: "_promon-csrf-token",
      options: {
        httpOnly: true,
      },
    },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        const loginUser = new LoginUser({
          email: credentials.email,
          senha: credentials.password,
        });

        const user = await loginUser.exec().catch((err) => null);

        if (!user) return null;

        return {
          nome: user.nome,
          email: user.email,
          id_usuario: user.id_usuario,
          autorizacao: user.autorizacao,
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
