import type { NextApiHandler } from "next";

import { SignupUser } from "@controllers/users/signupUser";

import type { ServerError } from "@errors/index";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const signpUser = new SignupUser(req.body);
      console.log(req.body);
      await signpUser.exec();
      return res.status(201).json({ message: "Cadastrado com sucesso!" });
    } catch (e) {
      const error = e as ServerError;
      return res.status(error.httpStatus).json({ message: error.errorMessage });
    }
  }

  return res.status(405).json({ message: `Tipo de requisição ${req.method} não aceita.` });
};

export default handler;
