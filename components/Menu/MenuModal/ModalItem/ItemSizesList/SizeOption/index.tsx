import { transformPriceToString } from "@utils/transformation/price";
import React from "react";

import ListItem from "./styled";

type Props = {
  id: string;
  price: number;
  name: string;
  label: string;
};

const SizeOption: React.FC<Props> = (props) => {
  const { id, price, name, label } = props;
  return (
    <ListItem>
      <label htmlFor="caixa-media">
        {label}
        <input type="radio" id={id} name={name} />
        <span></span>
        <p>R$ {transformPriceToString(price)}</p>
      </label>
    </ListItem>
  );
};

export default SizeOption;
