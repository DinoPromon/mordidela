import React from "react";

import { transformPriceToString } from "@utils/transformation/price";
import { InputCheckbox } from "@components/shared";
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

  const inputId = `add-${id}`;
  return (
    <ListItem>
      <InputCheckbox id={inputId} value={price} name={name} onChange={onChange}>
        {label}
        <p>R$ {transformPriceToString(price)}</p>
      </InputCheckbox>
    </ListItem>
  );
};

export default AddOption;
