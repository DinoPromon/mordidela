import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AddressFormActions from "./AddresFormActions";
import FormRequestStatus from "@components/shared/FormRequestStatus";
import { FormInput, InputTextFormik } from "@components/shared";
import { addressFormValidations } from "@utils/validations";

import type { Response } from "@my-types/request";
import type { AddressFormData } from "@my-types/forms";
import AddresFormActions from "./AddresFormActions";

import { Formik } from "formik";
import { FormikForm } from "../styled";
import { getAddresFormModel, getAddresFormValidationSchema, getAddresInitialValues } from "./FormModel";

type Props = {
  state: AddressFormData;
  setState: React.Dispatch<React.SetStateAction<AddressFormData>>;
  onBack: () => void;
  onSubmit: () => Promise<Response>;
};

const AddresForm: React.FC<Props> = (props) => {
  const router = useRouter();
  const { state: formState, setState: setFormState, onBack, onSubmit } = props;
  const [canSubmit, setCanSubmit] = useState(false);
  const [request, setRequest] = useState({ error: "", isLoading: false, success: false });

  const hasErrorInInputs = (formInputs: typeof formState) => {
    for (let k in addressFormValidations) {
      const key = k as keyof AddressFormData;
      const isValid = addressFormValidations[key](formInputs[key] as string);
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

      if (!response.error) router.replace("/login");
    }
  };

  useEffect(() => {
    setCanSubmit(!hasErrorInInputs(formState));
  }, [formState]);

  const shouldShowRequestStatus = request.isLoading || request.error || request.success;

  const formModel = getAddresFormModel();

  return (
    <Formik
      validateOnChange={false}
      enableReinitialize={true}
      validationSchema={getAddresFormValidationSchema(formModel)}
      initialValues={getAddresInitialValues()}
      onSubmit={(values) => console.log(values)}
    >
      {({ values }) => (
        <FormikForm>
          <InputTextFormik
            name={formModel.addres.name}
            label={formModel.addres.label}
            value={values.addres}
            variant="outlined"
            helperText={formModel.addres.requiredErrorMessage}
          />
          <InputTextFormik
            name={formModel.number.name}
            label={formModel.number.label}
            value={values.number}
            variant="outlined"
            helperText={formModel.number.requiredErrorMessage}
          />
          <InputTextFormik
            name={formModel.neighborhood.name}
            label={formModel.neighborhood.label}
            value={values.neighborhood}
            variant="outlined"
            helperText={formModel.neighborhood.requiredErrorMessage}
          />
          <InputTextFormik
            name={formModel.complement.name}
            label={formModel.complement.label}
            value={values.complement}
            variant="outlined"
            helperText={formModel.complement.requiredErrorMessage}
          />
          <p>Preencha os campos obrigatórios marcados com *</p>
          <AddresFormActions onBack={onBack} disabled={!canSubmit} success={request.success} />
        </FormikForm>
      )}
    </Formik>
  );
  /*   return (
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
        value={formState.complemento as string}
        placeholder="Complemento"
        onChange={changeFormStateHandler}
      />
      <p>Preencha os campos obrigatórios marcados com *.</p>
      {shouldShowRequestStatus && (
        <FormRequestStatus isLoading={request.isLoading} errorMessage={request.error} />
      )}
      <AddressFormActions onBack={onBack} disabled={!canSubmit} success={request.success} />
    </Wrapper>
  ); */

  
};

export default AddresForm;
