import React from "react";

import CustomForm from "./styled";
import { FormButton } from "@components/shared";

const GeneralData: React.FC = () => {
  return (
    <CustomForm>
      <label>Nome</label>
      <input type="text" value="Aristóteles da Silva" />
      <label>Data de nascimento</label>
      <input type="text" />
      <label>Telefone</label>
      <input type="text" />
      <label>Email</label>
      <input type="text" />
      <label>Senha</label>
      <input type="text" />
      <FormButton>Salvar</FormButton>
    </CustomForm>
  );
};

export default GeneralData;
