import type { NextApiHandler } from "next";

import mysql from "database";
import { getSession } from "next-auth/client";
import { transformDateFromDBToClient } from "@utils/transformation/date";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const query = req.query;

  if (!session) {
    return res.status(401).json({ message: "É necessário estar autenticado para acessar os dados." });
  }

  const id_usuario = query.id_usuario as string;

  if (req.method === "GET") {
    const formatedQuery = `SELECT nome, email, autorizacao, data_nascimento FROM vw_usuario WHERE id_usuario = ?`;

    try {
      const result = (await mysql.query(formatedQuery, [id_usuario])) as any;
      await mysql.end();

      const response = {
        ...result[0],
        data_nascimento: transformDateFromDBToClient(result[0].data_nascimento),
      };

      return res.status(200).json(response);
    } catch (e) {
      const error = e as Error;
      return res.status(400).send({ message: error.message });
    }
  }
  res.status(400).send({ message: `Tipo de requisição ${req.method} não aceita.` });
  res.end();
};

export default handler;
