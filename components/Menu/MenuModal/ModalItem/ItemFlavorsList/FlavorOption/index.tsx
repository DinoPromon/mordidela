import React from "react";

import ListItem from "./styled";

type Props = {
  id: string,
  name: string
  label: string
}

const FlavorOption: React.FC<Props> = (props) => {
  const { id, name, label } = props;

  return (
    <ListItem>
      <label htmlFor={id}>
        {label}
        <input type="checkbox" id={id} name={name}></input>
        <span></span>
      </label>
    </ListItem>
  );
};

export default FlavorOption;
