import React from "react";
import { useRouter } from "next/router";

import Wrapper from './styled';
import { FormButton } from "@components/shared";

type Props = {
  disabled: boolean
  success: boolean
  onBack: () => void,
}

const AddressFormActions: React.FC<Props> = (props) => {
  const router = useRouter();

  const backHandler = () => {
    if(props.success) router.replace('/login');
    else props.onBack();
  }

  return (
    <Wrapper>
      <FormButton onClick={backHandler}>Voltar</FormButton>
      <FormButton type="submit" disabled={props.disabled}>Finalizar</FormButton>
    </Wrapper>
  );
};

export default AddressFormActions;
