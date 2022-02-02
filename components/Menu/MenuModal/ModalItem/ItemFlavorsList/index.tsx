import React from "react";

import { ItemFlavorListContainer } from "./styled";
import FlavorOption from "./FlavorOption";
import Sabor from "@models/sabor";
import Produto from "@models/produto";

type Props = {
  items: Sabor[];
  flavorsAmount: number;
  maxFlavor: Produto["qtde_max_sabor"];
  onAddFlavor: (flavor: Sabor) => void;
  onRemoveFlavor: (flavor: Sabor) => void;
};

const ItemFlavorsList: React.FC<Props> = (props) => {
  const { items, maxFlavor, flavorsAmount, onAddFlavor, onRemoveFlavor } =
    props;

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
          id={sabor.id_sabor}
          onChange={changeHandler}
        />
      ))}
    </ItemFlavorListContainer>
  );
};

export default ItemFlavorsList;
