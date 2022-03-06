import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { findUserGeneralData } from "@controllers/users";
import { ReqMethod } from "@my-types/backend/reqMethod";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { userId } = req.query;

  if (!session) {
    return res.status(401).json({ message: "É necessário autenticação para este endpoint." });
  }

  if (session.user.id_usuario !== Number(userId)) {
    return res.status(403).json({ message: "Autenticação inválida." });
  }

  if (req.method === "GET") {
    try {
      const userGeneralData = await findUserGeneralData(Number(userId));
      if (!userGeneralData) return res.status(204).end();
      return res.status(200).json(userGeneralData);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.setHeader("Allow", [ReqMethod.GET]);
  res.status(400).json({ message: "Requisição inválida." });
};

export default handler;
