import { AddressForm, UserForm } from "@my-types/signup";
import type { NextApiHandler } from "next";

import mysql from "database";

const handler: NextApiHandler = async (req, res) => {
  const { userData, addressData } = req.body as { userData: UserForm; addressData: AddressForm };

  /* nome, data_nascimento, senha, email, ddd, telefone, logradouro, numero_end, bairro, complemento*/
  const results = await mysql.query('CALL pr_insert_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    userData.nome,
    userData.data_nasciemnto,
    userData.senha,
    userData.email,
    userData.telefone.substring(0, 2),
    userData.telefone.substring(2),
    addressData.logradouro,
    addressData.numero,
    addressData.bairro,
    addressData.complemento
  ]);

  console.log(results);

  await mysql.end();
};

export default handler;
