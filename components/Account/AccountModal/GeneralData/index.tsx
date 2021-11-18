import React, { useState, Fragment, useEffect } from "react";

import CustomForm from "./styled";
import GeneralDataInput from "../AccountModalInput";
import { FormButton } from "@components/shared";
import { RequestState } from "@my-types/request";

type GeneralDataState = {
  nome: string;
  data_nascimento: string;
  email: string;
};

const initialState = Object.freeze<GeneralDataState>({ nome: "", data_nascimento: "", email: "" });

type Props = {
  id_usuario: string
}

const GeneralData: React.FC<Props> = (props) => {
  const [state, setState] = useState(initialState);
  const [request, setRequest] = useState<RequestState>({ error: "", isLoading: true, success: false });

  const getUserInfo = async () => {
    try {
      const response = await fetch(`/api/users?id_usuario=${props.id_usuario}`);
      const result = await response.json();

      if(!response.ok) {
        throw new Error(result.message);
      }
    } catch(e) {
      const error = e as Error;
      setRequest({ isLoading: false, success: false, error: error.message });
    }

  }

  useEffect(() => {

  }, []);
  
  return (
    <Fragment>
      {}
      <CustomForm>
        <GeneralDataInput id="nome" placeholder="Nome" value={state.nome} />
        <GeneralDataInput
          id="data_nascimento"
          placeholder="Data de Nascimento"
          value={state.data_nascimento}
        />
        <GeneralDataInput id="email" placeholder="Email" disabled={true} value={state.email} />
        <FormButton>Salvar</FormButton>
      </CustomForm>
    </Fragment>
  );
};

export default GeneralData;
