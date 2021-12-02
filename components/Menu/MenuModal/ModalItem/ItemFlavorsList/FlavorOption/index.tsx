import React from "react";

import { InputCheckbox } from "@components/shared";
import ListItem from "./styled";

type Props = {
  id: string;
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FlavorOption: React.FC<Props> = (props) => {
  const { id, name, label } = props;

  const inputId = `sabor-${id}`;
  return (
    <ListItem>
      <InputCheckbox id={inputId} name={name} onChange={props.onChange} value={props.id}>
        {label}
      </InputCheckbox>
    </ListItem>
  );
};

export default FlavorOption;
