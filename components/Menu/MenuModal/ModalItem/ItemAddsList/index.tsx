import React from "react";

import { ItemAddsListContainer } from "./styled";
import AddOption from "./AddOption";
import IAdicional from "@models/adicional";

type Props = {
  items: IAdicional[];
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  onAddAditional: (add: IAdicional) => void;
  onRemoveAditional: (add: IAdicional) => void;
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
    <ItemAddsListContainer>
      <h3>Adicionais</h3>
      {items.map((add) => (
        <AddOption
          key={`add-${add.id_adicional}`}
          addId={add.id_adicional}
          label={add.nome}
          name={`input-${add.id_adicional}`}
          price={add.preco}
          onChange={changePrice}
        />
      ))}
    </ItemAddsListContainer>
  );
};

export default ItemAddsList;
