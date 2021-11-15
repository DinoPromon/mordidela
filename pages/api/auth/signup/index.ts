import { AddressFormData, UserFormData } from "@my-types/signup";
import type { NextApiHandler } from "next";
import { hasErrorInAddressForm, hasErrorInUserForm } from "./utils";

import mysql from "database";

const handler: NextApiHandler = async (req, res) => {
  const { userFormData, addressFormData } = req.body as {
    userFormData: UserFormData;
    addressFormData: AddressFormData;
  };

  if (req.method === "POST") {
    if (hasErrorInUserForm(userFormData) || hasErrorInAddressForm(addressFormData)) {
      return res.status(400).json({ message: "Preencha os dados corretamente!" });
    }

    try {
      const results = await mysql.query("CALL pr_insert_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        userFormData.nome,
        userFormData.data_nascimento,
        userFormData.senha,
        userFormData.email,
        userFormData.telefone.substring(0, 2),
        userFormData.telefone.substring(2),
        addressFormData.logradouro,
        addressFormData.numero,
        addressFormData.bairro,
        addressFormData.complemento,
      ]);
      await mysql.end();
      return res.status(201).json({ message: "Cadastrado com sucesso!" });
    } catch (e) {
      const error = e as Error;
      return res.status(400).send({ message: error.message });
    }
  }

  return res.status(400).json({ message: `Tipo de requisição ${req.method} não aceita.` });
};

export default handler;
