import React from "react";

import Loading from "../Loading";
import Wrapper, { Text } from "./styled";

type Props = {
  errorMessage: string;
  isLoading: boolean;
};

const FormRequestStatus: React.FC<Props> = (props) => {
  const { errorMessage, isLoading } = props;

  return (
    <Wrapper>
      {isLoading && <Loading color="#1c1cf0" />}
      {!isLoading && errorMessage && <Text color="red">{errorMessage}</Text>}
    </Wrapper>
  );
};

export default FormRequestStatus;
