import React from "react";

import Wrapper from "./styled";
import { transformPriceToString } from "@utils/transformation/price";

type Props = {
  name: string
  price: number
}

const ItemDescription: React.FC<Props> = (props) => {
  const { name, price } = props;

  return (
    <Wrapper>
      <span>{name.toLocaleUpperCase()}</span>
      <span>R$ {transformPriceToString(price)}</span>
    </Wrapper>
  );
};

export default ItemDescription;