import type { NextApiHandler } from "next";

import { treatErrorMessage } from "@utils/transformation/error";
import { AddressFormData, UserFormData } from "@my-types/forms";
import { hasErrorInAddressForm, hasErrorInUserForm } from "@utils/validations";
import { removeAditionalSpaces } from "@utils/formatters/input-formatter";
import { transformDate } from "@utils/transformation/date";
import { getDDDFromTelefone, getNumberFromTelefone } from "@utils/transformation/telefone";

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
        removeAditionalSpaces(userFormData.nome),
        transformDate(userFormData.data_nascimento),
        userFormData.senha,
        userFormData.email,
        getDDDFromTelefone(userFormData.telefone),
        getNumberFromTelefone(userFormData.telefone),
        removeAditionalSpaces(addressFormData.logradouro),
        removeAditionalSpaces(addressFormData.numero),
        removeAditionalSpaces(addressFormData.bairro),
        removeAditionalSpaces(addressFormData.bairro),
      ]);
      await mysql.end();
      return res.status(201).json({ message: "Cadastrado com sucesso!" });
    } catch (e) {
      const error = e as Error;
      return res.status(400).send({ message: treatErrorMessage(error.message) });
    }
  }

  return res.status(400).json({ message: `Tipo de requisição ${req.method} não aceita.` });
};

export default handler;
