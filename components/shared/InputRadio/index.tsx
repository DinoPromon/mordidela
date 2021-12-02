import React from "react";

import CustomLabel from "./styled";

type Props = {
  id: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultCheked: boolean;
};

const InputRadio: React.FC<Props> = (props) => {
  return (
    <CustomLabel>
      {props.children}
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        defaultChecked={props.defaultCheked}
      />
      <span></span>
    </CustomLabel>
  );
};

export default InputRadio;
