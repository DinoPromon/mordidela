import React from "react";

import { ItemFlavorListContainer, FlavorOptionContainer } from "./styled";
import { InputCheckbox } from "@components/shared";

import type ISabor from "@models/sabor";
import type IProduto from "@models/produto";
import { getSaborById } from "@controllers/sabor";

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
        <FlavorOptionContainer key={`flavor-${sabor.id_sabor}`}>
          <InputCheckbox
            id={`flavor-option-${sabor.id_sabor}`}
            name={`input-${sabor.id_sabor}`}
            onChange={changeHandler}
            value={sabor.id_sabor}
          >
            {sabor.nome}
          </InputCheckbox>
        </FlavorOptionContainer>
      ))}
    </ItemFlavorListContainer>
  );
};

export default ItemFlavorsList;
