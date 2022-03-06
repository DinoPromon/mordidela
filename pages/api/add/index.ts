import { NextApiHandler } from "next";
import { ReqMethod } from "@my-types/backend/reqMethod";
import { AddRepo } from "@repository/add";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === ReqMethod.GET) {
    try {
      const adds = await AddRepo.findAll();
      if (adds.length === 0) return res.status(204).json([]);
      return res.status(200).json(adds);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  res.setHeader("Allow", [ReqMethod.GET]);
  return res.status(405).json({ message: "Requisição inválida." });
};

export default handler;
