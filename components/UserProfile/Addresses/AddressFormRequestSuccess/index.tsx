import React, { memo } from "react";

import { SuccessMessage } from "@components/shared/StyledComponents";

import { FormRequestSuccess } from "../constants";
import { SuccessMessageContainer } from "./styled";

type FormRequestSuccessProps = {
  requestSuccess: FormRequestSuccess | null;
};

type FormRequestSuccessType = (props: FormRequestSuccessProps) => JSX.Element | null;

const AddressFormRequestSuccess: FormRequestSuccessType = ({ requestSuccess }) => {
  function getFormRequestSuccessMessage() {
    switch (requestSuccess) {
      case FormRequestSuccess.CREATE:
        return "Endereço criado com sucesso!";

      case FormRequestSuccess.EDIT:
        return "Endereço editado com sucesso!";

      default:
        return undefined;
    }
  }

  if (!requestSuccess) return null;

  return (
    <SuccessMessageContainer>
      <SuccessMessage>{getFormRequestSuccessMessage()}</SuccessMessage>
    </SuccessMessageContainer>
  );
};

export default memo(AddressFormRequestSuccess);
