import React, { useEffect, useState } from "react";

import Wrapper from "../styled";
import AddressFormActions from "./AddressFormActions";
import { FormInput } from "@components/shared";
import { AddressFormData } from "@my-types/signup";
import { addressFormValidation } from "@utils/validations";

type Props = {
  state: AddressFormData;
  setState: React.Dispatch<React.SetStateAction<AddressFormData>>;
  onBack: () => void;
  onNext: () => void;
};

const AddressForm: React.FC<Props> = (props) => {
  const { state, setState, onBack, onNext } = props;
	const [canSubmit, setCanSubmit] = useState(false);

  const hasErrorInInputs = (formState: typeof state) => {
    for (let k in addressFormValidation) {
      const key = k as keyof AddressFormData;
      const isValid = addressFormValidation[key](formState[key]);
      if (!isValid) return key;
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorInput = hasErrorInInputs(state);
    if (!errorInput) onNext();
  };

	useEffect(() => {
    const hasSomeError = hasErrorInInputs(state);
    setCanSubmit(!hasSomeError);
  }, [state]);

  return (
    <Wrapper onSubmit={submitHandler}>
      <FormInput
        type="text"
        id="logradouro"
        isInputValid={addressFormValidation.logradouro(state.logradouro)}
        placeholder="Logradouro*"
        value={state.logradouro}
        onChange={changeHandler}
      />
      <FormInput
        type="text"
        id="numero"
        isInputValid={addressFormValidation.numero(state.numero)}
        value={state.numero}
        placeholder="Número*"
        onChange={changeHandler}
      />
      <FormInput
        type="text"
        id="bairro"
        isInputValid={addressFormValidation.bairro(state.bairro)}
        value={state.bairro}
        placeholder="Bairro*"
        onChange={changeHandler}
      />
      <FormInput
        type="text"
        id="complemento"
        isInputValid={true}
        value={state.complemento}
        placeholder="Complemento"
        onChange={changeHandler}
      />
      <p>Campos com * são obrigatórios.</p>
      <AddressFormActions onBack={onBack} disabled={!canSubmit}/>
    </Wrapper>
  );
};

export default AddressForm;
