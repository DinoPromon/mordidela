import React from "react";

import CustomList from "./styled";
import SizeOption from "./SizeOption";
import { Size } from "@my-types/product";

type Props = {
  items: Size[];
};

const ItemSizesList: React.FC<Props> = (props) => {
  const { items } = props;
  return (
    <CustomList>
      <h3>Tamanho</h3>
      {items.map((size) => (
        <SizeOption
          key={`tamanho-${size.id_produto}`}
          name={`input-${size.tamanho}`}
          id={size.id_produto}
          label={size.tamanho}
          price={size.preco_padrao}
        />
      ))}
    </CustomList>
  );
};

export default ItemSizesList;
