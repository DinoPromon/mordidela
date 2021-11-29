import { getSession } from "next-auth/client";
import { canUsuarioUseCupom } from "@controllers/cupom";
import Cupom from "@models/cupom";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { codigo } = req.query;
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Não autenticado." });

  if (req.method === "GET") {
    if (codigo) {
      try {
        const cupom = await canUsuarioUseCupom(session.user.id_usuario, codigo as Cupom["codigo"]);
        if (cupom) return res.status(200).json({ cupom: cupom });
        return res.status(200).json({ cupom: null });
      } catch (e) {
        const error = e as Error;
        return res.status(500).json({ message: error.message });
      }
    }
  }

  res.status(405).json({ message: "Requisição inválida." });
};

export default handler;
