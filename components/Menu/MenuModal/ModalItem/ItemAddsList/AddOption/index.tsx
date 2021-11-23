import React from "react";

import { transformPriceToString } from "@utils/transformation/price";
import ListItem from "./styled";

type Props = {
  id: string;
  name: string;
  label: string;
  price: number;
};

const AddOption: React.FC<Props> = (props) => {
  const { id, name, label, price } = props;
  return (
    <ListItem>
      <label htmlFor={id}>
        {label}
        <input type="checkbox" id={id} name={name}></input>
        <span></span>
        <p>R$ {transformPriceToString(price)}</p>
      </label>
    </ListItem>
  );
};

export default AddOption;
