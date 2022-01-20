import React from "react";

import { ItemDescriptionContainer } from "./styled";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  name: string;
  price: number;
};

const ItemDescription: React.FC<Props> = (props) => {
  const { name, price } = props;

  return (
    <ItemDescriptionContainer>
      <span>{name.toLocaleLowerCase()}</span>
      <span>R$ {transformPriceToString(price)}</span>
    </ItemDescriptionContainer>
  );
};

export default ItemDescription;
