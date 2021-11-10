import React from "react";

import Wrapper from "./styled";
import { FormButton } from "@components/shared";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

const SignupFormActions: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <FormButton onClick={props.onBack}>Voltar</FormButton>
      <FormButton onClick={props.onNext} type="submit">Próximo</FormButton>
    </Wrapper>
  );
};

export default SignupFormActions;
