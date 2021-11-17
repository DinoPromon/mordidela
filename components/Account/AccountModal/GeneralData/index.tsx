import React from "react";

import CustomForm from "./styled";
import GeneralDataInput from "../AccountModalInput";
import { FormButton } from "@components/shared";

const GeneralData: React.FC = () => {
  return (
    <CustomForm>
      <GeneralDataInput id="nome" placeholder="Nome" />
      <GeneralDataInput id="data_nascimento" placeholder="Data de Nascimento" />
      <GeneralDataInput id="email" placeholder="Email" disabled={true}/>
      <GeneralDataInput id="senha" placeholder="Senha" />
      <FormButton>Salvar</FormButton>
    </CustomForm>
  );
};

export default GeneralData;
