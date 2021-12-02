import React from "react";

import CustomLabel from "./styled";

type Props = {
  id: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputCheckbox: React.FC<Props> = (props) => {
  return (
    <CustomLabel htmlFor={props.id}>
      {props.children}
      <input type="checkbox" id={props.id} name={props.name} onChange={props.onChange} value={props.id}></input>
      <span></span>
    </CustomLabel>
  );
};

export default InputCheckbox;
