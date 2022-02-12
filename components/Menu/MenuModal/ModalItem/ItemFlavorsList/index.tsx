import React from "react";

import { ItemFlavorListContainer } from "./styled";
import FlavorOption from "./FlavorOption";

import type ISabor from "@models/sabor";
import type IProduto from "@models/produto";

type Props = {
  items: ISabor[];
  flavorsAmount: number;
  maxFlavor: IProduto["qtde_max_sabor"];
  onAddFlavor: (flavor: ISabor) => void;
  onRemoveFlavor: (flavor: ISabor) => void;
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
      const canAdd = maxFlavor ? flavorsAmount < maxFlavor : true;
      event.target.checked = canAdd;
      return canAdd && flavor && onAddFlavor(flavor);
    } else flavor && onRemoveFlavor(flavor);
  }

  return (
    <ItemFlavorListContainer>
      <h3>Escolha até {maxFlavor} sabores</h3>
      {items.map((sabor) => (
        <FlavorOption
          key={`sabor-${sabor.id_sabor}`}
          label={sabor.nome}
          name={`input-${sabor.nome}`}
          flavorId={sabor.id_sabor}
          onChange={changeHandler}
        />
      ))}
    </ItemFlavorListContainer>
  );
};

export default ItemFlavorsList;
