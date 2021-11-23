import React from "react";

import CustomList from "./styled";
import FlavorOption from "./FlavorOption";
import { Flavor } from "@my-types/product";

type Props = {
  items: Flavor[];
};

const ItemFlavorsList: React.FC<Props> = (props) => {
  const { items } = props;

  return (
    <CustomList>
      <h3>Sabores</h3>
      {items.map((sabor) => (
        <FlavorOption
          key={`sabor-${sabor.id_sabor}`}
          label={sabor.nome}
          name={`input-${sabor.nome}`}
          id={sabor.id_sabor}
        />
      ))}
    </CustomList>
  );
};

export default ItemFlavorsList;
