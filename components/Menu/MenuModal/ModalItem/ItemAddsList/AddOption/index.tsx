import React from "react";

import { transformPriceToString } from "@utils/transformation/price";
import ListItem from "./styled";

type Props = {
  id: string;
  name: string;
  label: string;
  price: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AddOption: React.FC<Props> = (props) => {
  const { id, name, label, price, onChange } = props;
  return (
    <ListItem>
      <label htmlFor={id}>
        {label}
        <input type="checkbox" id={id} name={name} value={price} onChange={onChange}></input>
        <span></span>
        <p>R$ {transformPriceToString(price)}</p>
      </label>
    </ListItem>
  );
};

export default AddOption;
