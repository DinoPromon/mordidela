import React from "react";

import CustomList from "./styled";
import AddOption from "./AddOption";
import Adicional from "@models/adicional";
import { Add } from "@my-types/product";

type Props = {
  items: Add[];
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  onAddAditional: (add: Adicional) => void;
  onRemoveAditional: (add: Adicional) => void;
};

const ItemAddsList: React.FC<Props> = (props) => {
  const { items, setPrice, onAddAditional, onRemoveAditional } = props;

  function getAddIdFromInputId(inputId: string) {
    const pattern = /\d+$/;
    const id = inputId.match(pattern);
    if (id) return id[0];
  }

  function getAddByInputId(inputId: string) {
    const id = getAddIdFromInputId(inputId);
    if (id) return items.find((item) => String(item.id_adicional) === id);
  }

  function changePrice(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value, id } = event.target;
    const price = Number(value);
    const add = getAddByInputId(id);
    setPrice((prevState) => (checked ? prevState + price : prevState - price));
    if (checked) add && onAddAditional(add);
    else add && onRemoveAditional(add);
  }

  return (
    <CustomList>
      <h3>Adicionais</h3>
      {items.map((add) => (
        <AddOption
          key={`add-${add.id_adicional}`}
          id={add.id_adicional}
          label={add.nome}
          name={`input-${add.id_adicional}`}
          price={add.preco}
          onChange={changePrice}
        />
      ))}
    </CustomList>
  );
};

export default ItemAddsList;
