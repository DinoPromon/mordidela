import React from "react";

import { transformPriceToString } from "@utils/transformation";
import { InputCheckbox } from "@components/shared";
import { AddOptionContainer } from "./styled";

type Props = {
  addId: number;
  name: string;
  label: string;
  price: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AddOption: React.FC<Props> = (props) => {
  const { addId, name, label, price, onChange } = props;

  const inputId = `add-${addId}`;
  return (
    <AddOptionContainer>
      <InputCheckbox id={inputId} value={price} name={name} onChange={onChange}>
        {label}
        <p>R$ {transformPriceToString(price)}</p>
      </InputCheckbox>
    </AddOptionContainer>
  );
};

export default AddOption;
