import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { arePasswordsEquals } from "@utils/validations";
import { getUserByEmail } from "@utils/backend";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        senha: { type: "password" },
      },
      async authorize(credentials, req) {
        const user = await getUserByEmail(credentials.email as string);
        if (!user) {
          throw new Error("Email não cadastrado!");
        }

        console.log(credentials.senha, user.senha);
        const areEquals = arePasswordsEquals(credentials.senha as string, user.senha);
        if (!areEquals) {
          throw new Error("Dados incorretos! Verifique seu email ou senha.");
        }

        return {
          email: user.email,
        };
      },
    }),
  ],
});
