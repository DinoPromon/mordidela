import React from "react";

import Loading from "../Loading";
import Wrapper, { Text } from './styled';

type Props = {
  errorMessage: string,
  isLoading: boolean,
  successMessage?: string
}

const FormRequestStatus: React.FC<Props> = (props) => {
  const { errorMessage, isLoading, successMessage } = props;

  return (
    <Wrapper>
      {isLoading && <Loading color="#1c1cf0" /> }
      {!isLoading && errorMessage && <Text color="red">{errorMessage}</Text>}
      {!isLoading && successMessage && <Text color="green">{successMessage}</Text>}
    </Wrapper>
  );
};

export default FormRequestStatus;