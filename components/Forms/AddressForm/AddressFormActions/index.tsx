import React from "react";

import Wrapper from './styled';
import { FormButton } from "@components/shared";

type Props = {
  disabled: boolean
  onBack: () => void,
}

const AddressFormActions: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <FormButton onClick={props.onBack}>Voltar</FormButton>
      <FormButton type="submit" disabled={props.disabled}>Finalizar</FormButton>
    </Wrapper>
  );
};

export default AddressFormActions;
