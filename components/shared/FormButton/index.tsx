import React from "react";

import Wrapper from "./styled";

type Props = {
  onClick?: () => void;
};

const FormButton: React.FC<Props> = (props) => {
  return <Wrapper onClick={props.onClick}>{props.children}</Wrapper>;
};

export default FormButton;
