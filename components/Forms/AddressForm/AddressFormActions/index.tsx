import React from "react";

import Wrapper from './styled';
import { FormButton } from "@components/shared";

type Props = {
  onBack: () => void,
  onNext: () => void
}

const AddressFormActions: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <FormButton onClick={props.onBack}>Voltar</FormButton>
      <FormButton onClick={props.onNext}>Finalizar</FormButton>
    </Wrapper>
  );
};

export default AddressFormActions;
