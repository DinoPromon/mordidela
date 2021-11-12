import { AddressFormData, UserFormData } from "@my-types/signup";
import type { NextApiHandler } from "next";

import mysql from "database";

const handler: NextApiHandler = async (req, res) => {
  const { userData, addressData } = req.body as {
    userData: UserFormData;
    addressData: AddressFormData;
  };

  if (req.method === "POST") {
    const results = await mysql.query("CALL pr_insert_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      userData.nome,
      userData.data_nascimento,
      userData.senha,
      userData.email,
      userData.telefone.substring(0, 2),
      userData.telefone.substring(2),
      addressData.logradouro,
      addressData.numero,
      addressData.bairro,
      addressData.complemento,
    ]);

    console.log(results);

    await mysql.end();
  }
};

export default handler;
