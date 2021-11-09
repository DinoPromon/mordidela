import React from "react";

import Wrapper from "./styled";
import { FormButton } from "@components/shared";

type Props = {
  onBack: () => void;
  onSubmit: () => void
};

const UserAddressActions: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <FormButton onClick={props.onBack}>Voltar</FormButton>
      <FormButton onClick={props.onSubmit}>Finalizar</FormButton>
    </Wrapper>
  );
};

export default UserAddressActions;
