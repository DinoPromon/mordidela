import React from "react";

import CustomButton from "./styled";

type Props = {
  onClick?: () => void;
};

const FormButton: React.FC<Props> = (props) => {
  return <CustomButton onClick={props.onClick}>{props.children}</CustomButton>;
};

export default FormButton;
