import React, { Fragment, useState } from "react";
import Image from "next/image";
import Button from "@material-ui/core/Button";

import { SignupImageContainer } from "../styled";
import { InputTextFormik } from "@components/shared";
import { AddressFormActionsContainer } from "./styled";

import type { IAddressFormValues, SignupCompleteFormModel } from "../FormModel";

type Props = {
  isValid: boolean;
  isTouched: boolean;
  formikValues: IAddressFormValues;
  formModel: SignupCompleteFormModel;
  onBack: () => void;
};

const AddressForm: React.FC<Props> = ({ formikValues, formModel, isValid, isTouched, onBack }) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [request, setRequest] = useState({ error: "", isLoading: false, success: false });

  return (
    <Fragment>
      <SignupImageContainer>
        <Image
          src={"/images/address.svg"}
          alt="Ícone de criação de perfil."
          layout="fill"
          objectFit="scale-down"
        />
      </SignupImageContainer>

      <InputTextFormik
        name={formModel.address.name}
        label={formModel.address.label}
        value={formikValues.address}
        variant="outlined"
        helperText={formModel.address.requiredErrorMessage}
      />
      <InputTextFormik
        name={formModel.number.name}
        label={formModel.number.label}
        value={formikValues.number}
        variant="outlined"
        helperText={formModel.number.requiredErrorMessage}
      />
      <InputTextFormik
        name={formModel.neighborhood.name}
        label={formModel.neighborhood.label}
        value={formikValues.neighborhood}
        variant="outlined"
        helperText={formModel.neighborhood.requiredErrorMessage}
      />
      <InputTextFormik
        name={formModel.complement.name}
        label={formModel.complement.label}
        value={formikValues.complement}
        variant="outlined"
        helperText={formModel.complement.requiredErrorMessage}
      />
      <p>Preencha os campos obrigatórios marcados com *</p>
      <AddressFormActionsContainer>
        <Button onClick={onBack} color="secondary" variant="contained">
          Voltar
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={!(isValid && isTouched)}
        >
          Finalizar
        </Button>
      </AddressFormActionsContainer>
      {/* <AddresFormActions onBack={onBack} disabled={!canSubmit} success={request.success} /> */}
    </Fragment>
  );
};

export default AddressForm;
