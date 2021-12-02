import type { NextApiHandler } from "next";

import mysql from "database";
import { getSession } from "next-auth/client";
import { transformDateFromDBToClient } from "@utils/transformation/date";
import { ViewUsuario } from "@models/views";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const query = req.query;

  if (!session) {
    return res.status(401).json({ message: "É necessário estar autenticado para acessar os dados." });
  }

  const id_usuario = query.id_usuario as string;

  if (req.method === "GET") {
    const formatedQuery = `SELECT nome, email, autorizacao, data_nascimento, ddd, numero FROM vw_usuario WHERE id_usuario = ?`;

    try {
      const result = (await mysql.query(formatedQuery, [id_usuario])) as Omit<
        ViewUsuario,
        "id_usuario" | "senha"
      >[];
      const user = result[0];
      await mysql.end();

      const response = {
        nome: user.nome,
        email: user.email,
        autorizacao: user.autorizacao,
        data_nascimento: transformDateFromDBToClient(user.data_nascimento as string),
        telefone: `${user.ddd}${result[0].numero}`,
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
