import React from "react";

import CustomButton from "./styled";

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

const FormButton: React.FC<Props> = (props) => {
  return (
    <CustomButton
      onClick={props.onClick}
      type={props.type || "button"}
      isDisabled={props.disabled || false}
    >
      {props.children}
    </CustomButton>
  );
};

export default FormButton;
