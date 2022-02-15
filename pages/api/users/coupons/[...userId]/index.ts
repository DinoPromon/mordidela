import type { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { ReqMethod } from "@my-types/backend/req-method";

export const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session)
    return res.status(401).json({ message: "É necessário autenticação para acessar os dados" });

  if (req.method === ReqMethod.PUT) {
    try {
      return res.status(200).json("teste");
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: "Aconteceu algo de errado" });
    }
  }

  res.status(405).json({ message: "Requisição inválida" });
};

export default handler;
