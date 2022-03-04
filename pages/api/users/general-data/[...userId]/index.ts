import type { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { ReqMethod } from "@my-types/backend/req-method";
import { updateGeneralData } from "@controllers/generalData";

type GeneralDataBody = {
  nome: string;
  data_nascimento: string;
  ddd: string;
  numero: string;
};

export const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session)
    return res.status(401).json({ message: "É necessário autenticação para acessar os dados" });

  if (req.method === ReqMethod.PUT) {
    try {
      const { nome, data_nascimento, ddd, numero } = req.body as GeneralDataBody;
      const updatedData = await updateGeneralData(session.user.id_usuario, {
        telefone: {
          ddd,
          numero,
        },
        user: {
          nome,
          data_nascimento: new Date(data_nascimento),
        },
      });

      return res.status(200).json(updatedData);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: "Aconteceu algo de errado" });
    }
  }

  res.status(405).json({ message: "Requisição inválida" });
};

export default handler;
