import { NextApiHandler } from "next";
import { ReqMethod } from "@my-types/backend/reqMethod";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === ReqMethod.GET) {
    try {
      return res.status(200).json("teste");
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.setHeader("Allow", [ReqMethod.GET]);
  return res.status(405).json({ message: "Requisição inválida." });
};

export default handler;
