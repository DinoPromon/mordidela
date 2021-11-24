import React from "react";

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
      <label htmlFor={inputId}>
        {label}
        <input type="checkbox" id={inputId} name={name} onChange={props.onChange} value={id}></input>
        <span></span>
      </label>
    </ListItem>
  );
};

export default FlavorOption;
