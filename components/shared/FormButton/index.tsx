import React from "react";

import CustomButton from "./styled";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit"
};

const FormButton: React.FC<Props> = (props) => {
  return <CustomButton onClick={props.onClick} type={props.type || "button"}>{props.children}</CustomButton>;
};

export default FormButton;
