import type { NextApiHandler } from "next";

import mysql from "database";

const handler: NextApiHandler = async (req, res) => {
  const query = req.query;

  let limit = Number(query.limit as string);

  if (isNaN(limit)) {
    limit = 1;
  }

  if (req.method === "GET") {
    const paramsWithValues = [];
    for (const key in query) {
      if (key !== "limit" && key !== "exists") {
        paramsWithValues.push(`${key}=?`);
      }
    }
    const formatedConditions = paramsWithValues.join(" and ");

    const formatedQuery = `SELECT nome, email, autorizacao FROM vw_usuario WHERE ${formatedConditions}`;

    try {
      const result = (await mysql.query(formatedQuery, Object.values(query))) as any;
      await mysql.end();

      const response = result.slice(0, limit);
      return res.status(200).json(response);
    } catch (e) {
      const error = e as Error;
      return res.status(400).send({ message: error.message });
    }
  }
  res.status(400).send({ message: `Tipo de requisição ${req.method} não aceita.` });
};

export default handler;
