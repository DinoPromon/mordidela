import React, { useEffect, useState } from "react";

import Wrapper from "../styled";
import AddressFormActions from "./AddressFormActions";
import { FormInput } from "@components/shared";
import { AddressFormData } from "@my-types/signup";
import { addressFormValidations } from "@utils/validations";

type Props = {
  state: AddressFormData;
  setState: React.Dispatch<React.SetStateAction<AddressFormData>>;
  onBack: () => void;
  onSubmit: () => void;
};

const AddressForm: React.FC<Props> = (props) => {
  const { state: formState, setState: setFormState, onBack, onSubmit } = props;
  const [canSubmit, setCanSubmit] = useState(false);

  const hasErrorInInputs = (formInputs: typeof formState) => {
    for (let k in addressFormValidations) {
      const key = k as keyof AddressFormData;
      const isValid = addressFormValidations[key](formInputs[key]);
      if (!isValid) return true;
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasError = hasErrorInInputs(formState);
    if (!hasError) onSubmit();
  };

  useEffect(() => { 
    setCanSubmit(!hasErrorInInputs(formState));
  }, [formState]);

  return (
    <Wrapper onSubmit={submitHandler}>
      <FormInput
        type="text"
        id="logradouro"
        isInputValid={addressFormValidations.logradouro(formState.logradouro)}
        placeholder="Logradouro*"
        value={formState.logradouro}
        onChange={changeHandler}
      />
      <FormInput
        type="text"
        id="numero"
        isInputValid={addressFormValidations.numero(formState.numero)}
        value={formState.numero}
        placeholder="Número*"
        onChange={changeHandler}
      />
      <FormInput
        type="text"
        id="bairro"
        isInputValid={addressFormValidations.bairro(formState.bairro)}
        value={formState.bairro}
        placeholder="Bairro*"
        onChange={changeHandler}
      />
      <FormInput
        type="text"
        id="complemento"
        isInputValid={true}
        value={formState.complemento}
        placeholder="Complemento"
        onChange={changeHandler}
      />
      <p>Preencha os campos obrigatórios marcados com *.</p>
      <AddressFormActions onBack={onBack} disabled={!canSubmit} />
    </Wrapper>
  );
};

export default AddressForm;
