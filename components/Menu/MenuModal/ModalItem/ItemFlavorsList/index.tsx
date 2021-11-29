import React from "react";

import CustomList from "./styled";
import FlavorOption from "./FlavorOption";
import Sabor from "@models/sabor";

type Props = {
  items: Sabor[];
  flavorsAmount: number;
  maxFlavor: number;
  onAddFlavor: (flavor: Sabor) => void;
  onRemoveFlavor: (flavor: Sabor) => void;
};

const ItemFlavorsList: React.FC<Props> = (props) => {
  const { items, maxFlavor, flavorsAmount, onAddFlavor, onRemoveFlavor } = props;

  function getFlavorById(id: string) {
    return items.find((item) => {
      return String(item.id_sabor) === id;
    });
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target;
    const flavor = getFlavorById(value);
    if (checked) {
      const canAdd = flavorsAmount < maxFlavor;
      event.target.checked = canAdd;
      return canAdd && flavor && onAddFlavor(flavor);
    } else flavor && onRemoveFlavor(flavor);
  }

  return (
    <CustomList>
      <h3>Escolha até {maxFlavor} sabores</h3>
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
