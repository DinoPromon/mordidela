import React from "react";

import CustomForm from "./styled";
import { FormButton } from "@components/shared";

const GeneralData: React.FC = () => {
  return (
    <CustomForm>
      <div>
        <input type="text"/>
        <span></span>
        <label>Nome</label>
      </div>
      <div>
        <input type="text"/>
        <span></span>
        <label>Data de nascimento</label>
      </div>
      <div>
        <input type="text"/>
        <span></span>
        <label>Telefone</label>
      </div>
      <div>
        <input type="text"/>
        <span></span>
        <label>Email</label>
      </div><div>
        <input type="text"/>
        <span></span>
        <label>Senha</label>
      </div>
      <FormButton>Salvar</FormButton>
    </CustomForm>
  );
};

export default GeneralData;
