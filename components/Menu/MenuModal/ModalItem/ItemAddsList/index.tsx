import React from "react";

import CustomList from "./styled";
import AddOption from "./AddOption";
import { Add } from "@my-types/product";

type Props = {
  items: Add[];
  setPrice: React.Dispatch<React.SetStateAction<number>>;
};

const ItemAddsList: React.FC<Props> = (props) => {
  const { items, setPrice } = props;

  function changePrice(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target;
    const price = Number(value);
    setPrice((prevState) => (checked ? prevState + price : prevState - price));
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
