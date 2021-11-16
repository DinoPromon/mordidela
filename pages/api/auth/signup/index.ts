import type { NextApiHandler } from "next";

import { treatErrorMessage } from "@utils/database";
import { AddressFormData, UserFormData } from "@my-types/signup";
import { hasErrorInAddressForm, hasErrorInUserForm } from "@utils/validations";
import { removeAditionalSpaces } from "@utils/input-formatter";

import mysql from "database";

const transformDate = (date: string) => {
  const fragmentedDate = date.split('/');
  fragmentedDate.reverse();
  const formatedDate = fragmentedDate.join('-');

  return formatedDate;
};

const getDDDFromTelefone = (telefone: string) => {
  const cleanedTelefone = telefone.replace(/[\(\)-]/, '');
  return cleanedTelefone.substring(0, 2);
};

const getNumberFromTelefone = (telefone: string) => {
  const cleanedTelefone = telefone.replace(/[\(\)-]/, '');
  return cleanedTelefone.substring(2);
};

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
