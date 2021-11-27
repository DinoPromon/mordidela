import React, { useState, useEffect, Fragment } from "react";

import CustomForm from "./styled";
import GeneralDataInput from "../AccountModalInput";
import { FormButton } from "@components/shared";
import { dateChangeHandler } from "@utils/formatters/input-formatter";
import { generalDataValidation } from "@utils/validations";
import { RequestState } from "@my-types/request";
import { GeneralDataForm } from "@my-types/forms";
import FormRequestStatus from "@components/shared/FormRequestStatus";

type GeneralDataState = {
  nome: string;
  data_nascimento: string;
  email: string;
  telefone: string;
};

const initialFormState = Object.freeze<GeneralDataState>({
  nome: "",
  data_nascimento: "",
  email: "",
  telefone: "",
});

const initialRequestState = Object.freeze<RequestState>({ error: "", isLoading: true, success: false });

type Props = {
  id_usuario: string;
};

const GeneralData: React.FC<Props> = (props) => {
  const [state, setState] = useState<GeneralDataState>(initialFormState);
  const [requestState, setRequestState] = useState<RequestState>(initialRequestState);

  const getUserInfo = async () => {
    setRequestState({ ...requestState, isLoading: true });
    try {
      const response = await fetch(`/api/users?id_usuario=${props.id_usuario}`);
      const result = (await response.json());

      if (!response.ok) {
        throw new Error(result.message);
      }
      setState({ ...result });
      setRequestState({ isLoading: false, success: true, error: "" });
    } catch (e) {
      const error = e as Error;
      setRequestState({ isLoading: false, success: false, error: error.message });
    }
  };

  const changeStateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    if (id === "data_nascimento") event.target.value = dateChangeHandler(event.target.value, state[id]);
    setState({
      ...state,
      [id]: event.target.value,
    });
  };

  const hasErrorInInputs = (formInputs: GeneralDataState) => {
    for (const k in generalDataValidation) {
      const key = k as keyof GeneralDataForm;
      const isValid = generalDataValidation[key](formInputs[key]);
      if (!isValid) return true;
    }
    return false;
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasError = hasErrorInInputs(state);
    if (!hasError) return console.log("hehe");
    return console.log("error");
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Fragment>
      {requestState.success ? (
        <CustomForm onSubmit={submitHandler}>
          <GeneralDataInput id="nome" placeholder="Nome" value={state.nome} setValue={changeStateHandler} />
          <GeneralDataInput
            id="data_nascimento"
            placeholder="Data de Nascimento"
            value={state.data_nascimento}
            setValue={changeStateHandler}
          />
          <GeneralDataInput
            id="email"
            placeholder="Email"
            disabled={true}
            value={state.email}
            setValue={changeStateHandler}
          />
          <GeneralDataInput
            id="telefone"
            placeholder="Telefone"
            value={state.telefone || ""}
            setValue={changeStateHandler}
          />
          <FormButton type="submit">Salvar</FormButton>
        </CustomForm>
      ) : (
        <FormRequestStatus isLoading={requestState.isLoading} errorMessage={requestState.error} />
      )}
    </Fragment>
  );
};

export default GeneralData;
