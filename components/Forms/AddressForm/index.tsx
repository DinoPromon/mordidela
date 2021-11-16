import React, { useEffect, useState } from "react";

import Wrapper from "../styled";
import AddressFormActions from "./AddressFormActions";
import FormRequestStatus from "@components/shared/FormRequestStatus";
import { Response } from "@my-types/request";
import { FormInput } from "@components/shared";
import { AddressFormData } from "@my-types/signup";
import { addressFormValidations } from "@utils/validations";

type Props = {
  state: AddressFormData;
  setState: React.Dispatch<React.SetStateAction<AddressFormData>>;
  onBack: () => void;
  onSubmit: () => Promise<Response>;
};

const AddressForm: React.FC<Props> = (props) => {
  const { state: formState, setState: setFormState, onBack, onSubmit } = props;
  const [canSubmit, setCanSubmit] = useState(false);
  const [request, setRequest] = useState({ error: "", isLoading: false, success: false });

  const hasErrorInInputs = (formInputs: typeof formState) => {
    for (let k in addressFormValidations) {
      const key = k as keyof AddressFormData;
      const isValid = addressFormValidations[key](formInputs[key]);
      if (!isValid) return true;
    }
  };

  const changeFormStateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasError = hasErrorInInputs(formState);
    if (!hasError) {
      setRequest({ ...request, isLoading: true });
      const response = await onSubmit();
      setRequest({
        success: !response.error,
        isLoading: false,
        error: response.error ? response.message : "",
      });
    }
  };

  useEffect(() => {
    setCanSubmit(!hasErrorInInputs(formState));
  }, [formState]);

  const shouldShowRequestStatus = request.isLoading || request.error || request.success;

  return (
    <Wrapper onSubmit={submitHandler}>
      <FormInput
        type="text"
        id="logradouro"
        isInputValid={addressFormValidations.logradouro(formState.logradouro)}
        placeholder="Logradouro*"
        shoulRemoveAditionalSpaces={true}
        value={formState.logradouro}
        onChange={changeFormStateHandler}
      />
      <FormInput
        type="text"
        id="numero"
        isInputValid={addressFormValidations.numero(formState.numero)}
        shoulRemoveAditionalSpaces={true}
        value={formState.numero}
        placeholder="Número*"
        onChange={changeFormStateHandler}
      />
      <FormInput
        type="text"
        id="bairro"
        isInputValid={addressFormValidations.bairro(formState.bairro)}
        shoulRemoveAditionalSpaces={true}
        value={formState.bairro}
        placeholder="Bairro*"
        onChange={changeFormStateHandler}
      />
      <FormInput
        type="text"
        id="complemento"
        isInputValid={true}
        shoulRemoveAditionalSpaces={true}
        value={formState.complemento}
        placeholder="Complemento"
        onChange={changeFormStateHandler}
      />
      <p>Preencha os campos obrigatórios marcados com *.</p>
      {shouldShowRequestStatus && (
        <FormRequestStatus
          isLoading={request.isLoading}
          errorMessage={request.error}
          successMessage={request.success ? "Inserido com sucesso. Redirecionando para Login." : ""}
        />
      )}
      <AddressFormActions onBack={onBack} disabled={!canSubmit} success={request.success} />
    </Wrapper>
  );
};

export default AddressForm;
