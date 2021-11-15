import type { NextApiHandler } from "next";

import mysql from "database";

const handler: NextApiHandler = async (req, res) => {
  const query = req.query;

  if (req.method === "GET") {
    const paramsWithValues = [];
    for (const key in query) {
      paramsWithValues.push(`${key}=?`);
    }
    const formatedConditions = paramsWithValues.join(" and ");

    const formatedQuery = `SELECT id_usuario FROM vw_usuario WHERE ${formatedConditions}`;

    try {
      const result = await mysql.query(formatedQuery, Object.values(query)) as any;
      await mysql.end();
      return res.status(200).json({ exist: !!result.length });
    } catch (e) {
      const error = e as Error;
      return res.status(400).send({ message: error.message });
    }
  }
  res.status(400).send({ message: `Tipo de requisição ${req.method} não aceita.` });
};

export default handler;
