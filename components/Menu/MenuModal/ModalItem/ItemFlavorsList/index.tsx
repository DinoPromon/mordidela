import React from "react";

import CustomList from "./styled";
import FlavorOption from "./FlavorOption";
import { Flavor } from "@my-types/product";

type Props = {
  items: Flavor[];
  flavorsAmount: number;
  maxFlavor: number;
  onAddFlavor: (flavorId: number) => void;
  onRemoveFlavor: (flavorId: number) => void;
};

const ItemFlavorsList: React.FC<Props> = (props) => {
  const { items, maxFlavor, flavorsAmount, onAddFlavor, onRemoveFlavor } = props;

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target;
    const id = Number(value);
    if(checked) {
      const canAdd = flavorsAmount < maxFlavor;
      event.target.checked = canAdd;
      return canAdd && onAddFlavor(id);
    }
    onRemoveFlavor(id);
  }

  return (
    <CustomList>
      <h3>Escolha até {maxFlavor} sabores.</h3>
      {items.map((sabor) => (
        <FlavorOption
          key={`sabor-${sabor.id_sabor}`}
          label={sabor.nome}
          name={`input-${sabor.nome}`}
          id={sabor.id_sabor}
          onChange={changeHandler}
        />
      ))}
    </CustomList>
  );
};

export default ItemFlavorsList;
